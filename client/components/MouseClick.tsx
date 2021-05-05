import React, { useState } from "react";
import { MouseButtons, MouseClicks } from "../utils";
import { mouseHandler } from "../utils";

import {
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";

export const MouseClick = () => {
	const [toggleMouseLeft, setToggleMouseLeft] = useState(false);
	const [toggleMouseMiddle, setToggleMouseMiddle] = useState(false);
	const [toggleMouseRight, setToggleMouseRight] = useState(false);

	const toggleLongButtonHandler = (button: MouseButtons) => {
		switch (button) {
			case MouseButtons.LEFT:
				setToggleMouseLeft(toggleMouseLeft ? false : true);
				toggleMouseLeft
					? mouseHandler(MouseClicks.RELEASE, MouseButtons.LEFT)
					: mouseHandler(MouseClicks.PRESS, MouseButtons.LEFT);
				break;
			case MouseButtons.MIDDLE:
				setToggleMouseMiddle(toggleMouseMiddle ? false : true);
				toggleMouseMiddle
					? mouseHandler(MouseClicks.RELEASE, MouseButtons.MIDDLE)
					: mouseHandler(MouseClicks.PRESS, MouseButtons.MIDDLE);
				break;
			case MouseButtons.RIGHT:
				setToggleMouseRight(toggleMouseRight ? false : true);
				toggleMouseRight
					? mouseHandler(MouseClicks.RELEASE, MouseButtons.RIGHT)
					: mouseHandler(MouseClicks.PRESS, MouseButtons.RIGHT);
				break;
		}
	}

	return (
		<View style={styles.footer}>
			<TouchableHighlight
				onPress={() => toggleMouseLeft
											 ? toggleLongButtonHandler(MouseButtons.LEFT)
											 : mouseHandler(MouseClicks.CLICK, MouseButtons.LEFT)}
				onLongPress={() => toggleLongButtonHandler(MouseButtons.LEFT)}
				underlayColor="#758599"
				style={
				[styles.leftClick,
				 toggleMouseLeft && styles.primaryColorDisable]
			}><View /></TouchableHighlight>
			<View style={styles.center}>
				<TouchableHighlight
					onPress={() => toggleMouseMiddle
											 ? toggleLongButtonHandler(MouseButtons.MIDDLE)
											 : mouseHandler(MouseClicks.CLICK, MouseButtons.MIDDLE)}
					onLongPress={() => toggleLongButtonHandler(MouseButtons.MIDDLE)}
					underlayColor="#314155"
					style={
					[styles.middleClick,
					 toggleMouseMiddle && styles.secondaryColorDisable]
				}><View /></TouchableHighlight>
			</View>
			<TouchableHighlight
				onPress={() => toggleMouseRight
											 ? toggleLongButtonHandler(MouseButtons.RIGHT)
											 : mouseHandler(MouseClicks.CLICK, MouseButtons.RIGHT)}
				onLongPress={() => toggleLongButtonHandler(MouseButtons.RIGHT)}
				underlayColor="#758599"
				style={
				[styles.rightClick,
				 toggleMouseRight && styles.primaryColorDisable]
				}><View /></TouchableHighlight>
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
		height: 200,
		left: "25%",
		backgroundColor: "darkgray",
	},
	primaryColorDisable: {
		backgroundColor: "#758599"
	},
	secondaryColorDisable: {
		backgroundColor: "#314155"
	},
	middleClick: {
		width: 25,
		height: 210,
		backgroundColor: "black",
	},
	rightClick: {
		position: "absolute",
		bottom: 0,
		width: 90,
		height: 200,
		right: "25%",
		backgroundColor: "darkgray",
	},
});
