import React from "react";

import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View
} from "react-native";

type Props = {
	setConnect: React.Dispatch<React.SetStateAction<boolean>>,
	setShowConnectModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Reconnect = ({ setConnect, setShowConnectModal }: Props) => {
	const connectPrompt = () => setShowConnectModal(true);

	return (
		<View style={styles.footer}>
			<TouchableHighlight
				onPress={() => setConnect(true)}
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
		zIndex: 1,
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
