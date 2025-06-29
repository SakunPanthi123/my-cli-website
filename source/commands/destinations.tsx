import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { SelectInput, type SelectOption } from '../components/ui.js';

// Nepal destinations data
const destinations = [
	{
		name: 'Mount Everest Base Camp',
		region: 'Khumbu',
		description: 'World\'s highest mountain base camp trek through Sherpa villages and monasteries',
		altitude: 5364,
		bestSeason: 'March-May, September-November',
		activities: ['Trekking', 'Photography', 'Cultural exploration'],
		difficulty: 'Challenging',
		highlights: [
			'Views of Mount Everest (8,849m)',
			'Sherpa culture and traditions',
			'Tengboche Monastery',
			'Khumbu Icefall views',
			'Sagarmatha National Park'
		],
		tips: [
			'Acclimatize properly to avoid altitude sickness',
			'Book teahouses in advance during peak season',
			'Carry warm clothing and rain gear',
			'Respect local customs and environment'
		]
	},
	{
		name: 'Annapurna Circuit',
		region: 'Annapurna',
		description: 'Classic trek around the Annapurna massif with diverse landscapes',
		altitude: 5416,
		bestSeason: 'March-May, October-December',
		activities: ['Trekking', 'Mountain views', 'Cultural immersion'],
		difficulty: 'Moderate to Challenging',
		highlights: [
			'Thorong La Pass (5,416m)',
			'Diverse landscapes and ecosystems',
			'Hindu and Buddhist culture',
			'Hot springs in Tatopani',
			'Sunrise views from Poon Hill'
		],
		tips: [
			'Carry permits (ACAP and TIMS)',
			'Be prepared for weather changes',
			'Stay hydrated at high altitudes',
			'Respect local wildlife and environment'
		]
	},
	{
		name: 'Kathmandu Durbar Square',
		region: 'Kathmandu Valley',
		description: 'Historic palace complex with ancient temples and architecture',
		altitude: 1400,
		bestSeason: 'October-March',
		activities: ['Sightseeing', 'Cultural exploration', 'Photography'],
		difficulty: 'Easy',
		highlights: [
			'Hanuman Dhoka Palace',
			'Kumari Ghar (Living Goddess)',
			'Ancient temples and courtyards',
			'Traditional Newari architecture',
			'UNESCO World Heritage Site'
		],
		tips: [
			'Hire a local guide for better understanding',
			'Respect photography restrictions',
			'Dress modestly in temples',
			'Best to visit early morning or late afternoon'
		]
	},
	{
		name: 'Pokhara Lakeside',
		region: 'Western Hills',
		description: 'Beautiful lake city with stunning mountain views',
		altitude: 822,
		bestSeason: 'October-March',
		activities: ['Boating', 'Paragliding', 'Relaxation'],
		difficulty: 'Easy',
		highlights: [
			'Phewa Lake boat rides',
			'Annapurna range views',
			'Peace Pagoda',
			'Adventure sports hub',
			'Lakeside cafes and restaurants'
		],
		tips: [
			'Try paragliding for aerial views',
			'Take early morning boat rides',
			'Visit Davis Falls and caves',
			'Enjoy the relaxed atmosphere'
		]
	},
	{
		name: 'Chitwan National Park',
		region: 'Terai',
		description: 'UNESCO World Heritage site rich in wildlife including rhinos and tigers',
		altitude: 150,
		bestSeason: 'October-March',
		activities: ['Wildlife safari', 'Jungle walks', 'Canoeing'],
		difficulty: 'Easy',
		highlights: [
			'One-horned rhinoceros',
			'Bengal tigers',
			'Elephant safari',
			'Tharu cultural programs',
			'Bird watching (500+ species)'
		],
		tips: [
			'Book safari in advance',
			'Wear neutral colored clothing',
			'Bring binoculars for bird watching',
			'Respect wildlife and maintain distance'
		]
	},
	{
		name: 'Lumbini',
		region: 'Terai',
		description: 'Birthplace of Lord Buddha, sacred pilgrimage site',
		altitude: 150,
		bestSeason: 'October-March',
		activities: ['Spiritual journey', 'Meditation', 'Cultural exploration'],
		difficulty: 'Easy',
		highlights: [
			'Maya Devi Temple (birthplace)',
			'Sacred Garden',
			'Ashoka Pillar',
			'International monasteries',
			'Peace and meditation'
		],
		tips: [
			'Maintain silence in sacred areas',
			'Dress modestly and respectfully',
			'Join meditation sessions',
			'Visit early morning for peaceful experience'
		]
	}
];

export default function Destinations() {
	const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
	const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);

	// Handle input for detail view - always call the hook but only act when in detail view
	useInput(() => {
		if (currentView === 'detail' && selectedDestination) {
			setCurrentView('list');
			setSelectedDestination(null);
		}
	});

	const destinationOptions: SelectOption[] = destinations.map(dest => ({
		label: `${getRegionEmoji(dest.region)} ${dest.name} - ${dest.region}`,
		value: dest.name
	}));

	const backOption: SelectOption = { label: '← Back to Main Menu', value: 'back' };
	const allOptions = [backOption, ...destinationOptions];

	function getRegionEmoji(region: string): string {
		switch (region) {
			case 'Khumbu': return '🏔️';
			case 'Annapurna': return '⛰️';
			case 'Kathmandu Valley': return '🏛️';
			case 'Western Hills': return '🏞️';
			case 'Terai': return '🌿';
			default: return '📍';
		}
	}

	function getDifficultyColor(difficulty: string): string {
		switch (difficulty.toLowerCase()) {
			case 'easy': return 'green';
			case 'moderate': return 'yellow';
			case 'challenging': return 'red';
			case 'moderate to challenging': return 'yellow';
			default: return 'white';
		}
	}

	const handleSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			process.exit(0); // This will be intercepted by CommandWrapper to return to main menu
		} else {
			const destination = destinations.find(d => d.name === option.value);
			if (destination) {
				setSelectedDestination(destination);
				setCurrentView('detail');
			}
		}
	};

	if (currentView === 'detail' && selectedDestination) {
		return (
			<Box flexDirection="column" padding={2}>
				{/* Header */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>
						{getRegionEmoji(selectedDestination.region)} {selectedDestination.name}
					</Text>
					<Text color="gray">{selectedDestination.region} • {selectedDestination.altitude}m altitude</Text>
				</Box>

				{/* Description */}
				<Box marginBottom={2}>
					<Text>{selectedDestination.description}</Text>
				</Box>

				{/* Key Info */}
				<Box flexDirection="row" marginBottom={2}>
					<Box flexDirection="column" width="50%">
						<Text color="yellow" bold>📅 Best Season:</Text>
						<Text color="white">{selectedDestination.bestSeason}</Text>
						<Box marginTop={1}>
							<Text color="red" bold>⚡ Difficulty:</Text>
							<Text color={getDifficultyColor(selectedDestination.difficulty)}>
								{selectedDestination.difficulty}
							</Text>
						</Box>
					</Box>
					<Box flexDirection="column" width="50%">
						<Text color="blue" bold>🎯 Activities:</Text>
						{selectedDestination.activities.map((activity, index) => (
							<Text key={index} color="white">• {activity}</Text>
						))}
					</Box>
				</Box>

				{/* Highlights */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="green" bold>✨ Highlights:</Text>
					{selectedDestination.highlights.map((highlight, index) => (
						<Text key={index} color="white">• {highlight}</Text>
					))}
				</Box>

				{/* Tips */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="magenta" bold>💡 Travel Tips:</Text>
					{selectedDestination.tips.map((tip, index) => (
						<Text key={index} color="white">• {tip}</Text>
					))}
				</Box>

				{/* Navigation */}
				<Box borderStyle="single" padding={1}>
					<Box flexDirection="row" justifyContent="space-between">
						<Text color="cyan">Press any key to return to destinations list</Text>
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
					🏔️ EXPLORE NEPAL'S TOP DESTINATIONS 🏔️
				</Text>
				<Text color="gray">
					Discover breathtaking places across the Himalayas and beyond
				</Text>
			</Box>

			{/* Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={3}>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>🗻 {destinations.filter(d => d.region.includes('Khumbu') || d.region.includes('Annapurna')).length}</Text>
					<Text color="gray">Mountain Treks</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>🏛️ {destinations.filter(d => d.region.includes('Kathmandu')).length}</Text>
					<Text color="gray">Heritage Sites</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>🌿 {destinations.filter(d => d.region.includes('Terai')).length}</Text>
					<Text color="gray">Wildlife Parks</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>🎯 {destinations.length}</Text>
					<Text color="gray">Total Destinations</Text>
				</Box>
			</Box>

			{/* Destination List */}
			<Box flexDirection="column">
				<SelectInput
					items={allOptions}
					onSelect={handleSelection}
					placeholder="Select a destination to explore:"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					💡 <Text color="white" bold>Tip:</Text> Each destination offers unique experiences - from world-class trekking to spiritual journeys!
				</Text>
			</Box>
		</Box>
	);
}
