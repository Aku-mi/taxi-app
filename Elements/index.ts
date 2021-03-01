import styled from "styled-components/native";

export const Main = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 50px;
`;

export const InputGroup = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0;
`;

export const Input = styled.TextInput`
  border: 1px rgb(250, 65, 65) solid;
  width: 100%;
  height: 35px;
  font-size: 18px;
`;

export const Txt = styled.Text`
  font-weight: bold;
  margin: 5px 0px;
`;

export const MTxt = styled.Text`
  font-weight: bold;
  margin: 5px 0px;
  height: 50px;
`;

export const Btn = styled.TouchableOpacity`
  margin: 50px 0px;
  background-color: rgba(233, 72, 72, 0.911);
  padding: 6px 6px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
