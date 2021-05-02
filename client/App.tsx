import React, { useState, useEffect } from "react";

import { OpenKeyboard } from "./components/OpenKeyboard";
import { Reconnect } from "./components/Reconnect";
import { Touchpad } from "./components/Touchpad";

import {
	SafeAreaView,
	StyleSheet
} from "react-native";

import TcpSocket from "react-native-tcp-socket";
import { DEFAULT_TEXT_VALUE } from "./utils";
import { connectSocket,
				 terminateConnection
} from "./utils";


const App = () => {
	const [client, setClient] = useState<TcpSocket.Socket>();
	const [keyPress, setKeyPress] = useState<string>(DEFAULT_TEXT_VALUE);

	useEffect(() => {
		setClient(connectSocket());
		return () => { terminateConnection(client) };
	}, []);

	return (
		<>
			<SafeAreaView style={styles.scrollView}>
				<Touchpad />
				<Reconnect setClient={setClient} />
				<OpenKeyboard keyPress={keyPress} setKeyPress={setKeyPress} />
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
