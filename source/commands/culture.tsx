import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { SelectInput, type SelectOption } from '../components/ui.js';

// Nepal culture data
const culturalAspects = [
	{
		name: 'Religions & Spirituality',
		emoji: '🕉️',
		description: 'Nepal is a spiritual melting pot where Hinduism and Buddhism coexist harmoniously',
		details: [
			'Hinduism: 81.3% of population',
			'Buddhism: 9% of population',
			'Kiratism: Indigenous religion',
			'Islam, Christianity, and others'
		],
		highlights: [
			'Pashupatinath Temple - Sacred Hindu site',
			'Swayambhunath Stupa - Monkey Temple',
			'Boudhanath Stupa - Largest Buddhist stupa',
			'Living Goddess Kumari tradition',
			'Meditation and yoga practices'
		],
		practices: [
			'Daily temple visits and offerings',
			'Meditation and prayer wheels',
			'Religious festivals and ceremonies',
			'Pilgrimage to sacred sites',
			'Mantras and spiritual chanting'
		]
	},
	{
		name: 'Festivals & Celebrations',
		emoji: '🎭',
		description: 'Nepal celebrates over 50 festivals annually, bringing communities together',
		details: [
			'Dashain: Biggest Hindu festival (15 days)',
			'Tihar: Festival of lights',
			'Holi: Festival of colors',
			'Buddha Jayanti: Buddha\'s birthday',
			'Local ethnic festivals'
		],
		highlights: [
			'Family reunions and blessings',
			'Traditional dances and music',
			'Special food preparations',
			'Colorful decorations and lights',
			'Cultural performances'
		],
		practices: [
			'Kite flying during Dashain',
			'Oil lamp lighting during Tihar',
			'Color throwing during Holi',
			'Community feasts and gatherings',
			'Traditional costume wearing'
		]
	},
	{
		name: 'Ethnic Diversity',
		emoji: '👥',
		description: 'Nepal is home to over 100 ethnic groups, each with unique traditions',
		details: [
			'Chhetri: 16.6% - Warrior caste',
			'Brahmin: 12.2% - Priestly caste',
			'Magar: 7.1% - Mountain people',
			'Tharu: 6.6% - Terai indigenous',
			'Tamang: 5.8% - Tibetan origin'
		],
		highlights: [
			'Sherpa: Mountain guides and climbers',
			'Newari: Kathmandu Valley natives',
			'Gurung: Famous warriors and trekkers',
			'Rai & Limbu: Eastern hill tribes',
			'Thakali: Annapurna region traders'
		],
		practices: [
			'Traditional dress and ornaments',
			'Unique languages and dialects',
			'Distinct cultural ceremonies',
			'Traditional crafts and arts',
			'Ancestral worship and customs'
		]
	},
	{
		name: 'Traditional Arts & Crafts',
		emoji: '🎨',
		description: 'Nepal\'s artistic heritage spans centuries with intricate craftsmanship',
		details: [
			'Wood carving: Temple and palace art',
			'Metal work: Bronze and brass crafts',
			'Stone sculpture: Religious statues',
			'Painting: Thangka and Paubha art',
			'Pottery: Traditional earthenware'
		],
		highlights: [
			'Newari architecture in Kathmandu Valley',
			'Intricate window and door carvings',
			'Buddhist thangka paintings',
			'Singing bowls and prayer wheels',
			'Traditional masks and puppets'
		],
		practices: [
			'Family craft traditions passed down',
			'Workshop clusters in old cities',
			'Religious art in temples',
			'Handicraft cooperatives',
			'Art teaching in communities'
		]
	},
	{
		name: 'Languages & Literature',
		emoji: '📚',
		description: 'Nepal recognizes 123 languages with rich oral and written traditions',
		details: [
			'Nepali: Official language (44.6%)',
			'Maithili: Terai region (11.7%)',
			'Bhojpuri: Southern plains (6%)',
			'Tharu: Indigenous Terai (5.8%)',
			'Tamang: Central hills (5.1%)'
		],
		highlights: [
			'Ancient Sanskrit texts and manuscripts',
			'Folk tales and epic stories',
			'Traditional songs and poems',
			'Oral history preservation',
			'Modern Nepali literature'
		],
		practices: [
			'Storytelling traditions',
			'Religious text recitation',
			'Folk song performances',
			'Poetry competitions',
			'Language preservation efforts'
		]
	},
	{
		name: 'Traditional Cuisine',
		emoji: '🍛',
		description: 'Nepali cuisine reflects the country\'s diverse geography and cultures',
		details: [
			'Dal Bhat: National dish (lentils & rice)',
			'Momos: Tibetan-style dumplings',
			'Gundruk: Fermented leafy vegetables',
			'Sel Roti: Traditional ring-shaped bread',
			'Dhido: Traditional millet/cornmeal'
		],
		highlights: [
			'Spiced with cumin, coriander, turmeric',
			'Regional variations across Nepal',
			'Vegetarian and non-vegetarian options',
			'Tea culture and traditional drinks',
			'Festival-specific special foods'
		],
		practices: [
			'Eating with hands traditionally',
			'Sharing meals as community bonding',
			'Seasonal cooking with local ingredients',
			'Food offerings in religious ceremonies',
			'Hospitality through food sharing'
		]
	}
];

export default function Culture() {
	const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
	const [selectedAspect, setSelectedAspect] = useState<typeof culturalAspects[0] | null>(null);

	// Handle input for detail view - always call the hook but only act when in detail view
	useInput(() => {
		if (currentView === 'detail' && selectedAspect) {
			setCurrentView('list');
			setSelectedAspect(null);
		}
	});

	const cultureOptions: SelectOption[] = culturalAspects.map(aspect => ({
		label: `${aspect.emoji} ${aspect.name}`,
		value: aspect.name
	}));

	const backOption: SelectOption = { label: '← Back to Main Menu', value: 'back' };
	const allOptions = [backOption, ...cultureOptions];

	const handleSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			process.exit(0);
		} else {
			const aspect = culturalAspects.find(a => a.name === option.value);
			if (aspect) {
				setSelectedAspect(aspect);
				setCurrentView('detail');
			}
		}
	};

	if (currentView === 'detail' && selectedAspect) {
		return (
			<Box flexDirection="column" padding={2}>
				{/* Header */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>
						{selectedAspect.emoji} {selectedAspect.name}
					</Text>
				</Box>

				{/* Description */}
				<Box marginBottom={2}>
					<Text>{selectedAspect.description}</Text>
				</Box>

				{/* Details */}
				<Box flexDirection="column" marginBottom={2}>
					<Text color="blue" bold>📊 Key Information:</Text>
					{selectedAspect.details.map((detail, index) => (
						<Text key={index} color="white">• {detail}</Text>
					))}
				</Box>

				{/* Highlights and Practices */}
				<Box flexDirection="row" marginBottom={2}>
					<Box flexDirection="column" width="50%">
						<Text color="green" bold>✨ Cultural Highlights:</Text>
						{selectedAspect.highlights.map((highlight, index) => (
							<Text key={index} color="white">• {highlight}</Text>
						))}
					</Box>
					<Box flexDirection="column" width="50%">
						<Text color="yellow" bold>🎯 Traditional Practices:</Text>
						{selectedAspect.practices.map((practice, index) => (
							<Text key={index} color="white">• {practice}</Text>
						))}
					</Box>
				</Box>

				{/* Navigation */}
				<Box borderStyle="single" padding={1}>
					<Box flexDirection="row" justifyContent="space-between">
						<Text color="cyan">Press any key to return to culture menu</Text>
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
					🕉️ DISCOVER NEPAL'S RICH CULTURE 🕉️
				</Text>
				<Text color="gray">
					Explore the diverse traditions, beliefs, and practices of Nepal's people
				</Text>
			</Box>

			{/* Cultural Stats */}
			<Box justifyContent="center" marginBottom={2}>
				<Text color="magenta">
					{`
    ╭─────────────────────────────────────────────────╮
    │  🏛️ 10 UNESCO World Heritage Sites              │
    │  👥 100+ Ethnic Groups & Communities            │  
    │  🗣️ 123 Languages Spoken                       │
    │  🎭 50+ Annual Festivals                        │
    │  🕉️ Birthplace of Lord Buddha                  │
    ╰─────────────────────────────────────────────────╯
					`}
				</Text>
			</Box>

			{/* Quick Cultural Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={3}>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>🕉️ 81.3%</Text>
					<Text color="gray">Hindu Population</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>☸️ 9%</Text>
					<Text color="gray">Buddhist Population</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>🎭 100+</Text>
					<Text color="gray">Ethnic Groups</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>📚 123</Text>
					<Text color="gray">Languages</Text>
				</Box>
			</Box>

			{/* Cultural Aspects */}
			<Box flexDirection="column">
				<SelectInput
					items={allOptions}
					onSelect={handleSelection}
					placeholder="Select a cultural aspect to explore:"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					🌸 <Text color="white" bold>Cultural Fact:</Text> "Namaste" means "I bow to the divine in you" - a beautiful greeting reflecting Nepal's spiritual nature!
				</Text>
			</Box>
		</Box>
	);
}
