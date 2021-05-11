import React, { useState, useEffect } from "react";

import { GestureResponderEvent,
				 StyleSheet,
				 View
} from "react-native";

import { State,
				 TapGestureHandler,
				 TapGestureHandlerStateChangeEvent
} from "react-native-gesture-handler";

import { mouseMove, mouseScroll, mouseHandler } from "../utils";
import { Position, ScrollPosition, MouseButtons, MouseClicks } from "../utils";

enum Responder { START, MOVE, RELEASE }
enum Tap { One = MouseButtons.LEFT, Two = MouseButtons.RIGHT, Three = MouseButtons.MIDDLE }

const TAP_INTERVAL = 250;

type Props = {
	toggleLongButtonHandler: (button: MouseButtons, turn?: boolean | null) => void,
	toggleMouseLeft: boolean,
	toggleMouseMiddle: boolean,
	toggleMouseRight: boolean,
}

export const Touchpad = ({ toggleLongButtonHandler, toggleMouseLeft, toggleMouseMiddle, toggleMouseRight }: Props) => {
	const [prevPosition, setPrevPosition] = useState<Position | null>(null);
	const [position, setPosition] = useState<Position | null>(null);
	const [prevScroll, setPrevScroll] = useState<ScrollPosition | null>(null);
	const [scroll, setScroll] = useState<ScrollPosition | null>(null);
	const [tap, setTap] = useState<Tap | null>(null);
	const [time, setTime] = useState<number>();

	const isNumFingers = (finger: number, event: GestureResponderEvent) => event.nativeEvent.touches.length == finger;

	const getCurrentPosition = (event: GestureResponderEvent)=> {
		if (isNumFingers(2, event))
			return ({ firstY: event.nativeEvent.touches[0].pageY,
								secondY: event.nativeEvent.touches[1].pageY } as ScrollPosition)
		else
			return ({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY } as Position)
	}

	const gestureHandler = (responder: Responder, event: GestureResponderEvent) => {
		if (responder == Responder.START)
			if (isNumFingers(1, event)) setTime(Date.now().valueOf());

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

			if (time && (Date.now().valueOf() - time < TAP_INTERVAL)) {
				setTap(Tap.One);
				setTime(0);
			}
		}
	}

	const onTap = (finger: number, event: TapGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.state === State.ACTIVE)
			setTap((finger == 1) ? Tap.One : Tap.Two);
	}

	useEffect(() => {
		if (tap) {
			switch ((tap as unknown) as MouseButtons) {
				case MouseButtons.LEFT:
					if (toggleMouseLeft) toggleLongButtonHandler(MouseButtons.LEFT)
					else mouseHandler(MouseClicks.CLICK, MouseButtons.LEFT);
					break;
				case MouseButtons.MIDDLE:
					if (toggleMouseMiddle) toggleLongButtonHandler(MouseButtons.MIDDLE)
					else mouseHandler(MouseClicks.CLICK, MouseButtons.MIDDLE);
					break;
				case MouseButtons.RIGHT:
					if (toggleMouseRight) toggleLongButtonHandler(MouseButtons.RIGHT)
					else mouseHandler(MouseClicks.CLICK, MouseButtons.RIGHT);
					break;
			}
			setTap(null);
		}
	}, [tap]);

	return (
		<TapGestureHandler
			onHandlerStateChange={e => onTap(2, e)}
			minPointers={2}
		>
			<View
				onStartShouldSetResponder={e => {
					gestureHandler(Responder.START, e);
					return true;
				}}
				onResponderMove={e => gestureHandler(Responder.MOVE, e)}
				onResponderRelease={e => gestureHandler(Responder.RELEASE, e)}
				style={styles.fullscreen}
			/>
		</TapGestureHandler>
	)
}

const styles = StyleSheet.create({
	fullscreen: {
		width: "100%",
		height: "75%",
		zIndex: 0,
	},
});
