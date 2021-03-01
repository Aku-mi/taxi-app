import React, { useState } from "react";
import { Main, InputGroup, Txt, Input, Btn } from "../Elements";
import { postData } from "../services";

export const Register: React.FC<any> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clear = () => {
    setPassword("");
    setUser("");
    setName("");
  };

  const send = async (n: string, u: string, p: string) => {
    const res = await postData("auth/sign-up", {
      name: n,
      user: u,
      password: p,
    });
    if (res) {
      if (res.ok) {
        navigation.navigate("Login");
      } else {
        alert("Something went wrong :(");
        clear();
      }
    } else {
      alert("Something went wrong :(");
      clear();
    }
  };

  return (
    <Main>
      <InputGroup>
        <Txt>Name: </Txt>
        <Input value={name} onChange={(e) => setName(e.nativeEvent.text)} />
      </InputGroup>
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

      <Btn onPress={async () => await send(name, user, password)}>
        <Txt>Sign Up</Txt>
      </Btn>
    </Main>
  );
};
