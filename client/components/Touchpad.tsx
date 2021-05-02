import React, { useState, useEffect } from "react";

import { GestureResponderEvent,
				 StyleSheet,
				 View
} from "react-native";

const MOVE_INTERVAL = 500;

export const Touchpad = () => {
	const [time, setTime] = useState(Date.now().valueOf());
	const [scrolling, setScrolling] = useState(false);

	const gestureHandler = (gesture: string, e: GestureResponderEvent) => {
		if (e.nativeEvent.touches.length == 2) {
			console.log(gesture, "(" + e.nativeEvent.touches[0].pageX + ", " + e.nativeEvent.touches[0].pageY + ")",
													 "(" + e.nativeEvent.touches[1].pageX + ", " + e.nativeEvent.touches[1].pageY + ")");
		} else {
			console.log(gesture, "(" + e.nativeEvent.pageX + ", " + e.nativeEvent.pageY + ")");
		}
	}

	const onStartShouldSetResponder = (e: GestureResponderEvent) => {
		if (e.nativeEvent.touches.length == 2) {
			setScrolling(true);
		} else {
			gestureHandler("Tap", e);
			setScrolling(false);
		}
		return true;
	}

	const onResponderMove = (e: GestureResponderEvent) => {
		if (Date.now().valueOf() - time > MOVE_INTERVAL) {
			gestureHandler(!scrolling ? "Move" : "Scroll", e);
			setTime(Date.now().valueOf());
		}
	}

	const onResponderRelease = (e: GestureResponderEvent) => {
		gestureHandler("Release", e);
	}

	return (
		<View
			onStartShouldSetResponder={onStartShouldSetResponder}
			onResponderMove={onResponderMove}
			onResponderRelease={onResponderRelease}
			style={styles.fullscreen}
		/>
	)
}

const styles = StyleSheet.create({
	fullscreen: {
		width: "100%",
		height: "100%",
	},
});
