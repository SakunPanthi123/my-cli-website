import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { SelectInput, type SelectOption } from '../components/ui.js';

const helpSections = [
	{
		name: 'About Explore Nepal CLI',
		emoji: 'ℹ️',
		content: [
			'Welcome to the Explore Nepal CLI - your interactive terminal-based guide to Nepal!',
			'',
			'This application was built to provide travelers with comprehensive information about Nepal\'s destinations, culture, adventure activities, and practical travel advice, all from the comfort of your command line.',
			'',
			'Whether you\'re planning your first visit to Nepal or you\'re a seasoned traveler looking for new experiences, this CLI offers detailed information about:',
			'• Top destinations and attractions',
			'• Cultural insights and traditions',
			'• Adventure activities and sports',
			'• Practical travel tips and advice',
			'• Trip planning tools and templates',
			'• Community messages and experiences',
			'',
			'Navigate using arrow keys and Enter to select. Press Ctrl+C to exit at any time.'
		]
	},
	{
		name: 'How to Use This CLI',
		emoji: '📖',
		content: [
			'Navigation Controls:',
			'• Use ↑↓ arrow keys to navigate through menu options',
			'• Press Enter to select a highlighted option',
			'• Press Ctrl+C to exit the application',
			'• Use "Back to Main Menu" options to return to previous screens',
			'',
			'Available Commands:',
			'• destinations - Explore Nepal\'s top tourist destinations',
			'• regions - Learn about Nepal\'s geographic regions',
			'• culture - Discover Nepali culture and traditions',
			'• adventure - Browse adventure activities and sports',
			'• messages - Read and write community messages',
			'• tips - Access travel tips and advice',
			'• planner - Plan your Nepal trip with templates',
			'• help - View this help information',
			'',
			'You can also run specific commands directly:',
			'node dist/cli.js destinations',
			'node dist/cli.js regions',
			'etc.'
		]
	},
	{
		name: 'Features & Capabilities',
		emoji: '🌟',
		content: [
			'Interactive Navigation:',
			'• Smooth menu navigation with visual feedback',
			'• Automatic return to main menu after exploring sections',
			'• Consistent user interface across all commands',
			'',
			'Rich Content:',
			'• Detailed destination information with tips and highlights',
			'• Cultural insights from local experts',
			'• Comprehensive adventure activity guides',
			'• Practical travel advice organized by category',
			'',
			'Planning Tools:',
			'• Trip templates for different travel styles',
			'• Custom trip builder with personalized recommendations',
			'• Budget planning and timing advice',
			'',
			'Community Features:',
			'• Read experiences from fellow travelers',
			'• Share your own Nepal travel stories',
			'• Rate and review destinations',
			'',
			'Visual Design:',
			'• Beautiful ASCII art and colorful interface',
			'• Nepal flag colors and cultural motifs',
			'• Clear information hierarchy and layout'
		]
	},
	{
		name: 'Available Commands',
		emoji: '⚡',
		content: [
			'🏔️ destinations',
			'Browse Nepal\'s top tourist destinations including Everest Base Camp, Annapurna Circuit, Kathmandu Valley, Pokhara, Chitwan National Park, and Lumbini. Each destination includes detailed information about activities, difficulty levels, best times to visit, and practical tips.',
			'',
			'🗺️ regions',
			'Explore Nepal\'s three main geographic regions: Mountains (Himal), Hills (Pahar), and Terai (Plains). Learn about the unique characteristics, climate, population, and attractions of each region.',
			'',
			'🕉️ culture',
			'Discover Nepal\'s rich cultural heritage including religions, festivals, ethnic diversity, traditional arts, languages, and cuisine. Gain insights into local customs and practices.',
			'',
			'🏃‍♂️ adventure',
			'Find information about adventure activities including trekking, mountain climbing, white water rafting, paragliding, bungee jumping, and wildlife safaris. Includes safety tips and requirements.',
			'',
			'💬 messages',
			'Read community messages from fellow travelers sharing their Nepal experiences. Write and share your own travel stories, tips, and destination reviews.',
			'',
			'💡 tips',
			'Access categorized travel tips covering health & safety, packing & gear, money & budget, cultural etiquette, transportation, and communication. Tips are prioritized by importance.',
			'',
			'🎯 planner',
			'Plan your Nepal trip using pre-designed templates or create a custom itinerary. Get recommendations based on your interests, budget, and travel style.',
			'',
			'❓ help',
			'Access this help system with information about using the CLI, available features, and troubleshooting tips.'
		]
	},
	{
		name: 'Tips for Best Experience',
		emoji: '💡',
		content: [
			'Terminal Setup:',
			'• Use a terminal with Unicode support for best visual experience',
			'• Ensure your terminal supports colors (most modern terminals do)',
			'• Resize your terminal to at least 80 characters wide for optimal layout',
			'',
			'Navigation Tips:',
			'• Take your time to read through options before selecting',
			'• Use the "Back to Main Menu" options to navigate between sections',
			'• Press Ctrl+C if you ever get stuck or want to exit quickly',
			'',
			'Making the Most of Content:',
			'• Read the full descriptions in destination and activity sections',
			'• Pay attention to the difficulty levels and requirements',
			'• Note the "best time to visit" information for planning',
			'• Check out the tips section before planning your actual trip',
			'',
			'Contributing:',
			'• Share your experiences in the messages section',
			'• Rate destinations you\'ve visited',
			'• Provide helpful tips for other travelers',
			'',
			'Troubleshooting:',
			'• If text appears garbled, check your terminal\'s Unicode support',
			'• If colors don\'t appear, verify your terminal supports ANSI colors',
			'• If navigation feels unresponsive, ensure your terminal is focused'
		]
	},
	{
		name: 'About Nepal',
		emoji: '🇳🇵',
		content: [
			'Nepal Quick Facts:',
			'• Official Name: Federal Democratic Republic of Nepal',
			'• Capital: Kathmandu',
			'• Population: ~30 million people',
			'• Languages: 123 languages (Nepali is official)',
			'• Currency: Nepalese Rupee (NPR)',
			'• Time Zone: Nepal Standard Time (UTC+5:45)',
			'',
			'Geography:',
			'• Area: 147,516 km² (57,000 sq miles)',
			'• Landlocked country between China and India',
			'• Contains 8 of the world\'s 14 highest peaks',
			'• Altitude ranges from 60m to 8,849m (Mount Everest)',
			'',
			'UNESCO World Heritage Sites:',
			'• Kathmandu Durbar Square',
			'• Patan Durbar Square',
			'• Bhaktapur Durbar Square',
			'• Swayambhunath (Monkey Temple)',
			'• Boudhanath Stupa',
			'• Pashupatinath Temple',
			'• Changu Narayan Temple',
			'• Lumbini (Buddha\'s birthplace)',
			'• Chitwan National Park',
			'• Sagarmatha National Park',
			'',
			'Cultural Highlights:',
			'• Birthplace of Lord Buddha',
			'• Only Hindu kingdom until 2008',
			'• Home to the Living Goddess (Kumari)',
			'• Land of the Gurkhas',
			'• Non-rectangular flag (only country in the world)'
		]
	},
	{
		name: 'Technical Information',
		emoji: '🔧',
		content: [
			'System Requirements:',
			'• Node.js 16 or higher',
			'• Terminal with Unicode and color support',
			'• At least 80x24 terminal size recommended',
			'',
			'Built With:',
			'• Pastel - CLI framework for React',
			'• Ink - React for interactive command-line apps',
			'• TypeScript - Type-safe JavaScript',
			'• React - Component-based UI framework',
			'',
			'Features:',
			'• Interactive navigation with arrow keys',
			'• Colorful ASCII art and Unicode symbols',
			'• Responsive layout design',
			'• Programmatic command routing',
			'• State management for complex forms',
			'',
			'Development:',
			'• Open source project',
			'• Built for educational and travel planning purposes',
			'• Designed to showcase CLI application capabilities',
			'• Uses modern JavaScript/TypeScript patterns',
			'',
			'Version Information:',
			'• Current Version: 1.0.0',
			'• Last Updated: 2024',
			'• License: MIT',
			'',
			'Troubleshooting:',
			'• If you encounter issues, try rebuilding with "npm run build"',
			'• Ensure all dependencies are installed with "npm install"',
			'• Check that your Node.js version is 16 or higher'
		]
	}
];

export default function Help() {
	const [currentView, setCurrentView] = useState<'menu' | 'section'>('menu');
	const [selectedSection, setSelectedSection] = useState<typeof helpSections[0] | null>(null);

	// Handle input for section view - always call the hook but only act when in section view
	useInput((input, key) => {
		if (currentView === 'section' && selectedSection) {
			if (key.escape) {
				// ESC key goes back to main menu
				process.exit(0);
			} else {
				// Any other key goes back to help menu
				setCurrentView('menu');
				setSelectedSection(null);
			}
		}
	});

	const sectionOptions: SelectOption[] = helpSections.map(section => ({
		label: `${section.emoji} ${section.name}`,
		value: section.name
	}));

	const backOption: SelectOption = { label: '← Back to Main Menu', value: 'back' };
	const allOptions = [backOption, ...sectionOptions];

	const handleSectionSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			if (currentView === 'section') {
				setCurrentView('menu');
			} else {
				process.exit(0);
			}
		} else {
			const section = helpSections.find(s => s.name === option.value);
			if (section) {
				setSelectedSection(section);
				setCurrentView('section');
			}
		}
	};

	// Section detail view
	if (currentView === 'section' && selectedSection) {
		return (
			<Box flexDirection="column" padding={2}>
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>
						{selectedSection.emoji} {selectedSection.name}
					</Text>
				</Box>

				<Box flexDirection="column" marginBottom={2}>
					{selectedSection.content.map((line, index) => (
						<Text key={index} color={line.startsWith('•') ? 'yellow' : line === '' ? 'gray' : 'white'}>
							{line || ' '}
						</Text>
					))}
				</Box>

				<Box borderStyle="single" padding={1}>
					<Text color="blue">Press any key to return to help menu, Ctrl+C to exit</Text>
				</Box>
			</Box>
		);
	}

	// Main help menu
	return (
		<Box flexDirection="column" padding={2}>
			{/* Header */}
			<Box flexDirection="column" alignItems="center" marginBottom={3}>
				<Text color="cyan" bold>
					❓ HELP & ABOUT ❓
				</Text>
				<Text color="gray">
					Get help using the Explore Nepal CLI and learn about its features
				</Text>
			</Box>

			{/* CLI Info */}
			<Box justifyContent="center" marginBottom={2}>
				<Text color="blue">
					{`
    ╭─────────────────────────────────────────────────╮
    │  🚀 Interactive Nepal Travel Guide              │
    │  ⚡ Built with Pastel & Ink                     │  
    │  🎨 Beautiful Terminal Experience               │
    │  🗺️ Comprehensive Travel Information            │
    │  💬 Community-Driven Content                    │
    ╰─────────────────────────────────────────────────╯
					`}
				</Text>
			</Box>

			{/* Quick Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={3}>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>🏔️ 6+</Text>
					<Text color="gray">Major Destinations</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>🎯 6</Text>
					<Text color="gray">Adventure Activities</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>💡 30+</Text>
					<Text color="gray">Travel Tips</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>📋 5</Text>
					<Text color="gray">Trip Templates</Text>
				</Box>
			</Box>

			{/* Help Section Selection */}
			<Box flexDirection="column">
				<SelectInput
					items={allOptions}
					onSelect={handleSectionSelection}
					placeholder="Select a help topic:"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					💡 <Text color="white" bold>Quick Tip:</Text> Use Ctrl+C to exit at any time. Navigate with arrow keys and Enter to select.
				</Text>
			</Box>
		</Box>
	);
}
