import React, { useState } from "react";
import { MouseButtons, MouseClicks } from "../utils";
import { mouseHandler } from "../utils";

import {
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from "react-native";

type Props = {
	toggleLongButtonHandler: (button: MouseButtons, turn?: boolean | null) => void,
	toggleMouseLeft: boolean,
	toggleMouseMiddle: boolean,
	toggleMouseRight: boolean,
}

export const MouseClick = ({ toggleLongButtonHandler, toggleMouseLeft, toggleMouseMiddle, toggleMouseRight }: Props) => {
	const [clickedButton, setClickedButton] = useState<MouseButtons | null>(null);

	const handleClick = (button: MouseButtons) => {
		setClickedButton(button);
		setTimeout(() => setClickedButton(null), 100);
		mouseHandler(MouseClicks.CLICK, button);
	}

	return (
		<View style={styles.footer}>
			<TouchableWithoutFeedback
				onPress={() => toggleMouseLeft
											 ? toggleLongButtonHandler(MouseButtons.LEFT)
											 : handleClick(MouseButtons.LEFT)}
				onLongPress={() => toggleLongButtonHandler(MouseButtons.LEFT)}
			>
				<Image
					source={(toggleMouseLeft || (clickedButton == MouseButtons.LEFT))
						? require("../static/MouseLeftPressed.png")
						: require("../static/MouseLeft.png")
					}
					style={styles.leftClick}
				/>
			</TouchableWithoutFeedback>
			<View style={styles.center}>
				<TouchableWithoutFeedback
					onPress={() => toggleMouseMiddle
											 ? toggleLongButtonHandler(MouseButtons.MIDDLE)
											 : handleClick(MouseButtons.MIDDLE)}
					onLongPress={() => toggleLongButtonHandler(MouseButtons.MIDDLE)}
				>
					<Image
						source={(toggleMouseMiddle || (clickedButton == MouseButtons.MIDDLE))
							? require("../static/MiddleButtonPressed.png")
							: require("../static/MiddleButton.png")
						}
						style={styles.middleClick}
					/>
				</TouchableWithoutFeedback>
			</View>
			<TouchableWithoutFeedback
				onPress={() => toggleMouseRight
											 ? toggleLongButtonHandler(MouseButtons.RIGHT)
											 : handleClick(MouseButtons.RIGHT)}
				onLongPress={() => toggleLongButtonHandler(MouseButtons.RIGHT)}
			>
				<Image
					source={(toggleMouseRight || (clickedButton == MouseButtons.RIGHT))
						? require("../static/MouseRightPressed.png")
						: require("../static/MouseRight.png")
					}
					style={styles.rightClick}
				/>
			</TouchableWithoutFeedback>
		</View>
	)
}

const styles = StyleSheet.create({
	center: {
		alignItems: "center",
		zIndex: 1,
	},
	footer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		alignItems: "center",
	},
	leftClick: {
		position: "absolute",
		bottom: 0,
		width: 90,
		height: 212,
		right: "49.5%"
	},
	middleClick: {
		position: "absolute",
		bottom: 0,
		width: 38,
		height: 146,
	},
	rightClick: {
		position: "absolute",
		bottom: 0,
		width: 90,
		height: 212,
		left: "49.5%",
	},
});
