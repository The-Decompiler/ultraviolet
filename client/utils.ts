import TcpSocket from "react-native-tcp-socket";

export const DEFAULT_TEXT_VALUE = " ";

export const connectSocket = () => TcpSocket.createConnection({
	port: 27001,
	host: "localhost",
}, () => {});

export const terminateConnection = (client: TcpSocket.Socket | undefined) =>  {
	if (client)
		client.destroy();
}

export const sendMessage = (client: TcpSocket.Socket | undefined, msg: string) => {
	if (client)
		client.write(msg);
}
