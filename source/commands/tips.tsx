import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { SelectInput, type SelectOption } from '../components/ui.js';

// Travel tips data
const tipCategories = [
	{
		name: 'Health & Safety',
		emoji: '🏥',
		description: 'Essential health and safety information for traveling in Nepal',
		tips: [
			{
				title: 'Altitude Sickness Prevention',
				content: 'Ascend gradually (no more than 500m per day above 3000m), stay hydrated, avoid alcohol, and consider medication like Diamox if prone to altitude sickness. Listen to your body and descend immediately if symptoms worsen.',
				importance: 'Critical',
				author: 'Nepal Tourism Board'
			},
			{
				title: 'Water and Food Safety',
				content: 'Drink only bottled or properly treated water. Avoid ice, raw vegetables, and street food unless from trusted sources. Stick to hot, freshly cooked meals and peeled fruits you peel yourself.',
				importance: 'High',
				author: 'Travel Health Expert'
			},
			{
				title: 'Travel Insurance',
				content: 'Get comprehensive travel insurance that covers high-altitude activities, helicopter evacuation, and medical expenses. Many standard policies exclude trekking above 3000m.',
				importance: 'Critical',
				author: 'Insurance Specialist'
			},
			{
				title: 'Emergency Contacts',
				content: 'Save emergency numbers: Tourist Police (1144), Tourist Helpline (1168), and your embassy. Keep copies of important documents in separate locations.',
				importance: 'High',
				author: 'Embassy Official'
			},
			{
				title: 'Vaccinations Required',
				content: 'Ensure routine vaccines are current. Consider Hepatitis A/B, Typhoid, and Japanese Encephalitis. Yellow fever vaccination required if coming from affected areas.',
				importance: 'High',
				author: 'Medical Professional'
			}
		]
	},
	{
		name: 'Packing & Gear',
		emoji: '🎒',
		description: 'What to pack and essential gear for Nepal adventures',
		tips: [
			{
				title: 'Layered Clothing System',
				content: 'Pack base layers (merino wool), insulating layers (fleece/down), and shell layers (waterproof). Weather changes rapidly in mountains. Avoid cotton - it kills when wet.',
				importance: 'Critical',
				author: 'Mountain Guide'
			},
			{
				title: 'Footwear Essentials',
				content: 'Bring well-broken-in trekking boots, comfortable walking shoes, and flip-flops/sandals for teahouses. Gaiters recommended for dusty trails.',
				importance: 'High',
				author: 'Gear Specialist'
			},
			{
				title: 'Power and Electronics',
				content: 'Bring portable power bank, universal adapter, headlamp with extra batteries. Charging gets expensive and unreliable at higher altitudes.',
				importance: 'Medium',
				author: 'Tech Traveler'
			},
			{
				title: 'First Aid Kit',
				content: 'Include altitude sickness medication, diarrhea treatment, bandages, antiseptic, pain relievers, and any personal medications. Add blister treatment for trekking.',
				importance: 'High',
				author: 'Wilderness Medic'
			},
			{
				title: 'Don\'t Overpack',
				content: 'You can buy most things in Kathmandu/Pokhara. Focus on quality items you can\'t easily replace. Porter weight limits are 15kg.',
				importance: 'Medium',
				author: 'Experienced Trekker'
			}
		]
	},
	{
		name: 'Money & Budget',
		emoji: '💰',
		description: 'Financial tips and budgeting advice for Nepal travel',
		tips: [
			{
				title: 'Cash is King',
				content: 'ATMs are scarce above Namche Bazaar and Manang. Withdraw enough cash in Kathmandu/Pokhara. US dollars are widely accepted but carry small bills.',
				importance: 'Critical',
				author: 'Budget Expert'
			},
			{
				title: 'Daily Budget Planning',
				content: 'Budget $30-50/day for teahouse treks, $20-30/day for city stays, $10-15/day for basic local travel. Prices increase significantly with altitude.',
				importance: 'High',
				author: 'Financial Advisor'
			},
			{
				title: 'Tipping Guidelines',
				content: 'Tip guides 10-15% of total trek cost, porters 5-10%. Restaurant staff 10% for good service. Tipping is expected and important part of income.',
				importance: 'Medium',
				author: 'Cultural Guide'
			},
			{
				title: 'Bargaining Etiquette',
				content: 'Bargaining is expected in markets but not in fixed-price shops or restaurants. Be respectful and fair - a few dollars means more to locals than tourists.',
				importance: 'Medium',
				author: 'Local Business Owner'
			},
			{
				title: 'Hidden Costs',
				content: 'Budget extra for permits, charging devices, WiFi, hot showers, and laundry on treks. These "extras" add up quickly.',
				importance: 'Medium',
				author: 'Trek Cost Analyst'
			}
		]
	},
	{
		name: 'Cultural Etiquette',
		emoji: '🕉️',
		description: 'Respect local customs and cultural practices',
		tips: [
			{
				title: 'Temple and Monastery Etiquette',
				content: 'Remove shoes before entering, dress modestly, don\'t point feet toward religious objects, ask permission before photographing people or statues.',
				importance: 'High',
				author: 'Cultural Expert'
			},
			{
				title: 'Greeting and Interaction',
				content: 'Use "Namaste" with palms together. Avoid public displays of affection. Use right hand for eating and passing objects. Don\'t touch people\'s heads.',
				importance: 'High',
				author: 'Local Cultural Guide'
			},
			{
				title: 'Photography Ethics',
				content: 'Always ask permission before photographing people, especially in rural areas. Many people expect payment for photos. Respect "no photography" signs.',
				importance: 'Medium',
				author: 'Photography Ethics Advisor'
			},
			{
				title: 'Dress Code',
				content: 'Dress conservatively, especially in temples and rural areas. Cover shoulders and knees. Remove hats in religious places.',
				importance: 'High',
				author: 'Cultural Sensitivity Expert'
			},
			{
				title: 'Environmental Responsibility',
				content: 'Pack out all trash, use biodegradable soap, stick to trails, don\'t pick plants or disturb wildlife. Leave only footprints.',
				importance: 'Critical',
				author: 'Environmental Conservationist'
			}
		]
	},
	{
		name: 'Transportation',
		emoji: '🚌',
		description: 'Getting around Nepal efficiently and safely',
		tips: [
			{
				title: 'Domestic Flights',
				content: 'Book mountain flights early and be flexible with dates due to weather cancellations. Weight limits strictly enforced. Consider overland alternatives.',
				importance: 'High',
				author: 'Aviation Expert'
			},
			{
				title: 'Bus Travel Tips',
				content: 'Tourist buses are more comfortable than local buses. Book front seats to avoid motion sickness. Bring snacks and entertainment for long journeys.',
				importance: 'Medium',
				author: 'Transport Specialist'
			},
			{
				title: 'Taxi and Rickshaw Use',
				content: 'Always negotiate price before starting journey. Use meter if available. Keep small bills handy. Apps like Tootle work in Kathmandu.',
				importance: 'Medium',
				author: 'Local Transport User'
			},
			{
				title: 'Airport Navigation',
				content: 'Arrive 2 hours early for domestic flights, 3 hours for international. Keep passport and boarding pass accessible. Expect security checks.',
				importance: 'Medium',
				author: 'Frequent Flyer'
			},
			{
				title: 'Road Conditions',
				content: 'Roads can be rough and dusty. Motion sickness medication recommended. Delays common during monsoon season due to landslides.',
				importance: 'Medium',
				author: 'Road Safety Expert'
			}
		]
	},
	{
		name: 'Communication',
		emoji: '📱',
		description: 'Staying connected and communicating in Nepal',
		tips: [
			{
				title: 'Internet and WiFi',
				content: 'WiFi available in most hotels and cafes in cities, limited on treks. Consider local SIM card for data. Internet speed generally slow by international standards.',
				importance: 'Medium',
				author: 'Digital Nomad'
			},
			{
				title: 'Mobile Networks',
				content: 'Ncell and NTC are main providers. Ncell has better coverage on popular trek routes. Buy SIM card with your passport.',
				importance: 'Medium',
				author: 'Telecom Expert'
			},
			{
				title: 'Language Basics',
				content: 'Learn basic Nepali phrases: Dhanyabad (thank you), Kasto cha? (how are you?), Kati ho? (how much?). English widely spoken in tourist areas.',
				importance: 'Low',
				author: 'Language Teacher'
			},
			{
				title: 'Emergency Communication',
				content: 'Consider satellite communicator for remote treks. Keep embassy and emergency contacts saved offline. Download offline maps before trekking.',
				importance: 'High',
				author: 'Safety Communications Expert'
			},
			{
				title: 'Social Media Etiquette',
				content: 'Ask permission before posting photos of locals. Be mindful of cultural sensitivity in your posts. WiFi may be too slow for uploading videos.',
				importance: 'Low',
				author: 'Social Media Guide'
			}
		]
	}
];

export default function Tips() {
	const [currentView, setCurrentView] = useState<'categories' | 'tips' | 'detail'>('categories');
	const [selectedCategory, setSelectedCategory] = useState<typeof tipCategories[0] | null>(null);
	const [selectedTip, setSelectedTip] = useState<typeof tipCategories[0]['tips'][0] | null>(null);

	const categoryOptions: SelectOption[] = tipCategories.map(category => ({
		label: `${category.emoji} ${category.name}`,
		value: category.name
	}));

	const backOption: SelectOption = { label: '← Back to Main Menu', value: 'back' };
	const categoryBackOption: SelectOption = { label: '← Back to Categories', value: 'back' };

	const handleCategorySelection = (option: SelectOption) => {
		if (option.value === 'back') {
			process.exit(0);
		} else {
			const category = tipCategories.find(c => c.name === option.value);
			if (category) {
				setSelectedCategory(category);
				setCurrentView('tips');
			}
		}
	};

	const handleTipSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			setCurrentView('categories');
		} else if (selectedCategory) {
			const tip = selectedCategory.tips.find(t => t.title === option.value);
			if (tip) {
				setSelectedTip(tip);
				setCurrentView('detail');
			}
		}
	};

	const getImportanceColor = (importance: string): string => {
		switch (importance.toLowerCase()) {
			case 'critical': return 'red';
			case 'high': return 'yellow';
			case 'medium': return 'blue';
			case 'low': return 'gray';
			default: return 'white';
		}
	};

	// Tip detail view
	if (currentView === 'detail' && selectedTip) {
		return (
			<Box flexDirection="column" padding={2}>
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>{selectedTip.title}</Text>
					<Text color="gray">
						By {selectedTip.author} • Importance: <Text color={getImportanceColor(selectedTip.importance)}>{selectedTip.importance}</Text>
					</Text>
				</Box>

				<Box marginBottom={2} paddingX={2}>
					<Text>{selectedTip.content}</Text>
				</Box>

				<Box borderStyle="single" padding={1}>
					<Text color="blue">Press any key to return to tips list, Ctrl+C to exit</Text>
				</Box>
			</Box>
		);
	}

	// Tips list view
	if (currentView === 'tips' && selectedCategory) {
		const tipOptions: SelectOption[] = selectedCategory.tips.map(tip => ({
			label: `${tip.importance === 'Critical' ? '🚨' : tip.importance === 'High' ? '⚠️' : tip.importance === 'Medium' ? 'ℹ️' : '💡'} ${tip.title}`,
			value: tip.title
		}));

		return (
			<Box flexDirection="column" padding={2}>
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>
						{selectedCategory.emoji} {selectedCategory.name}
					</Text>
					<Text color="gray">{selectedCategory.description}</Text>
				</Box>

				<Box flexDirection="column">
					<SelectInput
						items={[categoryBackOption, ...tipOptions]}
						onSelect={handleTipSelection}
						placeholder="Select a tip to read:"
						selectedColor="cyan"
					/>
				</Box>

				<Box marginTop={2} borderStyle="single" padding={1}>
					<Text color="gray">
						Legend: 🚨 Critical • ⚠️ High • ℹ️ Medium • 💡 Low importance
					</Text>
				</Box>
			</Box>
		);
	}

	// Categories view
	return (
		<Box flexDirection="column" padding={2}>
			{/* Header */}
			<Box flexDirection="column" alignItems="center" marginBottom={3}>
				<Text color="cyan" bold>
					💡 NEPAL TRAVEL TIPS & ADVICE 💡
				</Text>
				<Text color="gray">
					Essential tips from experienced travelers and local experts
				</Text>
			</Box>

			{/* Tips Overview */}
			<Box justifyContent="center" marginBottom={2}>
				<Text color="blue">
					{`
    ╭─────────────────────────────────────────────────╮
    │  🏥 Health & Safety Essentials                  │
    │  🎒 Packing & Gear Recommendations             │  
    │  💰 Money & Budget Planning                     │
    │  🕉️ Cultural Etiquette Guide                   │
    │  🚌 Transportation Tips                         │
    │  📱 Communication & Connectivity               │
    ╰─────────────────────────────────────────────────╯
					`}
				</Text>
			</Box>

			{/* Quick Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={3}>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>🚨 {tipCategories.reduce((sum, cat) => sum + cat.tips.filter(tip => tip.importance === 'Critical').length, 0)}</Text>
					<Text color="gray">Critical Tips</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>⚠️ {tipCategories.reduce((sum, cat) => sum + cat.tips.filter(tip => tip.importance === 'High').length, 0)}</Text>
					<Text color="gray">High Priority</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>ℹ️ {tipCategories.reduce((sum, cat) => sum + cat.tips.filter(tip => tip.importance === 'Medium').length, 0)}</Text>
					<Text color="gray">Medium Priority</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>📚 {tipCategories.reduce((sum, cat) => sum + cat.tips.length, 0)}</Text>
					<Text color="gray">Total Tips</Text>
				</Box>
			</Box>

			{/* Category Selection */}
			<Box flexDirection="column">
				<SelectInput
					items={[backOption, ...categoryOptions]}
					onSelect={handleCategorySelection}
					placeholder="Select a category to explore:"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					💡 <Text color="white" bold>Pro Tip:</Text> Start with Critical and High priority tips for a safe and enjoyable journey!
				</Text>
			</Box>
		</Box>
	);
}
