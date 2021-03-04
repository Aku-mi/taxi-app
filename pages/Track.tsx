import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import { ILocation } from "../services/interfaces";
import { postData } from "../services";
//import { storage } from "../services/storage";
import { Btn, Main, Txt, MTxt } from "../Elements";

export const Track: React.FC<any> = ({ navigation }) => {
  /*if (!storage.token()) {
    return (
      <Main>
        <Txt>Please Login!</Txt>
        <Btn onPress={() => navigation.navigate("Login")}>
          <Txt>Login</Txt>
        </Btn>
      </Main>
    );
  }*/

  const [location, setLocation] = useState<ILocation>({
    lat: 0,
    lng: 0,
    tmp: 0,
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [text, setText] = useState<string>(
    "Lat: Waiting...\nLng: Waiting...\nTmp: Waiting..."
  );
  const [enable, setEnable] = useState<boolean>(false);

  const updateLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let _location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });
    setLocation({
      lat: _location?.coords.latitude,
      lng: _location?.coords.longitude,
      tmp: _location?.timestamp,
    });
    if (_location) {
      setText(
        `Lat: ${_location.coords.latitude}\nLng: ${_location.coords.longitude}\nTmp: ${_location.timestamp}`
      );
      await sendLocation();
    } else {
      setText(errorMsg);
    }
  };

  const sendLocation = async () => {
    await postData("http://akumi.me/api/enviar-data", location as any);
    await postData("http://msmpage.ddns.net/api/enviar-data", location as any);
  };

  useEffect(() => {
    if (enable) {
      const interval = setInterval(() => {
        (async () => await updateLocation())();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [location, text, enable]);

  const Enable = async () => {
    setEnable((c) => !c);
  };

  return (
    <Main>
      <MTxt>{text}</MTxt>
      <Btn onPress={() => Enable()}>
        <Txt>{enable ? "Disable" : "Enable"}</Txt>
      </Btn>
      <Btn onPress={() => navigation.navigate("Home")}>
        <Txt>Home</Txt>
      </Btn>
    </Main>
  );
};
