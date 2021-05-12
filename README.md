# ultraviolet
<img src="https://raw.githubusercontent.com/maxminoS/ultraviolet/feature/readme/client/static/AppIcon.png" width="128">

*A mobile app to remotely control your computer.*

## Installation

*This app is not published in Google Play Store or the Apple App Store.*

Use the following [instructions](https://reactnative.dev/docs/running-on-device) to run the app on a device. As a summary, install the required dependencies by going to the `client/` and do `yarn`. If running on iOS, go to `ios/` and install the pods by `pod install`. If building for Android, go to `android/`, sign a certificate and enter the password, then run `./gradlew assembleRelease` to generate the APK.

Run the Go server in the device you want to be controlled by going to `server/` and running `go run main.go`.

## Usage

The frontend can send signals by its controls for touchpad, mouse buttons, and keyboard. First, hold the Connect button on the bottom left corner and enter the appropriate IP address for the socket. You can tap the top three quarters of the screen to test the Touchpad functionality to test that it sends the signals to the Go server. Use the bottom right button to pull up your keyboard and you can type to the computer. Finally, you can use the mouse in the bottom to simulate left clicks, right clicks, and middle clicks. You can also use touchpad gestures by tapping to left click, two-finger tapping to right click, and three-finger tapping to middle-click (the two-finger and three-finger tap gestures may not work if you are on Android).

## Project

This project uses **React Native** for the frontend mobile app and **Go** for its server to be hosted on the desktop. The Go server receives the movements via a TCP socket within your local network and uses the library **robotgo** to control your computer. The Wayland display server is not supported by robotgo and so is not supported by this application.

## Screenshots
![screen](/client/static/Screen-demo.png)
![keyboard](/client/static/Keyboard-demo.png)
![connect](/client/static/Connect-demo.png)
