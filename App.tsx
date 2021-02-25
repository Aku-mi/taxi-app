import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [text, setText] = useState<string>("waiting...");

  const updateLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });
    setLocation(location);
    if (location) {
      setText(
        `Lat: ${location.coords.latitude}\nLng: ${location.coords.longitude}\nTimeStamp: ${location.timestamp}`
      );
    } else {
      setText(errorMsg);
    }
  };

  const sendLocation = async () => {
    try {
      await fetch("http://akumi.me:13550", {
        method: "post",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: location?.coords.latitude,
          lng: location?.coords.longitude,
          tmp: location?.timestamp,
        }),
      });

      await fetch("http://161.10.129.45:13550", {
        method: "post",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: location?.coords.latitude,
          lng: location?.coords.longitude,
          tmp: location?.timestamp,
        }),
      });
    } catch (error) {
      alert(error);
    }
  };

  /*useEffect(() => {
    (async () => await updateLocation())();
  }, []);*/

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => await updateLocation()}
      >
        <Text>Update Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => await sendLocation()}
      >
        <Text>Send Location</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  btn: {
    backgroundColor: "#cc2",
    margin: 10,
    padding: 10,
  },
});
