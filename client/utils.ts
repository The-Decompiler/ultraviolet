import TcpSocket from "react-native-tcp-socket";
import { Address } from "./App";

export const DEFAULT_TEXT_VALUE = " ";

export const connectSocket = ({ port, host }: Address) => TcpSocket.createConnection({
	port, host
}, () => {});

export const terminateConnection = (client: TcpSocket.Socket | undefined) =>  {
	if (client)
		client.destroy();
}

export const sendMessage = (client: TcpSocket.Socket | undefined, msg: string) => {
	if (client)
		client.write(msg);
}

export const convertIpAddress = (address: string): Address => {
	let [host, portString] = address.split(":", 2);
	let port = parseInt(portString);
	return { port, host };
}
