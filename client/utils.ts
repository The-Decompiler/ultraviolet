import TcpSocket from "react-native-tcp-socket";
import { Address } from "./App";

export const DEFAULT_TEXT_VALUE = " ";
const DEFAULT_STRING_LIMIT = 20;

export enum MouseClicks {
	CLICK = "c",
	PRESS= "p",
	RELEASE = "r"
}

export enum MouseButtons {
	LEFT = "l",
	MIDDLE = "m",
	RIGHT = "r"
}

export type Position = {
	x: number,
	y: number,
}

export type ScrollPosition = {
	firstY: number,
	secondY: number,
}

enum FunctionKey {
	BACKSPACE = "backspace",
	ENTER = "enter",
}

enum FunctionKeyNotation {
	BACKSPACE = "",
	ENTER = " \n",
}

export const connectSocket = ({ port, host }: Address) =>
	TcpSocket.createConnection({ port, host }, () => {});

export const terminateConnection = (client: TcpSocket.Socket | undefined) =>  {
	if (client)
		client.destroy();
}

export const sendMessage = (client: TcpSocket.Socket | undefined, msg: string) => {
	if (client)
		client.write(msg);
}

export const convertIpAddress = (address: string): Address => {
	try {
		let [host, portString] = address.split(":", 2);
		let port = parseInt(portString);
		return { port, host };
	} catch (err) {
		console.log("Incorrect address:", err);
		return { port: 27001, host: "localhost" }
	}
}

// Touchpad Tap, Move, Release
// mm<x> <y>       -- Move
export const mouseMove = (previous: Position, current: Position) => {
	let moveX = current.x - previous.x;
	let moveY = current.y - previous.y;
	console.log("mm" + moveX, moveY);
}

// ms<[-]distance> -- Scroll
export const mouseScroll = (previous: ScrollPosition, current: ScrollPosition) => {
	let scrollFirst = current.firstY - previous.firstY;
	let scrollSecond = current.secondY - previous.secondY;
	let distance = (scrollFirst + scrollSecond) / 2;
	console.log("ms" + distance);
}

// Keyboard
// kk<key...>      -- Key <enter, backspace>  [OpenKeyboard]
// kt<text>        -- Type                    [OpenKeyboard]
export const keyboardHandler = (keyPress: string) => {
	// Function keys
	if (keyPress == FunctionKeyNotation.BACKSPACE) {
		console.log("kk" + FunctionKey.BACKSPACE);
		return;
	}
	if (keyPress == FunctionKeyNotation.ENTER) {
		console.log("kk" + FunctionKey.ENTER);
		return;
	}

	keyPress = keyPress.substring(1, keyPress.length);
	// Long string
	let stringArray;
	if (keyPress.length > DEFAULT_STRING_LIMIT) {
		stringArray = limitString([], keyPress, DEFAULT_STRING_LIMIT);
		for (let string in stringArray)
			console.log("kt" + stringArray[string]);
		return;
	}
	// Key presses
	console.log("kt" + keyPress);
	return;
}

const limitString = (limitedStrings: string[], string: string, limit: number) => {
	limitedStrings.push(string.substring(0, limit));
	if (string.length > limit) limitString(limitedStrings, string.substring(limit, string.length), limit);
	return limitedStrings;
}

// Clicks and Holds and Releases
// mc<r|m|l>       -- Click
// mp<r|m|l>       -- Press
// mr<r|m|l>       -- Release
export const mouseHandler =  (click: MouseClicks, button: MouseButtons) => {
	console.log("m" + click + button);
}
