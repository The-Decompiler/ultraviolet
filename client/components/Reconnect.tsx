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
}

export const Reconnect = ({ setClient }: Props) => {
	return (
		<View style={styles.footer}>
			<TouchableHighlight
				onPress={() => setClient(connectSocket())}
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
