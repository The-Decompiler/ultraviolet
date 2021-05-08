import React, { useState, useEffect } from "react";

import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

import { Address } from "../App";
import { convertIpAddress, addressToString } from "../utils";
import { DEFAULT_ADDRESS } from "../utils";

type Props = {
	address: Address,
	setAddress: React.Dispatch<React.SetStateAction<Address>>,
	setConnect: React.Dispatch<React.SetStateAction<boolean>>,
	setShowConnectModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const ConnectModal = ({ address, setAddress, setConnect, setShowConnectModal }: Props) => {
	const [tempAddress, setTempAddress] = useState("");

	useEffect(() => setTempAddress((address == DEFAULT_ADDRESS) ? "" : addressToString(address)), []);

	const connect = () => {
		setAddress(convertIpAddress(tempAddress));
		setConnect(true);
		setShowConnectModal(false);
	}

	return (
		<View style={styles.fillScreen}>
			<View style={styles.modal}>
				<View style={styles.center}>
					<Text style={styles.title}>Enter IP Address</Text>
					<TextInput
						onChangeText={setTempAddress}
						style={styles.input}
						placeholder={addressToString(DEFAULT_ADDRESS)}
						defaultValue={(address == DEFAULT_ADDRESS) ? "" : addressToString(address)}
					/>
				</View>
				<View style={styles.center}>
					<TouchableOpacity onPress={connect} style={styles.button}>
						<Text style={styles.buttonText}>CONNECT</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	fillScreen: {
		width: "100%",
		height: "150%",
		backgroundColor: "black",
		opacity: 0.8,
		zIndex: 1000,
	},
	center: {
		height: "100%",
		alignItems: "center",
	},
	modal: {
		backgroundColor: "white",
		height: 200,
		width: "75%",
		top: 175,
		left: "12.5%",
		borderRadius: 25,
	},
	title: {
		padding: 25,
		fontSize: 20,
		fontWeight: "600",
	},
	input: {
		margin: 10,
		padding: 10,
		width: "85%",
		height: 40,
		borderRadius: 10,
		borderColor: "gray",
		borderWidth: 0.3,
	},
	button: {
		width: "80%",
		bottom: 40,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "right",
		color: "#710193",
	},
});
