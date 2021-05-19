import React, { useState, useEffect } from "react";

import {
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	View
} from "react-native";

import { keyboardHandler } from "../utils";
import { DEFAULT_TEXT_VALUE } from "../utils";

type Props = {
	virtualTextHandler: string,
	setVirtualTextHandler: React.Dispatch<React.SetStateAction<string>>,
	keyboardHeight: number,
}

const TEXT_TIMEOUT = 5000;

export const VirtualText = ({ virtualTextHandler, setVirtualTextHandler, keyboardHeight }: Props) => {
	const [virtualText, setVirtualText] = useState("");
	const [showText, setShowText] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (virtualTextHandler != DEFAULT_TEXT_VALUE) {
			let text = keyboardHandler(virtualTextHandler);
			switch (text) {
				case "":
					break;
				case 0:
					setVirtualText("");
					break;
				case -1: // Backspace
					setVirtualText(virtualText.substring(0, virtualText.length - 1));
					clearWithin();
					break;
				default:
					setVirtualText(virtualText + text);
					clearWithin();
					break;
			}
			setVirtualTextHandler(DEFAULT_TEXT_VALUE);
			return () => {
				text = "";
			};
		}
	}, [virtualTextHandler]);

	// Reset timeout
	const clearWithin = () => {
		showText && clearTimeout(showText);
		setShowText(setTimeout(() => {
			setVirtualText("");
			setShowText(null);
		}, TEXT_TIMEOUT));
	}

	return (
		<>
		{ virtualText
			? <View style={stylesContainer(keyboardHeight).textBox}>
					<Text
						numberOfLines={1}
						ellipsizeMode="head"
						style={styles.text}
					>
						{ virtualText }
					</Text>
				</View>
			: <></>
		}
		</>
	)
}

const styles = StyleSheet.create({
	text: {
		color: "white",
		fontSize: 18,
		fontWeight: "400",
	},
});

const stylesContainer = (keyboardHeight: Props["keyboardHeight"]) => StyleSheet.create({
	textBox: {
		position: "absolute",
		bottom: (Platform.OS == "android" && StatusBar.currentHeight)
						? keyboardHeight + StatusBar.currentHeight
						: keyboardHeight,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: 40,
		backgroundColor: "#1B1134",
		zIndex: -1,
	},
});
