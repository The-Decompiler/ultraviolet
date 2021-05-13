import React, { useState, useContext } from "react";

import { GestureResponderEvent,
				 StyleSheet,
				 View
} from "react-native";

import { LongButtonStateContext, LongButtonDispatchContext } from "../contexts/LongButtonContext";
import { mouseMove, mouseScroll, mouseHandler } from "../utils";
import { Position, ScrollPosition, MouseButtons, MouseClicks } from "../utils";

enum Responder { START, MOVE, RELEASE }
enum Tap { One = MouseButtons.LEFT, Two = MouseButtons.RIGHT, Three = MouseButtons.MIDDLE }

const TAP_INTERVAL = 100;

export const Touchpad = () => {
	const [prevPosition, setPrevPosition] = useState<Position | null>(null);
	const [position, setPosition] = useState<Position | null>(null);
	const [prevScroll, setPrevScroll] = useState<ScrollPosition | null>(null);
	const [scroll, setScroll] = useState<ScrollPosition | null>(null);
	const [tap, setTap] = useState<Tap | null>(null);
	const [time, setTime] = useState(Date.now().valueOf());

	const { toggleMouseLeft, toggleMouseMiddle, toggleMouseRight } = useContext(LongButtonStateContext);
	const longButtonDispatch = useContext(LongButtonDispatchContext);

	const isNumFingers = (finger: number, event: GestureResponderEvent) => event.nativeEvent.touches.length == finger;

	const getCurrentPosition = (event: GestureResponderEvent)=> {
		if (isNumFingers(2, event))
			return ({ firstY: event.nativeEvent.touches[0].pageY,
								secondY: event.nativeEvent.touches[1].pageY } as ScrollPosition)
		else
			return ({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY } as Position)
	}

	const gestureHandler = (responder: Responder, event: GestureResponderEvent) => {
		if (responder == Responder.START) {
			if (isNumFingers(1, event)) setTap(Tap.One);
			if (isNumFingers(2, event)) setTap(Tap.Two);
			if (isNumFingers(3, event)) setTap(Tap.Three);
			setTime(Date.now().valueOf());
		}

		if (responder == Responder.MOVE) {
			// Set if not START and uses two fingers
			setPrevScroll(isNumFingers(2, event) ? scroll : null);
			// Set if uses two fingers
			setScroll(isNumFingers(2, event) ? getCurrentPosition(event) as ScrollPosition : null);
			// Set if not START and does not use two fingers
			setPrevPosition(isNumFingers(1, event) ? position : null);
			// Set if does not use two fingers
			setPosition(!isNumFingers(2, event) ? getCurrentPosition(event) as Position : null);
			// Scroll or move if set
			if (prevScroll && scroll) mouseScroll(prevScroll, scroll);
			else if (prevPosition && position) mouseMove(prevPosition, position);
		}
		// Reset if RELEASE
		if (responder == Responder.RELEASE) {
			setPrevScroll(null);
			setScroll(null);
			setPrevPosition(null);
			setPosition(null);

			if (Date.now().valueOf() - time < TAP_INTERVAL) {
				if (tap)
					switch ((tap as unknown) as MouseButtons) {
						case MouseButtons.LEFT:
							if (toggleMouseLeft) longButtonDispatch({ button: MouseButtons.LEFT })
							else mouseHandler(MouseClicks.CLICK, MouseButtons.LEFT);
							break;
						case MouseButtons.MIDDLE:
							if (toggleMouseMiddle) longButtonDispatch({ button: MouseButtons.MIDDLE })
							else mouseHandler(MouseClicks.CLICK, MouseButtons.MIDDLE);
							break;
						case MouseButtons.RIGHT:
							if (toggleMouseRight) longButtonDispatch({ button: MouseButtons.RIGHT })
							else mouseHandler(MouseClicks.CLICK, MouseButtons.RIGHT);
							break;
					}
			}
			setTap(null);
		}
	}

	return (
		<View
			onStartShouldSetResponder={e => {
				gestureHandler(Responder.START, e);
				return true;
			}}
			onResponderMove={e => gestureHandler(Responder.MOVE, e)}
			onResponderRelease={e => gestureHandler(Responder.RELEASE, e)}
			style={styles.fullscreen}
		/>
	)
}

const styles = StyleSheet.create({
	fullscreen: {
		width: "100%",
		height: "75%",
		zIndex: 0,
	},
});
