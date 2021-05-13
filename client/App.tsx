import React, { useState, useEffect } from "react";

import { OpenKeyboard } from "./components/OpenKeyboard";
import { MouseClick } from "./components/MouseClick";
import { Reconnect } from "./components/Reconnect";
import { Touchpad } from "./components/Touchpad";
import { ConnectModal } from "./components/ConnectModal";

import { LongButtonContextProvider } from "./contexts/LongButtonContext";

import {
	Dimensions,
	Image,
	SafeAreaView,
	StyleSheet
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { addressToString, connectSocket, convertIpAddress } from "./utils";
import { DEFAULT_ADDRESS } from "./utils";

export type Address = {
	port: number,
	host: string,
}

const App = () => {
	const [address, setAddress] = useState<Address>(DEFAULT_ADDRESS);
	const [showConnectModal, setShowConnectModal] = useState(false);
	const [connect, setConnect] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const value = await AsyncStorage.getItem("address");
				if (value !== null)
					setAddress(convertIpAddress(value));
			} catch (err) {
				console.log(err);
			}
		})()
		connectSocket(address)
	}, []);

	useEffect(() => {
		if (connect) {
			(async () => {
				try {
					await AsyncStorage.setItem("address", addressToString(address));
				} catch (err) {
					console.log(err);
				}
			})()
			connectSocket(address);
			setConnect(false);
		}
	}, [connect])

	return (
		<>
			<SafeAreaView style={styles.scrollView}>
				<Image
					source={require("./static/AppLogo.png")}
					style={styles.logo}
				/>
				{ showConnectModal &&
					<ConnectModal
						address={address}
						setAddress={setAddress}
						setConnect={setConnect}
						setShowConnectModal={setShowConnectModal}
					/>
				}
				<LongButtonContextProvider>
					<Touchpad />
					<MouseClick />
				</LongButtonContextProvider>
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
		backgroundColor: "#321B5A",
		width: "100%",
		height: "100%",
	},
	logo: {
		position: "absolute",
		top: "30%",
		left: ((100 - Math.round((104 / Dimensions.get("window").width) * 100)) / 2).toString() + "%",
	},
});

export default App;
