import styled from "styled-components";

interface IButtonProps {
  isActive: boolean;
}

interface ILabelProps {
  widthMargin: number;
}

interface IButtoSubmit {
  widthMargin: number;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: solid 1px rgb(63 63 70);
  border-radius: 20%;
  background-color: rgb(63 63 70);

  align-items: center;
  justify-content: center;
`;

export const ButtonToggleContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonToggle = styled.button<IButtonProps>`
  background: transparent;
  border: none;
  border-bottom: ${(props) => (props.isActive ? "2px" : "1px")} solid
    ${(props) => (props.isActive ? "rgb(124 58 237)" : "")};
`;

export const LoginInputsContainer = styled.form`
  width: 350px;
  height: 300px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

export const LabelBase = styled.span`
  font-family: "Alata", sans-serif;
  font-size: 14px;
  color: rgb(161 161 170);
`;

export const InputBase = styled.input`
  width: 240px;
  height: 14px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #242424;
  background: #242424;
`;

export const LabelContainer = styled.div<ILabelProps>`
  display: flex;
  margin-right: ${(props) => `${props.widthMargin}px`};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonSubmitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: auto;
`;

export const ButtonSubmit = styled.button<IButtoSubmit>`
  width: 240px;
  border-radius: 10px;
  background: rgb(124 58 237);
  border: solid 1px rgb(124 58 237);

  margin-top: ${(props) => `${props.widthMargin}px`};
`;
