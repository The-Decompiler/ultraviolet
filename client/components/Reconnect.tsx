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
				<Text style={styles.refreshText}>C</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		position: "absolute",
		left: 25,
		bottom: 25,
		zIndex: 1,
	},
	refresh: {
		width: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#710193",
		height: 50,
		borderRadius: 15,
	},
	refreshText: {
		fontSize: 15,
		color: "white",
	},
});
