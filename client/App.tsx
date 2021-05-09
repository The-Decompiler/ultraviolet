import React, { useState, useEffect } from "react";

import { OpenKeyboard } from "./components/OpenKeyboard";
import { MouseClick } from "./components/MouseClick";
import { Reconnect } from "./components/Reconnect";
import { Touchpad } from "./components/Touchpad";
import { ConnectModal } from "./components/ConnectModal";

import {
	AsyncStorage,
	SafeAreaView,
	StyleSheet
} from "react-native";

import { addressToString, connectSocket, convertIpAddress, mouseHandler } from "./utils";
import { MouseButtons, MouseClicks } from "./utils";
import { DEFAULT_ADDRESS } from "./utils";

export type Address = {
	port: number,
	host: string,
}

const App = () => {
	const [address, setAddress] = useState<Address>(DEFAULT_ADDRESS);
	const [showConnectModal, setShowConnectModal] = useState(false);
	const [connect, setConnect] = useState(false);

	const [toggleMouseLeft, setToggleMouseLeft] = useState(false);
	const [toggleMouseMiddle, setToggleMouseMiddle] = useState(false);
	const [toggleMouseRight, setToggleMouseRight] = useState(false);

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

	const toggleLongButtonHandler = (button: MouseButtons, turn: boolean | null = null) => {
		switch (button) {
			case MouseButtons.LEFT:
				setToggleMouseLeft((turn != null) ? turn : toggleMouseLeft ? false : true);
				toggleMouseLeft
					? mouseHandler(MouseClicks.RELEASE, MouseButtons.LEFT)
					: mouseHandler(MouseClicks.PRESS, MouseButtons.LEFT);
				break;
			case MouseButtons.MIDDLE:
				setToggleMouseMiddle((turn != null) ? turn : toggleMouseMiddle ? false : true);
				toggleMouseMiddle
					? mouseHandler(MouseClicks.RELEASE, MouseButtons.MIDDLE)
					: mouseHandler(MouseClicks.PRESS, MouseButtons.MIDDLE);
				break;
			case MouseButtons.RIGHT:
				setToggleMouseRight((turn != null) ? turn : toggleMouseRight ? false : true);
				toggleMouseRight
					? mouseHandler(MouseClicks.RELEASE, MouseButtons.RIGHT)
					: mouseHandler(MouseClicks.PRESS, MouseButtons.RIGHT);
				break;
		}
	}

	return (
		<>
			<SafeAreaView style={styles.scrollView}>
				{ showConnectModal &&
					<ConnectModal
						address={address}
						setAddress={setAddress}
						setConnect={setConnect}
						setShowConnectModal={setShowConnectModal}
					/>
				}
				<Touchpad
					toggleLongButtonHandler={toggleLongButtonHandler}
					toggleMouseLeft={toggleMouseLeft}
					toggleMouseMiddle={toggleMouseMiddle}
					toggleMouseRight={toggleMouseRight}
				/>
				<MouseClick
					toggleLongButtonHandler={toggleLongButtonHandler}
					toggleMouseLeft={toggleMouseLeft}
					toggleMouseMiddle={toggleMouseMiddle}
					toggleMouseRight={toggleMouseRight}
				/>
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
});

export default App;
