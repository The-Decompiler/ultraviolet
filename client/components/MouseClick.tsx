import React, { useState, useContext } from "react";
import { LongButtonStateContext, LongButtonDispatchContext } from "../contexts/LongButtonContext";
import { MouseButtons, MouseClicks } from "../utils";
import { mouseHandler } from "../utils";

import {
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from "react-native";

export const MouseClick = () => {
	const [clickedButton, setClickedButton] = useState<MouseButtons | null>(null);

	const { toggleMouseLeft, toggleMouseMiddle, toggleMouseRight } = useContext(LongButtonStateContext);
	const longButtonDispatch = useContext(LongButtonDispatchContext);

	const handleClick = (button: MouseButtons) => {
		setClickedButton(button);
		setTimeout(() => setClickedButton(null), 100);
		mouseHandler(MouseClicks.CLICK, button);
	}

	return (
		<View style={styles.footer}>
			<TouchableWithoutFeedback
				onPress={() => toggleMouseLeft
											 ? longButtonDispatch({ button: MouseButtons.LEFT })
											 : handleClick(MouseButtons.LEFT)}
				onLongPress={() => longButtonDispatch({ button: MouseButtons.LEFT })}
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
											 ? longButtonDispatch({ button: MouseButtons.MIDDLE })
											 : handleClick(MouseButtons.MIDDLE)}
					onLongPress={() => longButtonDispatch({ button: MouseButtons.MIDDLE })}
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
											 ? longButtonDispatch({ button: MouseButtons.RIGHT })
											 : handleClick(MouseButtons.RIGHT)}
				onLongPress={() => longButtonDispatch({ button: MouseButtons.RIGHT })}
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
		right: "49.5%",
		zIndex: -1,
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
		zIndex: -1,
	},
});
