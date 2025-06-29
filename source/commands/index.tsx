import React, { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import figlet from 'figlet';
import { SelectInput, type SelectOption } from '../components/ui.js';

// Import all command components
import Destinations from './destinations.js';
import Regions from './regions.js';
import Culture from './culture.js';
import Adventure from './adventure.js';
import Messages from './messages.js';
import Tips from './tips.js';
import Planner from './planner.js';
import Help from './help.js';

// ASCII Art for Nepal
const nepalAscii = figlet.textSync('EXPLORE NEPAL', {
	font: 'ANSI Shadow',
	horizontalLayout: 'default',
	verticalLayout: 'default',
	width: 80,
	whitespaceBreak: true
});

const nepalFlag = `
🟦🟦
🟦🟥🟦🟦
🟦🟥🟥🟥🟦🟦
🟦🟥🟥🟥🟥🟥🟦🟦
🟦🟥🟥🟥🟥🟥🟥🟥🟦
🟦🟥🟥🟥🟥🟥🟥🟥🟥🟥🟦
🟦🟥🟦🟥🟥🟥🟦🟥🟥🟥🟥🟦
🟦🟥🟥🟦🟦🟦🟥🟥🟥🟥🟥🟥🟥🟦
🟦🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟦
🟦🟥🟥🟥🟥🟥🟥🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟥🟥🟥🟥🟥🟥🟦
🟦🟥🟥🟥🟦🟥🟥🟥🟦
🟦🟥🟥🟦🟥🟦🟥🟥🟥🟦
🟦🟥🟥🟦🟥🟦🟥🟥🟥🟥🟦
🟦🟥🟥🟥🟦🟥🟥🟥🟥🟥🟥🟦
🟦🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟦
🟦🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
`;

interface Props {
	// Props would come from Pastel for arguments and options
}

export default function Index({}: Props) {
	const { exit } = useApp();
	const [currentView, setCurrentView] = useState<'main' | 'command'>('main');
	const [selectedCommand, setSelectedCommand] = useState<string>('');

	const menuOptions: SelectOption[] = [
		{ label: '🏔️  Explore Destinations', value: 'destinations' },
		{ label: '🗺️  Browse Regions', value: 'regions' },
		{ label: '🕉️  Discover Culture', value: 'culture' },
		{ label: '🏃‍♂️ Adventure Activities', value: 'adventure' },
		{ label: '💬 Community Messages', value: 'messages' },
		{ label: '💡 Travel Tips', value: 'tips' },
		{ label: '🎯 Plan Your Trip', value: 'planner' },
		{ label: '❓ Help & About', value: 'help' },
		{ label: '🚪 Exit', value: 'exit' }
	];

	const handleMenuSelection = (option: SelectOption) => {
		if (option.value === 'exit') {
			exit();
			return;
		}

		// Navigate directly to the command component
		setSelectedCommand(option.value);
		setCurrentView('command');
	};

	// Function to handle returning to main menu from command components
	const returnToMainMenu = () => {
		setCurrentView('main');
		setSelectedCommand('');
	};

	// Render the selected command component
	const renderCommand = () => {
		// Create a wrapper that handles the back navigation
		const CommandWrapper = ({ children }: { children: React.ReactNode }) => {
			// Override process.exit(0) calls to return to main menu instead
			const originalExit = process.exit;
			React.useEffect(() => {
				process.exit = (() => {
					returnToMainMenu();
				}) as any;
				
				return () => {
					process.exit = originalExit;
				};
			}, []);

			return <>{children}</>;
		};

		switch (selectedCommand) {
			case 'destinations':
				return <CommandWrapper><Destinations /></CommandWrapper>;
			case 'regions':
				return <CommandWrapper><Regions /></CommandWrapper>;
			case 'culture':
				return <CommandWrapper><Culture /></CommandWrapper>;
			case 'adventure':
				return <CommandWrapper><Adventure /></CommandWrapper>;
			case 'messages':
				return <CommandWrapper><Messages /></CommandWrapper>;
			case 'tips':
				return <CommandWrapper><Tips /></CommandWrapper>;
			case 'planner':
				return <CommandWrapper><Planner /></CommandWrapper>;
			case 'help':
				return <CommandWrapper><Help /></CommandWrapper>;
			default:
				return (
					<Box flexDirection="column" padding={2}>
						<Text color="red">Unknown command: {selectedCommand}</Text>
						<Text color="blue">Press any key to return to main menu</Text>
					</Box>
				);
		}
	};

	// If we're viewing a command, render it
	if (currentView === 'command') {
		return renderCommand();
	}

	return (
		<Box flexDirection="column" padding={2}>
			{/* Header with ASCII Art */}
			<Box flexDirection="column" alignItems="center" marginBottom={2}>
				<Text color="red" bold>
					{nepalAscii}
				</Text>
				<Box marginTop={1}>
					<Text color="blue" bold>
						🇳🇵 Welcome to the Interactive Nepal Explorer 🇳🇵
					</Text>
				</Box>
				<Box marginTop={1}>
					<Text color="gray">
						Discover the beauty, culture, and adventures of Nepal right from your terminal!
					</Text>
				</Box>
			</Box>

			{/* Nepal Flag */}
			<Box justifyContent="center" marginBottom={2}>
				<Text>{nepalFlag}</Text>
			</Box>

			{/* Quick Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={2}>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>🏔️ 8/14</Text>
					<Text color="gray">World's Highest Peaks</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>🌍 10+</Text>
					<Text color="gray">UNESCO World Heritage Sites</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>🗣️ 123</Text>
					<Text color="gray">Languages Spoken</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>🎭 100+</Text>
					<Text color="gray">Ethnic Groups</Text>
				</Box>
			</Box>

			{/* Main Menu */}
			<Box flexDirection="column">
				<Box marginBottom={1}>
					<Text color="cyan" bold>
						📋 What would you like to explore today?
					</Text>
				</Box>
				<SelectInput
					items={menuOptions}
					onSelect={handleMenuSelection}
					placeholder="Choose an option to get started:"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Box flexDirection="column">
					<Text color="gray">
						🎯 <Text color="white" bold>Pro Tip:</Text> Use arrow keys to navigate, Enter to select
					</Text>
					<Text color="gray">
						💡 <Text color="white" bold>Did you know?</Text> Nepal is the only country with a non-rectangular flag!
					</Text>
					<Text color="gray">
						🏔️ <Text color="white" bold>Fun Fact:</Text> Mount Everest (8,849m) is called "Sagarmatha" in Nepali
					</Text>
				</Box>
			</Box>
		</Box>
	);
}
