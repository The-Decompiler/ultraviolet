import React, { useState, useEffect } from "react";

import { OpenKeyboard } from "./components/OpenKeyboard";
import { MouseClick } from "./components/MouseClick";
import { Reconnect } from "./components/Reconnect";
import { Touchpad } from "./components/Touchpad";
import { ConnectModal } from "./components/ConnectModal";

import {
	SafeAreaView,
	StyleSheet
} from "react-native";

import TcpSocket from "react-native-tcp-socket";
import { DEFAULT_TEXT_VALUE } from "./utils";
import { connectSocket,
				 terminateConnection
} from "./utils";

export type Address = {
	port: number,
	host: string,
}

const App = () => {
	const [client, setClient] = useState<TcpSocket.Socket>();
	const [keyPress, setKeyPress] = useState<string>(DEFAULT_TEXT_VALUE);
	const [address, setAddress] = useState<Address>({ port: 27001, host: "localhost" });
	const [showConnectModal, setShowConnectModal] = useState(false);
	const [reconnect, setReconnect] = useState(false);

	useEffect(() => {
		setClient(connectSocket(address));
		return () => { terminateConnection(client) };
	}, []);

	useEffect(() => {
		setClient(connectSocket(address));
		setReconnect(false);
		return () => { terminateConnection(client) };
	}, [address, reconnect])

	return (
		<>
			<SafeAreaView style={styles.scrollView}>
				{ showConnectModal &&
					<ConnectModal
						setAddress={setAddress}
						setShowConnectModal={setShowConnectModal}
					/>
				}
				<Touchpad />
				<MouseClick />
				<Reconnect
					setReconnect={setReconnect}
					setShowConnectModal={setShowConnectModal}
				/>
				<OpenKeyboard
					keyPress={keyPress}
					setKeyPress={setKeyPress}
				/>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: "#333333",
		width: "100%",
		height: "100%",
	},
	center: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	footer: {
		position: "absolute",
		bottom: 0,
	},
	refresh: {
		width: 105,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#710193",
		height: 40,
		borderRadius: 20,
	},
	refreshText: {
		fontSize: 15,
		color: "white",
	},
	button: {
		margin: 30,
		width: 260,
		alignItems: "center",
		backgroundColor: "#710193",
	},
	buttonText: {
		fontSize: 20,
		fontWeight: "700",
		padding: 20,
		color: "white",
	},
});

export default App;
