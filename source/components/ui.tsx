import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';

export interface SelectOption {
	label: string;
	value: string;
}

interface SelectInputProps {
	items: SelectOption[];
	onSelect: (item: SelectOption) => void;
	placeholder?: string;
	selectedColor?: string;
}

export function SelectInput({ items, onSelect, placeholder = 'Select an option', selectedColor = 'blue' }: SelectInputProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isActive, setIsActive] = useState(true);

	useInput((_input, key) => {
		if (!isActive) return;

		if (key.upArrow) {
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
		} else if (key.downArrow) {
			setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
		} else if (key.return) {
			setIsActive(false);
			const selectedItem = items[selectedIndex];
			if (selectedItem) {
				onSelect(selectedItem);
			}
		}
	});

	if (items.length === 0) {
		return <Text color="yellow">No options available</Text>;
	}

	return (
		<Box flexDirection="column">
			<Text color="gray">{placeholder}</Text>
			{items.map((item, index) => (
				<Box key={item.value} paddingLeft={2}>
					<Text color={index === selectedIndex ? selectedColor : 'white'}>
						{index === selectedIndex ? '▶ ' : '  '}
						{item.label}
					</Text>
				</Box>
			))}
			<Box marginTop={1}>
				<Text color="gray">Use ↑↓ arrows to navigate, Enter to select</Text>
			</Box>
		</Box>
	);
}

interface TextInputProps {
	placeholder?: string;
	onSubmit: (value: string) => void;
	defaultValue?: string;
	multiline?: boolean;
}

export function TextInput({ placeholder = 'Enter text...', onSubmit, defaultValue = '', multiline = false }: TextInputProps) {
	const [value, setValue] = useState(defaultValue);
	const [isActive, setIsActive] = useState(true);

	useInput((input, key) => {
		if (!isActive) return;

		if (key.return && !multiline) {
			setIsActive(false);
			onSubmit(value);
		} else if (multiline && key.ctrl && input === 's') {
			setIsActive(false);
			onSubmit(value);
		} else if (key.backspace || key.delete) {
			setValue(prev => prev.slice(0, -1));
		} else if (key.return && multiline) {
			setValue(prev => prev + '\n');
		} else if (input && !key.ctrl && !key.meta) {
			setValue(prev => prev + input);
		}
	});

	return (
		<Box flexDirection="column">
			<Text color="gray">{placeholder}</Text>
			<Box borderStyle="single" paddingX={1} width={60}>
				<Text>{value || ' '}</Text>
			</Box>
			<Box marginTop={1}>
				<Text color="gray">
					{multiline ? 'Ctrl+S to submit' : 'Enter to submit'}
				</Text>
			</Box>
		</Box>
	);
}

interface ConfirmProps {
	message: string;
	onConfirm: (confirmed: boolean) => void;
}

export function Confirm({ message, onConfirm }: ConfirmProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const options = ['Yes', 'No'];

	useInput((_input, key) => {
		if (key.leftArrow) {
			setSelectedIndex(0);
		} else if (key.rightArrow) {
			setSelectedIndex(1);
		} else if (key.return) {
			onConfirm(selectedIndex === 0);
		}
	});

	return (
		<Box flexDirection="column">
			<Text>{message}</Text>
			<Box marginTop={1}>
				{options.map((option, index) => (
					<Box key={option} marginRight={4}>
						<Text color={index === selectedIndex ? 'blue' : 'white'}>
							{index === selectedIndex ? '▶ ' : '  '}
							{option}
						</Text>
					</Box>
				))}
			</Box>
			<Box marginTop={1}>
				<Text color="gray">Use ← → arrows, Enter to confirm</Text>
			</Box>
		</Box>
	);
}

interface SpinnerProps {
	message?: string;
}

export function Spinner({ message = 'Loading...' }: SpinnerProps) {
	const [frame, setFrame] = useState(0);
	const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

	useEffect(() => {
		const timer = setInterval(() => {
			setFrame(prev => (prev + 1) % frames.length);
		}, 100);

		return () => clearInterval(timer);
	}, []);

	return (
		<Box>
			<Text color="blue">{frames[frame]} </Text>
			<Text>{message}</Text>
		</Box>
	);
}

interface ProgressBarProps {
	progress: number; // 0-100
	width?: number;
	label?: string;
}

export function ProgressBar({ progress, width = 40, label }: ProgressBarProps) {
	const filled = Math.round((progress / 100) * width);
	const empty = width - filled;

	return (
		<Box flexDirection="column">
			{label && <Text color="gray">{label}</Text>}
			<Box>
				<Text color="green">{'█'.repeat(filled)}</Text>
				<Text color="gray">{'░'.repeat(empty)}</Text>
				<Text> {progress}%</Text>
			</Box>
		</Box>
	);
}
