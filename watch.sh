#!/bin/bash

# Simple and reliable watch mode for development
# Only rebuilds when you actually save files

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

NAME=${1:-"Dev Mode"}

echo -e "${PURPLE}� Starting Watch Mode${NC}"
echo -e "${BLUE}👀 Only rebuilds on actual file changes${NC}"
echo -e "${YELLOW}💡 Edit and save TypeScript files to see changes${NC}"
echo -e "${YELLOW}💡 Press Ctrl+C to stop${NC}"
echo ""

# Initial build
echo -e "${YELLOW}📦 Initial build...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Initial build failed!${NC}"
    exit 1
fi

# Start the app
echo -e "${BLUE}🚀 Starting app...${NC}"
node dist/cli.js &
APP_PID=$!

# Store initial checksums
get_checksums() {
    find source -name "*.ts" -o -name "*.tsx" | xargs md5sum 2>/dev/null || find source -name "*.ts" -o -name "*.tsx" | xargs md5 2>/dev/null
}

LAST_CHECKSUMS=$(get_checksums)

echo -e "${GREEN}👀 Watching for changes...${NC}"
echo ""

# Watch loop
while true; do
    sleep 1
    CURRENT_CHECKSUMS=$(get_checksums)
    
    if [ "$CURRENT_CHECKSUMS" != "$LAST_CHECKSUMS" ]; then
        echo -e "${YELLOW}📝 File change detected! Rebuilding...${NC}"
        
        # Kill current app
        kill $APP_PID 2>/dev/null
        wait $APP_PID 2>/dev/null
        
        # Rebuild
        npm run build > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Build successful! Restarting app...${NC}"
            echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            
            # Start app again
            node dist/cli.js &
            APP_PID=$!
        else
            echo -e "${RED}❌ Build failed! Fix errors and save again.${NC}"
        fi
        
        LAST_CHECKSUMS=$CURRENT_CHECKSUMS
    fi
done

# Cleanup on exit
trap 'kill $APP_PID 2>/dev/null; exit' INT TERM
