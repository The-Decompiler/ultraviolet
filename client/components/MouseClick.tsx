import React  from "react";
import { MouseButtons, MouseClicks } from "../utils";
import { mouseHandler } from "../utils";

import {
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";

type Props = {
	toggleLongButtonHandler: (button: MouseButtons, turn?: boolean | null) => void,
	toggleMouseLeft: boolean,
	toggleMouseMiddle: boolean,
	toggleMouseRight: boolean,
}

export const MouseClick = ({ toggleLongButtonHandler, toggleMouseLeft, toggleMouseMiddle, toggleMouseRight }: Props) => {
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
