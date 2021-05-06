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

import { connectSocket } from "./utils";

export type Address = {
	port: number,
	host: string,
}

const App = () => {
	const [address, setAddress] = useState<Address>({ port: 27001, host: "localhost" });
	const [showConnectModal, setShowConnectModal] = useState(false);
	const [connect, setConnect] = useState(false);

	useEffect(() => connectSocket(address), []);

	useEffect(() => {
		if (connect) {
			connectSocket(address);
			setConnect(false);
		}
	}, [connect])

	return (
		<>
			<SafeAreaView style={styles.scrollView}>
				{ showConnectModal &&
					<ConnectModal
						setAddress={setAddress}
						setConnect={setConnect}
						setShowConnectModal={setShowConnectModal}
					/>
				}
				<Touchpad />
				<MouseClick />
				<Reconnect
					setConnect={setConnect}
					setShowConnectModal={setShowConnectModal}
				/>
				<OpenKeyboard />
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
