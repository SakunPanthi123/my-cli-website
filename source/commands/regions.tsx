import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { SelectInput, type SelectOption } from '../components/ui.js';

// Nepal regions data
const regions = [
	{
		name: 'Mountains (Himal)',
		emoji: '🏔️',
		description: 'The highest mountain region of the world, home to 8 of the 14 highest peaks',
		altitude: '4,000m - 8,849m',
		climate: 'Alpine and Arctic',
		population: '6.73%',
		highlights: [
			'Mount Everest (Sagarmatha) - 8,849m',
			'Annapurna massif',
			'Manaslu and Dhaulagiri ranges',
			'Sherpa and Tibetan communities',
			'Yak herding and high-altitude agriculture'
		],
		destinations: [
			'Everest Base Camp',
			'Annapurna Circuit',
			'Manaslu Circuit',
			'Upper Mustang',
			'Dolpo'
		],
		activities: [
			'High-altitude trekking',
			'Mountain expeditions',
			'Cultural exploration',
			'Photography',
			'Spiritual journeys'
		],
		bestTime: 'March-May and September-November',
		challenges: [
			'Extreme altitude and weather',
			'Limited infrastructure',
			'Altitude sickness risk',
			'Remote locations'
		]
	},
	{
		name: 'Hills (Pahar)',
		emoji: '⛰️',
		description: 'The middle region with diverse landscapes, rich culture, and Nepal\'s major cities',
		altitude: '700m - 4,000m',
		climate: 'Temperate and Subtropical',
		population: '43%',
		highlights: [
			'Kathmandu Valley - UNESCO World Heritage sites',
			'Pokhara - Adventure sports capital',
			'Traditional hill settlements',
			'Diverse ethnic communities',
			'Terraced agriculture'
		],
		destinations: [
			'Kathmandu Valley',
			'Pokhara',
			'Bandipur',
			'Gorkha',
			'Tansen'
		],
		activities: [
			'Cultural sightseeing',
			'Moderate trekking',
			'Adventure sports',
			'Heritage tours',
			'Festival celebrations'
		],
		bestTime: 'October-March (winter), March-May (spring)',
		challenges: [
			'Monsoon rains (June-September)',
			'Traffic in urban areas',
			'Tourist crowds in peak season'
		]
	},
	{
		name: 'Terai (Plains)',
		emoji: '🌾',
		description: 'The southern lowland region, Nepal\'s breadbasket and wildlife paradise',
		altitude: '60m - 700m',
		climate: 'Tropical and Subtropical',
		population: '50.27%',
		highlights: [
			'Chitwan National Park - Royal Bengal tigers',
			'Bardia National Park - Wild elephants',
			'Lumbini - Birthplace of Buddha',
			'Fertile agricultural lands',
			'Tharu indigenous culture'
		],
		destinations: [
			'Chitwan National Park',
			'Bardia National Park',
			'Lumbini',
			'Janakpur',
			'Koshi Tappu'
		],
		activities: [
			'Wildlife safari',
			'Bird watching',
			'Cultural immersion',
			'River activities',
			'Religious pilgrimage'
		],
		bestTime: 'October-March (dry season)',
		challenges: [
			'Hot and humid summers',
			'Monsoon flooding',
			'Malaria risk in some areas'
		]
	}
];

export default function Regions() {
	const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
	const [selectedRegion, setSelectedRegion] = useState<typeof regions[0] | null>(null);

	// Handle input for detail view - always call the hook but only act when in detail view
	useInput(() => {
		if (currentView === 'detail' && selectedRegion) {
			setCurrentView('list');
			setSelectedRegion(null);
		}
	});

	const regionOptions: SelectOption[] = regions.map(region => ({
		label: `${region.emoji} ${region.name}`,
		value: region.name
	}));

	const backOption: SelectOption = { label: '← Back to Main Menu', value: 'back' };
	const allOptions = [backOption, ...regionOptions];

	const handleSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			process.exit(0);
		} else {
			const region = regions.find(r => r.name === option.value);
			if (region) {
				setSelectedRegion(region);
				setCurrentView('detail');
			}
		}
	};

	if (currentView === 'detail' && selectedRegion) {
		return (
			<Box flexDirection="column" padding={2}>
				{/* Header */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>
						{selectedRegion.emoji} {selectedRegion.name}
					</Text>
					<Text color="gray">
						{selectedRegion.altitude} • {selectedRegion.climate} Climate • {selectedRegion.population} of Nepal's population
					</Text>
				</Box>

				{/* Description */}
				<Box marginBottom={2}>
					<Text>{selectedRegion.description}</Text>
				</Box>

				{/* Key Info Grid */}
				<Box flexDirection="row" marginBottom={2}>
					<Box flexDirection="column" width="50%">
						<Text color="green" bold>✨ Key Highlights:</Text>
						{selectedRegion.highlights.map((highlight, index) => (
							<Text key={index} color="white">• {highlight}</Text>
						))}
					</Box>
					<Box flexDirection="column" width="50%">
						<Text color="blue" bold>🎯 Popular Activities:</Text>
						{selectedRegion.activities.map((activity, index) => (
							<Text key={index} color="white">• {activity}</Text>
						))}
					</Box>
				</Box>

				{/* Destinations */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="yellow" bold>📍 Must-Visit Destinations:</Text>
					<Box flexDirection="row" flexWrap="wrap">
						{selectedRegion.destinations.map((destination, index) => (
							<Box key={index} marginRight={3} marginBottom={1}>
								<Text color="cyan">• {destination}</Text>
							</Box>
						))}
					</Box>
				</Box>

				{/* Travel Info */}
				<Box flexDirection="row" marginBottom={2}>
					<Box flexDirection="column" width="50%">
						<Text color="magenta" bold>📅 Best Time to Visit:</Text>
						<Text color="white">{selectedRegion.bestTime}</Text>
					</Box>
					<Box flexDirection="column" width="50%">
						<Text color="red" bold>⚠️ Challenges:</Text>
						{selectedRegion.challenges.map((challenge, index) => (
							<Text key={index} color="white">• {challenge}</Text>
						))}
					</Box>
				</Box>

				{/* Navigation */}
				<Box borderStyle="single" padding={1}>
					<Box flexDirection="row" justifyContent="space-between">
						<Text color="cyan">Press any key to return to regions list</Text>
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
					🗺️ EXPLORE NEPAL'S GEOGRAPHIC REGIONS 🗺️
				</Text>
				<Text color="gray">
					From the world's highest peaks to fertile plains - discover Nepal's diverse geography
				</Text>
			</Box>

			{/* Nepal Map ASCII */}
			<Box justifyContent="center" marginBottom={2}>
				<Text color="blue">
					{`
        ╔══════════════════════════════════════╗
        ║    🏔️ MOUNTAINS (HIMAL) 🏔️          ║
        ║     🗻 Everest  🗻 Annapurna        ║
        ╠══════════════════════════════════════╣
        ║      ⛰️ HILLS (PAHAR) ⛰️            ║
        ║   🏛️ Kathmandu  🏞️ Pokhara        ║
        ╠══════════════════════════════════════╣
        ║      🌾 TERAI (PLAINS) 🌾           ║
        ║   🐅 Chitwan   🕉️ Lumbini          ║
        ╚══════════════════════════════════════╝
					`}
				</Text>
			</Box>

			{/* Quick Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={3}>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>🏔️ 6.73%</Text>
					<Text color="gray">Mountain Population</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>⛰️ 43%</Text>
					<Text color="gray">Hill Population</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>🌾 50.27%</Text>
					<Text color="gray">Terai Population</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>🌡️ 3</Text>
					<Text color="gray">Climate Zones</Text>
				</Box>
			</Box>

			{/* Region Selection */}
			<Box flexDirection="column">
				<SelectInput
					items={allOptions}
					onSelect={handleSelection}
					placeholder="Select a region to explore:"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					🌍 <Text color="white" bold>Geography Fact:</Text> Nepal spans from 60m to 8,849m altitude in just 200km width!
				</Text>
			</Box>
		</Box>
	);
}
