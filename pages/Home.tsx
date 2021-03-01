import React, { useState, useEffect } from "react";
import { Main, Btn, Txt } from "../Elements";
import { postData } from "../services";
import { storage } from "../services/storage";

export const Home: React.FC<any> = ({ navigation }) => {
  const [token, setToken] = useState<string>("");

  const logOut = async () => {
    const res = await postData("auth/log-out", {});
    if (res.ok) {
      storage.clear();
      setToken("");
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(storage.token());
    }, 100);
    return () => clearInterval(interval);
  }, [token]);

  if (token) {
    return (
      <Main>
        <Btn onPress={() => navigation.navigate("Track")}>
          <Txt>Track</Txt>
        </Btn>
        <Btn onPress={async () => await logOut()}>
          <Txt>Log Out</Txt>
        </Btn>
      </Main>
    );
  } else {
    return (
      <Main>
        <Btn onPress={() => navigation.navigate("Login")}>
          <Txt>Sign In</Txt>
        </Btn>
        <Btn onPress={() => navigation.navigate("Register")}>
          <Txt>Sign Up</Txt>
        </Btn>
      </Main>
    );
  }
};
