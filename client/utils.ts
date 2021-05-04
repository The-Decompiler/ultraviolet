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

// Clicks and Holds and Releases
// mc<r|m|l>       -- Click
// mp<r|m|l>       -- Press
// mr<r|m|l>       -- Release
export const mouseHandler =  (click: MouseClicks, button: MouseButtons) => {
	console.log("m" + click + button);
}
