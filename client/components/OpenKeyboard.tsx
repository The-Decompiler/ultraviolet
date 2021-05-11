import React, { useState, useEffect, useRef } from "react";

import {
	Dimensions,
	Image,
	Keyboard,
	Platform,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View
} from "react-native";

import { keyboardHandler } from "../utils";
import { DEFAULT_TEXT_VALUE } from "../utils";

enum KeyboardButtons { Up, Down }

export const OpenKeyboard = () => {
	const [keyPress, setKeyPress] = useState<string>(DEFAULT_TEXT_VALUE);
	const [keyboardShowing, setKeyboardShowing] = useState(false);
	const [clickedButton, setClickedButton] = useState<KeyboardButtons | null>(null);
	const inputRef = useRef<TextInput>(null);

	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", showKeyboard);
		Keyboard.addListener("keyboardDidHide", hideKeyboard);
		return () => {
			Keyboard.removeListener("keyboardDidShow", showKeyboard);
			Keyboard.removeListener("keyboardDidHide", hideKeyboard);
		};
	}, []);

	useEffect(() => {
		if (keyPress != DEFAULT_TEXT_VALUE) {
			keyboardHandler(keyPress);
			setKeyPress(DEFAULT_TEXT_VALUE);
		}
	}, [keyPress]);

	const showKeyboard = () => setKeyboardShowing(true);
	const hideKeyboard = () => setKeyboardShowing(false);

	const handlePress = () => {
		setClickedButton(KeyboardButtons.Up);
		setTimeout(() => setClickedButton(null), 150);
		if (inputRef.current) {
			inputRef.current.blur();
			inputRef.current.focus();
		}
	}

	return (
		<>
			{ (keyboardShowing && (Platform.OS != "android")) &&
				<View style={[styles.center, styles.topFloat, styles.button]}>
					<TouchableWithoutFeedback
						onPress={() => {
							setClickedButton(KeyboardButtons.Down);
							setTimeout(() => setClickedButton(null), 150);
							Keyboard.dismiss();
						}}
					>
						<Image
							source={(clickedButton == KeyboardButtons.Down)
								? require("../static/KeyboardDownButtonPressed.png")
								: require("../static/KeyboardDownButton.png")
							}
						/>
					</TouchableWithoutFeedback>
				</View>
			}
			<View style={[styles.center, styles.cornerFloat, styles.button]}>
				<TouchableWithoutFeedback
					onPress={handlePress}
				>
					<Image
						source={(clickedButton == KeyboardButtons.Up)
							? require("../static/KeyboardUpButtonPressed.png")
							: require("../static/KeyboardUpButton.png")
						}
					/>
				</TouchableWithoutFeedback>
			</View>
			<TextInput
				ref={inputRef}
				onChangeText={setKeyPress}
				value={keyPress}
				autoCapitalize="none"
				multiline={true}
				style={styles.invisible}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	center: {
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
	},
	topFloat: {
		position: "absolute",
		top: 50,
		left: ((100 - Math.round((71 / Dimensions.get("window").width) * 100)) / 2).toString() + "%",
	},
	cornerFloat: {
		position: "absolute",
		right: 25,
		bottom: 25,
	},
	button: {
		width: 71,
		height: 71,
	},
	invisible: {
		display: "none",
	},
});
