import React, { useState } from "react";
import { Main, InputGroup, Txt, Input, Btn } from "../Elements";
import { postData } from "../services";
import { storage } from "../services/storage";

export const Login: React.FC<any> = ({ navigation }) => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clear = () => {
    setPassword("");
    setUser("");
  };

  const send = async (u: string, p: string) => {
    const res = await postData("auth/sign-in", {
      user: u,
      password: p,
    });
    if (res) {
      if (res.ok) {
        storage.saveUser({
          userName: res.user.user,
          accessToken: res.user.accessToken,
          id: res.user.id,
          role: res.user.role,
        });
        navigation.navigate("Track");
      } else {
        alert("Invalid User or Password!");
        clear();
      }
    } else {
      alert("Invalid User or Password!");
      clear();
    }
  };

  return (
    <Main>
      <InputGroup>
        <Txt>User: </Txt>
        <Input value={user} onChange={(e) => setUser(e.nativeEvent.text)} />
      </InputGroup>
      <InputGroup>
        <Txt>Password: </Txt>
        <Input
          secureTextEntry={true}
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
      </InputGroup>

      <Btn onPress={async () => await send(user, password)}>
        <Txt>Sign In</Txt>
      </Btn>
    </Main>
  );
};
