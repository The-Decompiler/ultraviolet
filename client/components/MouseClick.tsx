import React, { useState } from "react";

import {
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";

enum MouseButtons {
	LEFT = "LEFT",
	MIDDLE = "MIDDLE",
	RIGHT = "RIGHT"
}

export const MouseClick = () => {
	const [toggleLongButton, setToggleLongButton] = useState<MouseButtons | null>(null);

	const toggleLongButtonHandler = (button: MouseButtons) =>
		setToggleLongButton((toggleLongButton == button) ? null : button);

	return (
		<View style={styles.footer}>
			<TouchableHighlight
				onPress={() => console.log("Left Click")}
				onLongPress={() => toggleLongButtonHandler(MouseButtons.LEFT)}
				underlayColor="#758599"
				style={
				[styles.leftClick,
				 (toggleLongButton == MouseButtons.LEFT) && styles.primaryColorDisable]
			}><View /></TouchableHighlight>
			<View style={styles.center}>
				<TouchableHighlight
					onPress={() => console.log("Middle Click")}
					onLongPress={() => toggleLongButtonHandler(MouseButtons.MIDDLE)}
					underlayColor="#314155"
					style={
					[styles.middleClick,
					 (toggleLongButton == MouseButtons.MIDDLE) && styles.secondaryColorDisable]
				}><View /></TouchableHighlight>
			</View>
			<TouchableHighlight
				onPress={() => console.log("Right Click")}
				onLongPress={() => toggleLongButtonHandler(MouseButtons.RIGHT)}
				underlayColor="#758599"
				style={
				[styles.rightClick,
				 (toggleLongButton == MouseButtons.RIGHT) && styles.primaryColorDisable]
				}><View /></TouchableHighlight>
		</View>
	)
}

const styles = StyleSheet.create({
	center: {
		width: "100%",
		alignItems: "center",
		zIndex: -1,
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
