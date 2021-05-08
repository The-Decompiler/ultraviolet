import TcpSocket from "react-native-tcp-socket";
import { Address } from "./App";

export let client: TcpSocket.Socket;
export const DEFAULT_TEXT_VALUE = " ";
export const DEFAULT_ADDRESS: Address = { port: 27001, host: "localhost" };
const DEFAULT_STRING_LIMIT = 30;
const DEFAULT_DECIMAL_PLACE = 0;

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
	ENTER = "\n",
}

export const connectSocket = ({ port, host }: Address) => {
	terminateConnection();
	client = TcpSocket.createConnection({ port, host }, () => {});
}

export const terminateConnection = () =>  {
	try {
		if (client)
			client.destroy();
	} catch (err) {
		console.log("Error terminating connection:", err);
	}
}

export const sendMessage = (msg: string) => {
	try {
		if (client)
			client.write(msg);
	} catch (err) {
		console.log("Error sending message", err);
	}
}

export const convertIpAddress = (address: string): Address => {
	try {
		let [host, portString] = address.split(":", 2);
		let port;
		if (!isNaN(parseInt(portString))) {
			port = parseInt(portString)
		} else throw "Port is invalid";
		return ({ port, host } as Address);
	} catch (err) {
		console.log("Incorrect address:", err);
		return DEFAULT_ADDRESS;
	}
}

export const addressToString = (address: Address): string => {
	return address.host + ":" + address.port;
}

const roundNumber = (num: number, places: number = DEFAULT_DECIMAL_PLACE) => {
	let x = Math.pow(10, places);
	return Math.round(num * x) / x;
}
// Touchpad Tap, Move, Release
// m<x> <y>       -- Move
export const mouseMove = (previous: Position, current: Position) => {
	let moveX = roundNumber(current.x - previous.x);
	let moveY = roundNumber(current.y - previous.y);
	if ((moveX != 0) && (moveY != 0))
		sendMessage("m" + moveX + " " + moveY);
}

// s<[-]distance> -- Scroll
export const mouseScroll = (previous: ScrollPosition, current: ScrollPosition) => {
	let scrollFirst = current.firstY - previous.firstY;
	let scrollSecond = current.secondY - previous.secondY;
	let distance = roundNumber((scrollFirst + scrollSecond) / 2);
	if (distance != 0)
		sendMessage("s" + distance);
}

// Keyboard
// k<key...>      -- Key <enter, backspace>  [OpenKeyboard]
// t<text>        -- Type                    [OpenKeyboard]
export const keyboardHandler = (keyPress: string) => {
	// Function keys
	if (keyPress == FunctionKeyNotation.BACKSPACE) {
		sendMessage("k" + FunctionKey.BACKSPACE);
		return;
	}
	keyPress = keyPress.substring(1, keyPress.length);
	if (keyPress == FunctionKeyNotation.ENTER) {
		sendMessage("k" + FunctionKey.ENTER);
		return;
	}

	// Long string
	let stringArray;
	if (keyPress.length > DEFAULT_STRING_LIMIT) {
		stringArray = limitString([], keyPress, DEFAULT_STRING_LIMIT);
		for (let string in stringArray)
			sendMessage("t" + stringArray[string]);
		return;
	}
	// Key presses
	sendMessage("t" + keyPress);
	return;
}

const limitString = (limitedStrings: string[], string: string, limit: number) => {
	limitedStrings.push(string.substring(0, limit));
	if (string.length > limit) limitString(limitedStrings, string.substring(limit, string.length), limit);
	return limitedStrings;
}

// Clicks and Holds and Releases
// c<r|m|l>       -- Click
// p<r|m|l>       -- Press
// r<r|m|l>       -- Release
export const mouseHandler =  (click: MouseClicks, button: MouseButtons) => {
	sendMessage(click + button);
}
