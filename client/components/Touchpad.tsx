import React, { useState } from "react";

import { GestureResponderEvent,
				 StyleSheet,
				 View
} from "react-native";

import { mouseMove, mouseScroll } from "../utils";
import { Position, ScrollPosition } from "../utils";

const MOVE_INTERVAL = 500;

enum Responder { START, MOVE, RELEASE }

export const Touchpad = () => {
	const [time, setTime] = useState(Date.now().valueOf());
	const [prevPosition, setPrevPosition] = useState<Position | null>(null);
	const [position, setPosition] = useState<Position | null>(null);
	const [prevScroll, setPrevScroll] = useState<ScrollPosition | null>(null);
	const [scroll, setScroll] = useState<ScrollPosition | null>(null);

	const isTwoFingers = (event: GestureResponderEvent) => event.nativeEvent.touches.length == 2;

	const getCurrentPosition = (event: GestureResponderEvent)=> {
		if (isTwoFingers(event))
			return ({ firstY: event.nativeEvent.touches[0].pageY,
								secondY: event.nativeEvent.touches[1].pageY } as ScrollPosition)
		else
			return ({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY } as Position)
	}

	const gestureHandler = (responder: Responder, event: GestureResponderEvent) => {
		// Set if not START and uses two fingers
		setPrevScroll((!(responder == Responder.START) && isTwoFingers(event)) ? scroll : null);
		// Set if uses two fingers
		setScroll(isTwoFingers(event) ? getCurrentPosition(event) as ScrollPosition : null);
		// Set if not START and does not use two fingers
		setPrevPosition((!(responder == Responder.START) && !isTwoFingers(event)) ? position : null);
		// Set if does not use two fingers
		setPosition(!isTwoFingers(event) ? getCurrentPosition(event) as Position : null);
		// Scroll or move if set
		if (prevScroll && scroll) mouseScroll(prevScroll, scroll);
		if (prevPosition && position) mouseMove(prevPosition, position);
		// Reset if RELEASE
		if (responder == Responder.RELEASE) {
			setPrevScroll(null);
			setScroll(null);
			setPrevPosition(null);
			setPosition(null);
		}
	}

	const onResponderMove = (event: GestureResponderEvent) => {
		if (Date.now().valueOf() - time > MOVE_INTERVAL) {
			gestureHandler(Responder.MOVE, event);
			setTime(Date.now().valueOf());
		}
	}

	return (
		<View
			onStartShouldSetResponder={e => {
				gestureHandler(Responder.START, e);
				return true;
			}}
			onResponderMove={onResponderMove}
			onResponderRelease={e => gestureHandler(Responder.RELEASE, e)}
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
