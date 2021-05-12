import React, { useState, useEffect } from "react";

import {
	BackHandler,
	Image,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
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
	const [clickedButton, setClickedButton] = useState(false);

	useEffect(() => setTempAddress((address == DEFAULT_ADDRESS) ? "" : addressToString(address)), []);
	const disableModal = () => {
		setShowConnectModal(false);
		return true;
	}

	useEffect(() => {
		if (Platform.OS == "android") {
			BackHandler.addEventListener("hardwareBackPress", disableModal);
			return () => {
				BackHandler.removeEventListener("hardwareBackPress", disableModal);
			};
		}
	}, []);

	const connect = () => {
		setClickedButton(true);
		setTimeout(() => setClickedButton(false), 150);
		setAddress(convertIpAddress(tempAddress));
		setConnect(true);
		setShowConnectModal(false);
	}

	return (
		<View style={{ zIndex: 1000 }}>
			<View style={styles.fillScreen} />
			<View style={styles.modal}>
				<View style={styles.center}>
					<Text style={styles.title}>Enter IP Address</Text>
					<TextInput
						onChangeText={setTempAddress}
						placeholder={addressToString(DEFAULT_ADDRESS)}
						defaultValue={(address == DEFAULT_ADDRESS) ? "" : addressToString(address)}
						style={styles.input}
					/>
				</View>
				<View style={styles.center}>
					<TouchableWithoutFeedback onPress={connect}>
						<Image
							source={clickedButton
								? require("../static/ConnectModalButtonPressed.png")
								: require("../static/ConnectModalButton.png")
							}
							style={clickedButton ? styles.clickedButton : styles.button}
						/>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	fillScreen: {
		top: "-25%",
		left: "-25%",
		width: "150%",
		height: "150%",
		backgroundColor: "black",
		opacity: 0.8,
	},
	center: {
		height: "100%",
		alignItems: "center",
	},
	modal: {
		position: "absolute",
		top: 175,
		left: "12.5%",
		height: 200,
		width: "75%",
		backgroundColor: "white",
		borderRadius: 25,
	},
	title: {
		padding: 25,
		color: "#7C53C8",
		fontSize: 20,
		fontWeight: "600",
	},
	input: {
		backgroundColor: "#F2EFF9",
		margin: 10,
		padding: 10,
		paddingHorizontal: 15,
		width: "85%",
		height: 40,
		borderColor: "#C8B7E7",
		borderRadius: 30,
		borderWidth: 2,
		color: "#7C53C8",
	},
	button: {
		width: 110,
		height: 35,
		bottom: 55,
	},
	clickedButton: {
		width: 100,
		height: 25,
		bottom: 50,
	},
});
