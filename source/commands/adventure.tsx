import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { SelectInput, type SelectOption } from '../components/ui.js';

// Adventure activities data
const adventures = [
	{
		name: 'Trekking & Hiking',
		emoji: '🥾',
		description: 'Nepal offers some of the world\'s most spectacular trekking routes through the Himalayas',
		duration: '3-21 days',
		difficulty: 'Easy to Challenging',
		highlights: [
			'Everest Base Camp Trek (14 days)',
			'Annapurna Circuit (15-20 days)',
			'Langtang Valley Trek (7-10 days)',
			'Manaslu Circuit Trek (14-18 days)',
			'Ghorepani Poon Hill Trek (3-5 days)'
		],
		requirements: [
			'Good physical fitness',
			'Proper trekking gear',
			'TIMS card and permits',
			'Travel insurance',
			'Acclimatization planning'
		],
		bestTime: 'March-May, September-November',
		tips: [
			'Start with shorter treks if you\'re a beginner',
			'Hire local guides and porters',
			'Pack layers for changing weather',
			'Stay hydrated and eat regularly'
		]
	},
	{
		name: 'Mountain Climbing',
		emoji: '🧗‍♂️',
		description: 'Challenge yourself on Nepal\'s world-famous peaks, from beginner-friendly to expert-level',
		duration: '15-60 days',
		difficulty: 'Challenging to Extreme',
		highlights: [
			'Mount Everest (8,849m) - World\'s highest',
			'Annapurna I (8,091m) - First 8000m climbed',
			'Manaslu (8,163m) - Mountain of the Spirit',
			'Cho Oyu (8,188m) - Turquoise Goddess',
			'Island Peak (6,189m) - Perfect training peak'
		],
		requirements: [
			'Extensive mountaineering experience',
			'Technical climbing skills',
			'High-altitude experience',
			'Climbing permits and fees',
			'Professional expedition team'
		],
		bestTime: 'April-May, September-October',
		tips: [
			'Start with smaller peaks for experience',
			'Invest in quality gear and training',
			'Consider hiring experienced Sherpa guides',
			'Plan for weather windows carefully'
		]
	},
	{
		name: 'White Water Rafting',
		emoji: '🚣‍♂️',
		description: 'Experience Nepal\'s wild rivers with thrilling rapids and stunning scenery',
		duration: '1-10 days',
		difficulty: 'Beginner to Advanced',
		highlights: [
			'Trishuli River - Perfect for beginners',
			'Bhote Koshi - Extreme white water',
			'Kali Gandaki - Multi-day expedition',
			'Sun Koshi - 9-day river journey',
			'Seti River - Gentle family-friendly'
		],
		requirements: [
			'Basic swimming ability',
			'Safety briefing completion',
			'Life jacket and helmet',
			'Quick-dry clothing',
			'Waterproof storage'
		],
		bestTime: 'September-December, March-May',
		tips: [
			'Choose river grade based on experience',
			'Bring waterproof camera',
			'Listen carefully to safety instructions',
			'Book with reputable operators'
		]
	},
	{
		name: 'Paragliding',
		emoji: '🪂',
		description: 'Soar over Nepal\'s stunning landscapes with the Himalayas as your backdrop',
		duration: '30 minutes - 2 hours',
		difficulty: 'Beginner to Intermediate',
		highlights: [
			'Pokhara - World\'s 2nd best paragliding site',
			'Sarangkot - Popular launch point',
			'Bandipur - Scenic hill station flights',
			'Nagarkot - Himalayan sunrise flights',
			'Tandem flights available for beginners'
		],
		requirements: [
			'No experience needed for tandem',
			'Weight restrictions apply',
			'Good weather conditions',
			'Comfortable clothing',
			'Camera for aerial photos'
		],
		bestTime: 'October-April',
		tips: [
			'Book tandem flights for first experience',
			'Early morning flights offer best views',
			'Bring motion sickness medication if needed',
			'Check weather conditions before booking'
		]
	},
	{
		name: 'Bungee Jumping',
		emoji: '🤸‍♂️',
		description: 'Take the ultimate leap of faith from Nepal\'s highest bungee jumping sites',
		duration: '2-4 hours',
		difficulty: 'Extreme (no experience required)',
		highlights: [
			'The Last Resort - 160m highest bungee',
			'Bhote Koshi River gorge',
			'Swiss-designed safety systems',
			'Canyon swing also available',
			'Certificate of bravery provided'
		],
		requirements: [
			'Age 16-65 years',
			'Weight 45-110 kg',
			'No heart conditions',
			'Signed waiver required',
			'Mental preparation!'
		],
		bestTime: 'October-March',
		tips: [
			'Eat light breakfast before jumping',
			'Wear comfortable, secure clothing',
			'Bring change of clothes',
			'Take the video package for memories'
		]
	},
	{
		name: 'Wildlife Safari',
		emoji: '🦏',
		description: 'Explore Nepal\'s incredible biodiversity in protected national parks',
		duration: '2-7 days',
		difficulty: 'Easy to Moderate',
		highlights: [
			'Chitwan National Park - Rhinos and tigers',
			'Bardia National Park - Wild elephants',
			'Koshi Tappu - Bird watching paradise',
			'Shivapuri Nagarjun - Hiking and wildlife',
			'Elephant back safaris available'
		],
		requirements: [
			'Park entry fees and permits',
			'Comfortable walking shoes',
			'Binoculars recommended',
			'Insect repellent',
			'Quiet behavior around wildlife'
		],
		bestTime: 'October-March',
		tips: [
			'Early morning safaris see more wildlife',
			'Stay in jungle lodges for full experience',
			'Respect wildlife and maintain distance',
			'Hire local guides for best spotting'
		]
	}
];

export default function Adventure() {
	const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
	const [selectedAdventure, setSelectedAdventure] = useState<typeof adventures[0] | null>(null);

	// Handle input for detail view - always call the hook but only act when in detail view
	useInput(() => {
		if (currentView === 'detail' && selectedAdventure) {
			setCurrentView('list');
			setSelectedAdventure(null);
		}
	});

	const adventureOptions: SelectOption[] = adventures.map(adventure => ({
		label: `${adventure.emoji} ${adventure.name}`,
		value: adventure.name
	}));

	const backOption: SelectOption = { label: '← Back to Main Menu', value: 'back' };
	const allOptions = [backOption, ...adventureOptions];

	const handleSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			process.exit(0);
		} else {
			const adventure = adventures.find(a => a.name === option.value);
			if (adventure) {
				setSelectedAdventure(adventure);
				setCurrentView('detail');
			}
		}
	};

	const getDifficultyColor = (difficulty: string): string => {
		if (difficulty.includes('Easy')) return 'green';
		if (difficulty.includes('Moderate')) return 'yellow';
		if (difficulty.includes('Challenging')) return 'red';
		if (difficulty.includes('Extreme')) return 'magenta';
		return 'white';
	};

	if (currentView === 'detail' && selectedAdventure) {
		return (
			<Box flexDirection="column" padding={2}>
				{/* Header */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>
						{selectedAdventure.emoji} {selectedAdventure.name}
					</Text>
					<Text color="gray">
						{selectedAdventure.duration} • {selectedAdventure.difficulty}
					</Text>
				</Box>

				{/* Description */}
				<Box marginBottom={2}>
					<Text>{selectedAdventure.description}</Text>
				</Box>

				{/* Key Info */}
				<Box flexDirection="row" marginBottom={2}>
					<Box flexDirection="column" width="50%">
						<Text color="yellow" bold>📅 Best Time:</Text>
						<Text color="white">{selectedAdventure.bestTime}</Text>
						<Box marginTop={1}>
							<Text color="red" bold>⚡ Difficulty:</Text>
							<Text color={getDifficultyColor(selectedAdventure.difficulty)}>
								{selectedAdventure.difficulty}
							</Text>
						</Box>
					</Box>
					<Box flexDirection="column" width="50%">
						<Text color="blue" bold>⏱️ Duration:</Text>
						<Text color="white">{selectedAdventure.duration}</Text>
					</Box>
				</Box>

				{/* Highlights */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="green" bold>✨ Adventure Highlights:</Text>
					{selectedAdventure.highlights.map((highlight, index) => (
						<Text key={index} color="white">• {highlight}</Text>
					))}
				</Box>

				{/* Requirements and Tips */}
				<Box flexDirection="row" marginBottom={2}>
					<Box flexDirection="column" width="50%">
						<Text color="magenta" bold>📋 Requirements:</Text>
						{selectedAdventure.requirements.map((req, index) => (
							<Text key={index} color="white">• {req}</Text>
						))}
					</Box>
					<Box flexDirection="column" width="50%">
						<Text color="cyan" bold>💡 Pro Tips:</Text>
						{selectedAdventure.tips.map((tip, index) => (
							<Text key={index} color="white">• {tip}</Text>
						))}
					</Box>
				</Box>

				{/* Navigation */}
				<Box borderStyle="single" padding={1}>
					<Box flexDirection="row" justifyContent="space-between">
						<Text color="cyan">Press any key to return to adventures list</Text>
						<Text color="gray">Ctrl+C to exit</Text>
					</Box>
				</Box>
			</Box>
		);
	}

	return (
		<Box flexDirection="column" padding={2}>
			{/* Header */}
			<Box flexDirection="column" alignItems="center" marginBottom={3}>
				<Text color="cyan" bold>
					🏃‍♂️ NEPAL ADVENTURE ACTIVITIES 🏃‍♂️
				</Text>
				<Text color="gray">
					From peaceful treks to extreme sports - find your perfect Nepal adventure
				</Text>
			</Box>

			{/* Adventure Stats */}
			<Box justifyContent="center" marginBottom={2}>
				<Text color="magenta">
					{`
    ╭─────────────────────────────────────────────────╮
    │  🥾 World's Best Trekking Destinations          │
    │  🏔️ 8 of World's 14 Highest Peaks             │  
    │  🚣‍♂️ Grade I-V White Water Rapids              │
    │  🪂 World's 2nd Best Paragliding Site          │
    │  🦏 Rare Wildlife & National Parks             │
    ╰─────────────────────────────────────────────────╯
					`}
				</Text>
			</Box>

			{/* Quick Adventure Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={3}>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>🥾 50+</Text>
					<Text color="gray">Trekking Routes</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>🏔️ 8</Text>
					<Text color="gray">8000m+ Peaks</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>🚣‍♂️ 6</Text>
					<Text color="gray">Major Rivers</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>🎯 365</Text>
					<Text color="gray">Adventure Days/Year</Text>
				</Box>
			</Box>

			{/* Adventure Selection */}
			<Box flexDirection="column">
				<SelectInput
					items={allOptions}
					onSelect={handleSelection}
					placeholder="Select an adventure activity to explore:"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					⚡ <Text color="white" bold>Adventure Fact:</Text> Nepal has adventures for every thrill level - from gentle walks to Everest expeditions!
				</Text>
			</Box>
		</Box>
	);
}
