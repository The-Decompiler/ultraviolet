import TcpSocket from "react-native-tcp-socket";
import { Address } from "./App";

export const DEFAULT_TEXT_VALUE = " ";

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

// Clicks and Holds and Releases
// mc<r|m|l>       -- Click
// mp<r|m|l>       -- Press
// mr<r|m|l>       -- Release
export const mouseHandler =  (click: MouseClicks, button: MouseButtons) => {
	console.log("m" + click + button);
}
