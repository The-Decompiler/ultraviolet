import React, { useReducer } from "react";

import { mouseHandler } from "../utils";
import { MouseButtons, MouseClicks } from "../utils";

type LongButtonActions = {
	button: MouseButtons,
	turn?: boolean,
}

const initialLongButtonState = {
	toggleMouseLeft: false,
	toggleMouseMiddle: false,
	toggleMouseRight: false,
};

export const LongButtonStateContext = React.createContext<typeof initialLongButtonState>(initialLongButtonState);
export const LongButtonDispatchContext = React.createContext<React.Dispatch<LongButtonActions>>(() => null);

export const LongButtonContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [longButtonStates, longButtonDispatch] = useReducer(LongButtonReducer, initialLongButtonState);

	return (
		<LongButtonStateContext.Provider value={longButtonStates}>
			<LongButtonDispatchContext.Provider value={longButtonDispatch}>
				{ children }
			</LongButtonDispatchContext.Provider>
		</LongButtonStateContext.Provider>
	);
}

const LongButtonReducer = (states: typeof initialLongButtonState,
														action: LongButtonActions) => {
	const { button, turn } = action;
	const { toggleMouseLeft, toggleMouseMiddle, toggleMouseRight } = states;
	switch (button) {
		case MouseButtons.LEFT:
			toggleMouseLeft
				? mouseHandler(MouseClicks.RELEASE, MouseButtons.LEFT)
				: mouseHandler(MouseClicks.PRESS, MouseButtons.LEFT);
			return {
				...states,
				toggleMouseLeft: (turn != undefined) ? turn : toggleMouseLeft ? false : true,
			};
		case MouseButtons.MIDDLE:
			toggleMouseMiddle
				? mouseHandler(MouseClicks.RELEASE, MouseButtons.MIDDLE)
				: mouseHandler(MouseClicks.PRESS, MouseButtons.MIDDLE);
			return {
				...states,
				toggleMouseMiddle: (turn != undefined) ? turn : toggleMouseMiddle ? false : true,
			};
		case MouseButtons.RIGHT:
			toggleMouseRight
				? mouseHandler(MouseClicks.RELEASE, MouseButtons.RIGHT)
				: mouseHandler(MouseClicks.PRESS, MouseButtons.RIGHT);
			return {
				...states,
				toggleMouseRight: (turn != undefined) ? turn : toggleMouseRight ? false : true,
			};
		default:
			return states;
	}
}
