import React, { useState, useEffect } from "react";
import TcpSocket from "react-native-tcp-socket";

import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from "react-native";

const App = () => {
	const [client, setClient] = useState<TcpSocket.Socket>();

	useEffect(() => {
		connectSocket();
		return () => {
			if (client)
				client.destroy();
		};
	}, []);

	const connectSocket = () => {
		setClient(TcpSocket.createConnection({
			port: 27001,
			host: "localhost",
		}, () => {}));
	}

	const handlePress = () => {
		if (client)
			client.write("Pressed!");
		console.log("Pressed!");
	}

	return (
		<>
			<SafeAreaView style={styles.scrollView}>
				<View style={styles.center}>
					<TouchableHighlight onPress={handlePress} underlayColor="#7A4988" style={styles.button}>
						<Text style={styles.buttonText}>Tap me!</Text>
					</TouchableHighlight>
					<View style={styles.footer}>
						<TouchableHighlight onPress={connectSocket} underlayColor="#7A4988" style={styles.refresh}>
							<Text style={styles.refreshText}>Reconnect</Text>
						</TouchableHighlight>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: "#333333",
		width: "100%",
		height: "100%",
	},
	center: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
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
