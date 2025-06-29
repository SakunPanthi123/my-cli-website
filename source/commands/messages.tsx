import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { SelectInput, TextInput, type SelectOption } from '../components/ui.js';
import { getAllMessages, insertMessage, getAllDestinations } from '../utils/database.js';

// Mock messages data (will be replaced with database later)
const mockMessages = [
	{
		id: 1,
		username: 'MountainLover22',
		destination: 'Everest Base Camp',
		message: 'Just completed the EBC trek! The views were absolutely breathtaking. The Sherpa community was incredibly welcoming. Definitely recommend staying extra days in Namche Bazaar to acclimatize properly.',
		rating: 5,
		date: '2024-10-15'
	},
	{
		id: 2,
		username: 'AdventureSeeker',
		destination: 'Annapurna Circuit',
		message: 'Amazing 18-day trek around Annapurna! The diversity of landscapes is incredible - from subtropical forests to high alpine deserts. Thorong La Pass was challenging but so rewarding!',
		rating: 5,
		date: '2024-09-28'
	},
	{
		id: 3,
		username: 'CultureExplorer',
		destination: 'Kathmandu Valley',
		message: 'Spent a week exploring the heritage sites in Kathmandu Valley. Bhaktapur Durbar Square is my favorite - the traditional architecture is stunning. Don\'t miss the pottery square!',
		rating: 4,
		date: '2024-11-02'
	},
	{
		id: 4,
		username: 'WildlifeWatcher',
		destination: 'Chitwan National Park',
		message: 'Saw a Royal Bengal Tiger on my second day! The elephant safari was incredible, and the Tharu cultural program in the evening was very authentic. Stay at least 3 days.',
		rating: 5,
		date: '2024-10-20'
	},
	{
		id: 5,
		username: 'SpiritualTraveler',
		destination: 'Lumbini',
		message: 'Such a peaceful and spiritual place. The Maya Devi Temple and the sacred garden are must-visits. I spent hours meditating here. The international monasteries are also beautiful.',
		rating: 4,
		date: '2024-11-08'
	},
	{
		id: 6,
		username: 'ParaglidingPro',
		destination: 'Pokhara',
		message: 'Paragliding over Pokhara with the Annapurna range as backdrop was a dream come true! The tandem flight operators are very professional. Book early morning flights for clear views.',
		rating: 5,
		date: '2024-10-12'
	}
];

const destinations = [
	'Everest Base Camp',
	'Annapurna Circuit',
	'Kathmandu Valley',
	'Pokhara',
	'Chitwan National Park',
	'Lumbini',
	'Bandipur',
	'Gorkha',
	'Langtang Valley',
	'Manaslu Circuit'
];

export default function Messages() {
	const [currentView, setCurrentView] = useState<'main' | 'view' | 'write'>('main');
	const [messages, setMessages] = useState<any[]>([]);
	const [destinations, setDestinations] = useState<any[]>([]);
	const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
	const [newMessage, setNewMessage] = useState({
		username: '',
		destination: '',
		message: '',
		rating: 5
	});
	const [formStep, setFormStep] = useState<'username' | 'destination' | 'message' | 'rating' | 'confirm'>('username');

	// Load data from database
	useEffect(() => {
		try {
			const dbMessages = getAllMessages();
			const dbDestinations = getAllDestinations();
			setMessages(dbMessages);
			setDestinations(dbDestinations);
		} catch (error) {
			console.error('Error loading data:', error);
			// Fallback to mock data if database fails
			setMessages(mockMessages);
		}
	}, []);

	const mainOptions: SelectOption[] = [
		{ label: '📖 Read Community Messages', value: 'read' },
		{ label: '✍️ Write a Message', value: 'write' },
		{ label: '🔍 Browse by Destination', value: 'browse' },
		{ label: '📊 Message Statistics', value: 'stats' },
		{ label: '← Back to Main Menu', value: 'back' }
	];

	const messageOptions: SelectOption[] = messages.map(msg => ({
		label: `${msg.destination} - ${msg.username} (${msg.rating}⭐)`,
		value: msg.id.toString()
	}));

	const destinationOptions: SelectOption[] = destinations.map(dest => ({
		label: dest.name,
		value: dest.name
	}));

	const ratingOptions: SelectOption[] = [
		{ label: '⭐⭐⭐⭐⭐ Excellent (5 stars)', value: '5' },
		{ label: '⭐⭐⭐⭐ Very Good (4 stars)', value: '4' },
		{ label: '⭐⭐⭐ Good (3 stars)', value: '3' },
		{ label: '⭐⭐ Fair (2 stars)', value: '2' },
		{ label: '⭐ Poor (1 star)', value: '1' }
	];

	const handleMainSelection = (option: SelectOption) => {
		if (option.value === 'back') {
			process.exit(0);
		} else if (option.value === 'read') {
			setCurrentView('view');
		} else if (option.value === 'write') {
			setCurrentView('write');
			setFormStep('username');
		} else if (option.value === 'browse' || option.value === 'stats') {
			// These would show filtered views or statistics
			// For now, just show read view
			setCurrentView('view');
		}
	};

	const handleMessageSelection = (option: SelectOption) => {
		const message = messages.find(m => m.id.toString() === option.value);
		if (message) {
			setSelectedMessage(message);
		}
	};

	const handleUsernameSubmit = (username: string) => {
		setNewMessage(prev => ({ ...prev, username }));
		setFormStep('destination');
	};

	const handleDestinationSelection = (option: SelectOption) => {
		setNewMessage(prev => ({ ...prev, destination: option.value }));
		setFormStep('message');
	};

	const handleMessageSubmit = (message: string) => {
		setNewMessage(prev => ({ ...prev, message }));
		setFormStep('rating');
	};

	const handleRatingSelection = (option: SelectOption) => {
		setNewMessage(prev => ({ ...prev, rating: parseInt(option.value) }));
		setFormStep('confirm');
	};

	const handleConfirmSubmit = () => {
		try {
			// Find destination ID
			const destination = destinations.find(d => d.name === newMessage.destination);
			const destinationId = destination ? destination.id : null;
			
			// Save message to database
			insertMessage(destinationId, newMessage.username, newMessage.message, newMessage.rating);
			
			// Refresh messages from database
			const updatedMessages = getAllMessages();
			setMessages(updatedMessages);
			
			// Reset form and go back to main view
			setCurrentView('main');
			setNewMessage({ username: '', destination: '', message: '', rating: 5 });
			setFormStep('username');
		} catch (error) {
			console.error('Error saving message:', error);
			// Still reset form even if save fails
			setCurrentView('main');
			setNewMessage({ username: '', destination: '', message: '', rating: 5 });
			setFormStep('username');
		}
	};

	// Message detail view
	if (currentView === 'view' && selectedMessage) {
		return (
			<Box flexDirection="column" padding={2}>
				<Box flexDirection="column" marginBottom={2}>
					<Text color="cyan" bold>
						📍 {selectedMessage.destination}
					</Text>
					<Text color="gray">
						By {selectedMessage.username} • {selectedMessage.date} • {selectedMessage.rating}⭐
					</Text>
				</Box>

				<Box marginBottom={2} paddingX={2}>
					<Text>{selectedMessage.message}</Text>
				</Box>

				<Box borderStyle="single" padding={1}>
					<Text color="blue">Press any key to return to messages, Ctrl+C to exit</Text>
				</Box>
			</Box>
		);
	}

	// Write message form
	if (currentView === 'write') {
		if (formStep === 'username') {
			return (
				<Box flexDirection="column" padding={2}>
					<Box marginBottom={1}>
						<Text color="cyan" bold>✍️ Share Your Nepal Experience</Text>
					</Box>
					<Box marginBottom={2}>
						<Text color="gray">Step 1 of 4: What should we call you?</Text>
					</Box>
					<TextInput
						placeholder="Enter your username (e.g., TrekkerJohn, MountainLover):"
						onSubmit={handleUsernameSubmit}
					/>
				</Box>
			);
		}

		if (formStep === 'destination') {
			return (
				<Box flexDirection="column" padding={2}>
					<Box marginBottom={1}>
						<Text color="cyan" bold>✍️ Share Your Nepal Experience</Text>
					</Box>
					<Box marginBottom={2}>
						<Text color="gray">Step 2 of 4: Which destination are you writing about?</Text>
					</Box>
					<SelectInput
						items={destinationOptions}
						onSelect={handleDestinationSelection}
						placeholder="Select destination:"
						selectedColor="cyan"
					/>
				</Box>
			);
		}

		if (formStep === 'message') {
			return (
				<Box flexDirection="column" padding={2}>
					<Box marginBottom={1}>
						<Text color="cyan" bold>✍️ Share Your Nepal Experience</Text>
					</Box>
					<Box marginBottom={1}>
						<Text color="gray">Step 3 of 4: Tell us about your experience at {newMessage.destination}</Text>
					</Box>
					<Box marginBottom={2}>
						<Text color="yellow">Share tips, highlights, or advice for other travelers:</Text>
					</Box>
					<TextInput
						placeholder="Write your message here..."
						onSubmit={handleMessageSubmit}
						multiline={true}
					/>
				</Box>
			);
		}

		if (formStep === 'rating') {
			return (
				<Box flexDirection="column" padding={2}>
					<Box marginBottom={1}>
						<Text color="cyan" bold>✍️ Share Your Nepal Experience</Text>
					</Box>
					<Box marginBottom={2}>
						<Text color="gray">Step 4 of 4: How would you rate {newMessage.destination}?</Text>
					</Box>
					<SelectInput
						items={ratingOptions}
						onSelect={handleRatingSelection}
						placeholder="Select your rating:"
						selectedColor="cyan"
					/>
				</Box>
			);
		}

		if (formStep === 'confirm') {
			return (
				<Box flexDirection="column" padding={2}>
					<Box marginBottom={1}>
						<Text color="cyan" bold>✍️ Review Your Message</Text>
					</Box>
					
					<Box flexDirection="column" marginBottom={2} borderStyle="single" padding={1}>
						<Text color="blue" bold>Username: <Text color="white">{newMessage.username}</Text></Text>
						<Text color="green" bold>Destination: <Text color="white">{newMessage.destination}</Text></Text>
						<Text color="yellow" bold>Rating: <Text color="white">{'⭐'.repeat(newMessage.rating)} ({newMessage.rating}/5)</Text></Text>
						<Text color="magenta" bold>Message:</Text>
						<Text color="white">{newMessage.message}</Text>
					</Box>

					<Box marginBottom={2}>
						<Text color="gray">Would you like to submit this message?</Text>
					</Box>

					<SelectInput
						items={[
							{ label: '✅ Submit Message', value: 'submit' },
							{ label: '✏️ Edit Message', value: 'edit' },
							{ label: '❌ Cancel', value: 'cancel' }
						]}
						onSelect={(option) => {
							if (option.value === 'submit') {
								handleConfirmSubmit();
							} else if (option.value === 'edit') {
								setFormStep('username');
							} else {
								setCurrentView('main');
							}
						}}
						selectedColor="cyan"
					/>
				</Box>
			);
		}
	}

	// Message list view
	if (currentView === 'view') {
		return (
			<Box flexDirection="column" padding={2}>
				<Box flexDirection="column" alignItems="center" marginBottom={2}>
					<Text color="cyan" bold>💬 Community Messages</Text>
					<Text color="gray">Read experiences from fellow Nepal travelers</Text>
				</Box>

				<Box flexDirection="column" marginBottom={2}>
					<Text color="blue" bold>Recent Messages:</Text>
					<SelectInput
						items={[
							{ label: '← Back to Messages Menu', value: 'back' },
							...messageOptions
						]}
						onSelect={(option) => {
							if (option.value === 'back') {
								setCurrentView('main');
							} else {
								handleMessageSelection(option);
							}
						}}
						placeholder="Select a message to read:"
						selectedColor="cyan"
					/>
				</Box>
			</Box>
		);
	}

	// Main messages menu
	return (
		<Box flexDirection="column" padding={2}>
			{/* Header */}
			<Box flexDirection="column" alignItems="center" marginBottom={3}>
				<Text color="cyan" bold>
					💬 COMMUNITY MESSAGES 💬
				</Text>
				<Text color="gray">
					Share experiences and read stories from fellow Nepal explorers
				</Text>
			</Box>

			{/* Message Stats */}
			<Box justifyContent="center" marginBottom={2}>
				<Text color="blue">
					{`
    ╭─────────────────────────────────────────────────╮
    │  📝 ${messages.length.toString().padStart(3)} Total Messages                           │
    │  ⭐ ${messages.length > 0 ? (messages.reduce((sum, msg) => sum + (msg.rating || 0), 0) / messages.length).toFixed(1) : '0.0'} Average Rating                          │  
    │  🏔️ ${new Set(messages.map(m => m.destination_name || m.destination || 'Unknown')).size} Destinations Covered                  │
    │  👥 ${new Set(messages.map(m => m.username)).size} Active Community Members              │
    ╰─────────────────────────────────────────────────╯
					`}
				</Text>
			</Box>

			{/* Recent Messages Preview */}
			<Box flexDirection="column" marginBottom={3}>
				<Box marginBottom={1}>
					<Text color="yellow" bold>🔥 Latest Messages:</Text>
				</Box>
				{messages.slice(0, 3).map((msg) => (
					<Box key={msg.id} marginBottom={1} paddingLeft={2}>
						<Text color="white">
							<Text color="green">{msg.username}</Text> shared about <Text color="cyan">{msg.destination_name || msg.destination || 'Unknown'}</Text> • {'⭐'.repeat(msg.rating || 0)}
						</Text>
					</Box>
				))}
			</Box>

			{/* Main Menu */}
			<Box flexDirection="column">
				<SelectInput
					items={mainOptions}
					onSelect={handleMainSelection}
					placeholder="What would you like to do?"
					selectedColor="cyan"
				/>
			</Box>

			{/* Footer */}
			<Box marginTop={2} borderStyle="single" padding={1}>
				<Text color="gray">
					💡 <Text color="white" bold>Tip:</Text> Share your experiences to help fellow travelers plan their Nepal adventures!
				</Text>
			</Box>
		</Box>
	);
}
