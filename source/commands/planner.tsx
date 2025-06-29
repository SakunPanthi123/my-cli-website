import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { SelectInput, TextInput, type SelectOption } from '../components/ui.js';

interface TripPlan {
	name: string;
	duration: string;
	budget: string;
	difficulty: string;
	interests: string[];
	destinations: string[];
	activities: string[];
	bestTime: string;
}

const planTemplates: TripPlan[] = [
	{
		name: 'Classic Nepal Adventure',
		duration: '14 days',
		budget: '$1,500-2000',
		difficulty: 'Moderate',
		interests: ['Culture', 'Mountains', 'Trekking'],
		destinations: ['Kathmandu', 'Pokhara', 'Everest Base Camp'],
		activities: ['Heritage site tours', 'EBC trek', 'Lakeside relaxation'],
		bestTime: 'March-May, September-November'
	},
	{
		name: 'Cultural Heritage Tour',
		duration: '7 days',
		budget: '$800-1200',
		difficulty: 'Easy',
		interests: ['Culture', 'History', 'Art'],
		destinations: ['Kathmandu Valley', 'Bhaktapur', 'Patan'],
		activities: ['Durbar square visits', 'Temple tours', 'Traditional crafts'],
		bestTime: 'October-March'
	},
	{
		name: 'Extreme Adventure Package',
		duration: '21 days',
		budget: '$3000-4000',
		difficulty: 'Challenging',
		interests: ['Adventure', 'Mountains', 'Extreme Sports'],
		destinations: ['Everest Region', 'Annapurna', 'Pokhara'],
		activities: ['Everest Base Camp', 'Annapurna Circuit', 'Paragliding', 'Bungee Jumping'],
		bestTime: 'March-May, September-October'
	},
	{
		name: 'Wildlife & Nature Explorer',
		duration: '10 days',
		budget: '$1200-1600',
		difficulty: 'Easy to Moderate',
		interests: ['Wildlife', 'Nature', 'Photography'],
		destinations: ['Chitwan National Park', 'Bardia National Park', 'Pokhara'],
		activities: ['Jungle safari', 'Bird watching', 'Nature photography'],
		bestTime: 'October-March'
	},
	{
		name: 'Spiritual Journey',
		duration: '12 days',
		budget: '$1000-1400',
		difficulty: 'Easy',
		interests: ['Spirituality', 'Culture', 'Meditation'],
		destinations: ['Lumbini', 'Kathmandu', 'Rishikesh (India)'],
		activities: ['Temple visits', 'Meditation retreats', 'Pilgrimage sites'],
		bestTime: 'October-March, April-May'
	}
];

const interests = [
	'Culture & Heritage',
	'Mountain Trekking',
	'Adventure Sports',
	'Wildlife & Nature',
	'Spirituality & Meditation',
	'Photography',
	'Local Cuisine',
	'Festivals & Events'
];

const budgetRanges = [
	'Budget ($30-50/day)',
	'Mid-range ($50-100/day)',
	'Luxury ($100+/day)'
];

const durations = [
	'1 week',
	'2 weeks',
	'3 weeks',
	'1 month',
	'2+ months'
];

const difficulties = [
	'Easy (City tours, short walks)',
	'Moderate (Day hikes, cultural tours)',
	'Challenging (Multi-day treks)',
	'Extreme (High-altitude climbing)'
];

export default function Planner() {
	const [currentView, setCurrentView] = useState<'main' | 'custom' | 'template' | 'result'>('main');
	const [selectedTemplate, setSelectedTemplate] = useState<TripPlan | null>(null);
	const [customPlan, setCustomPlan] = useState<Partial<TripPlan>>({
		interests: [],
		destinations: [],
		activities: []
	});
	const [planStep, setPlanStep] = useState<'name' | 'duration' | 'budget' | 'difficulty' | 'interests' | 'review'>('name');

	const mainOptions: SelectOption[] = [
		{ label: '📋 Use Trip Template', value: 'template' },
		{ label: '🎯 Create Custom Plan', value: 'custom' },
		{ label: '💡 Get Recommendations', value: 'recommendations' },
		{ label: '📅 Check Best Times to Visit', value: 'timing' },
		{ label: '💰 Budget Calculator', value: 'budget' },
		{ label: '← Back to Main Menu', value: 'back' }
	];

	const templateOptions: SelectOption[] = planTemplates.map(template => ({
		label: `${template.name} (${template.duration}, ${template.difficulty})`,
		value: template.name
	}));

	const handleMainSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			process.exit(0);
		} else if (option.value === 'template') {
			setCurrentView('template');
		} else if (option.value === 'custom') {
			setCurrentView('custom');
			setPlanStep('name');
		} else {
			// For now, show templates for other options
			setCurrentView('template');
		}
	};

	const handleTemplateSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			setCurrentView('main');
		} else {
			const template = planTemplates.find(t => t.name === option.value);
			if (template) {
				setSelectedTemplate(template);
				setCurrentView('result');
			}
		}
	};

	const handleNameSubmit = (name: string) => {
		setCustomPlan(prev => ({ ...prev, name }));
		setPlanStep('duration');
	};

	const handleDurationSelection = (option: SelectOption) => {
		setCustomPlan(prev => ({ ...prev, duration: option.value }));
		setPlanStep('budget');
	};

	const handleBudgetSelection = (option: SelectOption) => {
		setCustomPlan(prev => ({ ...prev, budget: option.value }));
		setPlanStep('difficulty');
	};

	const handleDifficultySelection = (option: SelectOption) => {
		setCustomPlan(prev => ({ ...prev, difficulty: option.value }));
		setPlanStep('interests');
	};

	const handleInterestSelection = (option: SelectOption) => {
		const currentInterests = customPlan.interests || [];
		if (option.value === 'done') {
			setPlanStep('review');
		} else if (option.value === 'clear') {
			setCustomPlan(prev => ({ ...prev, interests: [] }));
		} else {
			const newInterests = currentInterests.includes(option.value)
				? currentInterests.filter(i => i !== option.value)
				: [...currentInterests, option.value];
			setCustomPlan(prev => ({ ...prev, interests: newInterests }));
		}
	};

	// Custom plan result
	if (currentView === 'result' && selectedTemplate) {
		return (
			<Box flexDirection="column" padding={2}>
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>{selectedTemplate.name}</Text>
					<Text color="gray">Complete Nepal travel plan</Text>
				</Box>

				<Box flexDirection="row" marginBottom={2}>
					<Box flexDirection="column" width="50%">
						<Text color="blue" bold>📅 Duration:</Text>
						<Text color="white">{selectedTemplate.duration}</Text>
						<Box marginTop={1}>
							<Text color="green" bold>💰 Budget:</Text>
							<Text color="white">{selectedTemplate.budget}</Text>
						</Box>
					</Box>
					<Box flexDirection="column" width="50%">
						<Text color="yellow" bold>⚡ Difficulty:</Text>
						<Text color="white">{selectedTemplate.difficulty}</Text>
						<Box marginTop={1}>
							<Text color="magenta" bold>📅 Best Time:</Text>
							<Text color="white">{selectedTemplate.bestTime}</Text>
						</Box>
					</Box>
				</Box>

				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>🎯 Your Interests:</Text>
					<Box flexDirection="row" flexWrap="wrap">
						{selectedTemplate.interests.map((interest, index) => (
							<Box key={index} marginRight={2} marginBottom={1}>
								<Text color="blue">• {interest}</Text>
							</Box>
						))}
					</Box>
				</Box>

				<Box flexDirection="column" marginBottom={2}>
					<Text color="green" bold>📍 Destinations:</Text>
					{selectedTemplate.destinations.map((destination, index) => (
						<Text key={index} color="white">• {destination}</Text>
					))}
				</Box>

				<Box flexDirection="column" marginBottom={2}>
					<Text color="red" bold>🎯 Activities:</Text>
					{selectedTemplate.activities.map((activity, index) => (
						<Text key={index} color="white">• {activity}</Text>
					))}
				</Box>

				<Box borderStyle="single" padding={1}>
					<Text color="blue">
						Press any key to return to planner menu, Ctrl+C to exit
					</Text>
				</Box>
			</Box>
		);
	}

	// Custom plan builder
	if (currentView === 'custom') {
		if (planStep === 'name') {
			return (
				<Box flexDirection="column" padding={2}>
					<Text color="cyan" bold>🎯 Create Your Custom Nepal Trip</Text>
					<Box marginTop={1} marginBottom={2}>
						<Text color="gray">Step 1 of 5: What would you like to call your trip?</Text>
					</Box>
					<TextInput
						placeholder="Enter trip name (e.g., My Nepal Adventure):"
						onSubmit={handleNameSubmit}
					/>
				</Box>
			);
		}

		if (planStep === 'duration') {
			return (
				<Box flexDirection="column" padding={2}>
					<Text color="cyan" bold>🎯 Create Your Custom Nepal Trip</Text>
					<Box marginTop={1} marginBottom={2}>
						<Text color="gray">Step 2 of 5: How long will you be traveling?</Text>
					</Box>
					<SelectInput
						items={durations.map(d => ({ label: d, value: d }))}
						onSelect={handleDurationSelection}
						placeholder="Select duration:"
						selectedColor="cyan"
					/>
				</Box>
			);
		}

		if (planStep === 'budget') {
			return (
				<Box flexDirection="column" padding={2}>
					<Text color="cyan" bold>🎯 Create Your Custom Nepal Trip</Text>
					<Box marginTop={1} marginBottom={2}>
						<Text color="gray">Step 3 of 5: What's your budget range?</Text>
					</Box>
					<SelectInput
						items={budgetRanges.map(b => ({ label: b, value: b }))}
						onSelect={handleBudgetSelection}
						placeholder="Select budget range:"
						selectedColor="cyan"
					/>
				</Box>
			);
		}

		if (planStep === 'difficulty') {
			return (
				<Box flexDirection="column" padding={2}>
					<Text color="cyan" bold>🎯 Create Your Custom Nepal Trip</Text>
					<Box marginTop={1} marginBottom={2}>
						<Text color="gray">Step 4 of 5: What difficulty level suits you?</Text>
					</Box>
					<SelectInput
						items={difficulties.map(d => ({ label: d, value: d }))}
						onSelect={handleDifficultySelection}
						placeholder="Select difficulty level:"
						selectedColor="cyan"
					/>
				</Box>
			);
		}

		if (planStep === 'interests') {
			const selectedCount = customPlan.interests?.length || 0;
			const interestItems: SelectOption[] = [
				...interests.map(interest => ({
					label: `${(customPlan.interests || []).includes(interest) ? '✅' : '⭕'} ${interest}`,
					value: interest
				})),
				{ label: '🧹 Clear All Selections', value: 'clear' },
				{ label: `✅ Done (${selectedCount} selected)`, value: 'done' }
			];

			return (
				<Box flexDirection="column" padding={2}>
					<Text color="cyan" bold>🎯 Create Your Custom Nepal Trip</Text>
					<Box marginTop={1} marginBottom={1}>
						<Text color="gray">Step 5 of 5: What are you interested in? (Select multiple)</Text>
					</Box>
					<Box marginBottom={2}>
						<Text color="yellow">Selected: {selectedCount} interests</Text>
					</Box>
					<SelectInput
						items={interestItems}
						onSelect={handleInterestSelection}
						placeholder="Select your interests:"
						selectedColor="cyan"
					/>
				</Box>
			);
		}

		if (planStep === 'review') {
			return (
				<Box flexDirection="column" padding={2}>
					<Text color="cyan" bold>🎯 Your Custom Nepal Trip Plan</Text>
					
					<Box flexDirection="column" marginBottom={2} borderStyle="single" padding={1}>
						<Text color="blue" bold>Trip Name: <Text color="white">{customPlan.name}</Text></Text>
						<Text color="green" bold>Duration: <Text color="white">{customPlan.duration}</Text></Text>
						<Text color="yellow" bold>Budget: <Text color="white">{customPlan.budget}</Text></Text>
						<Text color="magenta" bold>Difficulty: <Text color="white">{customPlan.difficulty}</Text></Text>
						<Text color="red" bold>Interests:</Text>
						{(customPlan.interests || []).map((interest, index) => (
							<Text key={index} color="white">  • {interest}</Text>
						))}
					</Box>

					<Box marginBottom={2}>
						<Text color="cyan" bold>📋 Recommended based on your preferences:</Text>
						<Text color="white">• Visit Kathmandu Valley for culture</Text>
						<Text color="white">• Consider Pokhara for adventure sports</Text>
						<Text color="white">• Plan for October-March for best weather</Text>
						<Text color="white">• Budget extra for permits and guides</Text>
					</Box>

					<SelectInput
						items={[
							{ label: '💾 Save Plan', value: 'save' },
							{ label: '✏️ Edit Plan', value: 'edit' },
							{ label: '🏠 Back to Main Menu', value: 'main' }
						]}
						onSelect={(option) => {
							if (option.value === 'save' || option.value === 'main') {
								setCurrentView('main');
							} else if (option.value === 'edit') {
								setPlanStep('name');
							}
						}}
						selectedColor="cyan"
					/>
				</Box>
			);
		}
	}

	// Template selection
	if (currentView === 'template') {
		return (
			<Box flexDirection="column" padding={2}>
				<Box flexDirection="column" alignItems="center" marginBottom={2}>
					<Text color="cyan" bold>📋 Trip Templates</Text>
					<Text color="gray">Choose a pre-designed Nepal adventure</Text>
				</Box>

				<Box flexDirection="column">
					<SelectInput
						items={[
							{ label: '← Back to Planner Menu', value: 'back' },
							...templateOptions
						]}
						onSelect={handleTemplateSelection}
						placeholder="Select a trip template:"
						selectedColor="cyan"
					/>
				</Box>

				<Box marginTop={2} borderStyle="single" padding={1}>
					<Text color="gray">
						💡 <Text color="white" bold>Tip:</Text> Templates can be customized to fit your specific needs and preferences!
					</Text>
				</Box>
			</Box>
		);
	}

	// Main planner menu
	return (
		<Box flexDirection="column" padding={2}>
			{/* Header */}
			<Box flexDirection="column" alignItems="center" marginBottom={3}>
				<Text color="cyan" bold>
					🎯 NEPAL TRIP PLANNER 🎯
				</Text>
				<Text color="gray">
					Plan your perfect Nepal adventure with personalized recommendations
				</Text>
			</Box>

			{/* Planning Tools Overview */}
			<Box justifyContent="center" marginBottom={2}>
				<Text color="magenta">
					{`
    ╭─────────────────────────────────────────────────╮
    │  📋 Pre-designed Trip Templates                 │
    │  🎯 Custom Trip Builder                         │  
    │  💡 Personalized Recommendations               │
    │  📅 Best Time to Visit Guide                   │
    │  💰 Budget Planning Tools                      │
    ╰─────────────────────────────────────────────────╯
					`}
				</Text>
			</Box>

			{/* Quick Planning Stats */}
			<Box flexDirection="row" justifyContent="space-around" marginBottom={3}>
				<Box flexDirection="column" alignItems="center">
					<Text color="blue" bold>📋 {planTemplates.length}</Text>
					<Text color="gray">Trip Templates</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="yellow" bold>🎯 {interests.length}</Text>
					<Text color="gray">Interest Categories</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="green" bold>📅 4</Text>
					<Text color="gray">Season Options</Text>
				</Box>
				<Box flexDirection="column" alignItems="center">
					<Text color="red" bold>💰 3</Text>
					<Text color="gray">Budget Ranges</Text>
				</Box>
			</Box>

			{/* Main Menu */}
			<Box flexDirection="column">
				<SelectInput
					items={mainOptions}
					onSelect={handleMainSelection}
					placeholder="How would you like to plan your trip?"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					🎯 <Text color="white" bold>Planning Tip:</Text> Consider your fitness level, budget, and time of year when planning your Nepal adventure!
				</Text>
			</Box>
		</Box>
	);
}
