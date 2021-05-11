import React, { useState } from "react";

import {
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	View
} from "react-native";

type Props = {
	setConnect: React.Dispatch<React.SetStateAction<boolean>>,
	setShowConnectModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Reconnect = ({ setConnect, setShowConnectModal }: Props) => {
	const [clickedButton, setClickedButton] = useState(false);
	const connectPrompt = () => setShowConnectModal(true);

	return (
		<View style={styles.footer}>
			<TouchableWithoutFeedback
				onPress={() => {
					setConnect(true);
					setClickedButton(true);
					setTimeout(() => setClickedButton(false), 150);
				}}
				onLongPress={connectPrompt}
			>
				<Image
					source={clickedButton
						? require("../static/ConnectButtonPressed.png")
						: require("../static/ConnectButton.png")
					}
				/>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		position: "absolute",
		left: 25,
		bottom: 25,
		width: 71,
		height: 71,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
	},
});
