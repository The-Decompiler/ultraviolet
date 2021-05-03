import React from "react";

import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View
} from "react-native";

import TcpSocket from "react-native-tcp-socket";
import { connectSocket } from "../utils";

type Props = {
	setClient: React.Dispatch<React.SetStateAction<TcpSocket.Socket | undefined>>,
	setShowConnectModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Reconnect = ({ setClient, setShowConnectModal }: Props) => {
	const connectPrompt = () => setShowConnectModal(true);

	return (
		<View style={styles.footer}>
			<TouchableHighlight
				onPress={() => setClient(connectSocket())}
				onLongPress={connectPrompt}
				underlayColor="#7A4988"
				style={styles.refresh}
			>
				<Text style={styles.refreshText}>Reconnect</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		position: "absolute",
		bottom: 25,
		width: "100%",
		alignItems: "center",
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
});
