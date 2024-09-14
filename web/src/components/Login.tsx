/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SingUp } from "./SingUp";
import * as S from "./Login.styles";
import { useForm } from "react-hook-form";
import axios from "axios";
//import { AlertColor } from "@mui/material";
//import { Alerts } from "../Alerts/Alerts";
//import { useForm } from "react-hook-form";
//import { Loading } from "../Loading/Loading";
//import axios from "axios";
 
interface ILoginProps {
  setShowHeader: (value: boolean) => void;
}
 
// interface IAlertProps {
//   type: AlertColor;
//   message: string;
// }
const url = "http://localhost:3333/login";
 
export function Login({ setShowHeader }: ILoginProps) {
  const [showSingUp, setShowSingUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlet, setShowAlert] = useState(false);
  //const [typeAlertAndMessage, setTypeALertAndMessage] = useState<IAlertProps>();
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm();
 
  const handleButtonToggle = () => {
    if (showSingUp) {
      setShowSingUp(false);
    } else {
      setShowSingUp(true);
    }
  };
 
  const HandleSubmit = (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .post(url, data)
        .then(() => {
          setShowHeader(true);
          localStorage.setItem("showHeader", "true");
        })
        .catch((error: any) => {
          setIsLoading(false);
          setShowAlert(true);
          // setTypeALertAndMessage({
          //   type: "error",
          //   message: error.response.data.message,
          // });
        });
    }, 1000);
  };
 
  return (
    <>
      <S.Container>
        <S.FormContainer>
          <S.ButtonToggleContainer>
            <S.ButtonToggle
              isActive={!showSingUp}
              onClick={() => handleButtonToggle()}
            >
              Login
            </S.ButtonToggle>
            <S.ButtonToggle
              isActive={showSingUp}
              onClick={() => handleButtonToggle()}
            >
              Sign up
            </S.ButtonToggle>
          </S.ButtonToggleContainer>
 
          {!showSingUp && (
            <S.LoginInputsContainer onSubmit={handleSubmit(HandleSubmit)}>
              {isLoading ? (
                <></>
                //<Loading />
              ) : (
                <>
                  <S.InputContainer>
                    <S.LabelContainer widthMargin={201}>
                      <S.LabelBase>Email</S.LabelBase>
                    </S.LabelContainer>
                    <S.InputBase
                      type="email"
                      id=""
                      {...register("email", { required: true })}
                    />
                  </S.InputContainer>
 
                  <S.InputContainer>
                    <S.LabelContainer widthMargin={173}>
                      <S.LabelBase>Password</S.LabelBase>
                    </S.LabelContainer>
                    <S.InputBase
                      type="password"
                      id=""
                      {...register("password", { required: true })}
                    />
                  </S.InputContainer>
 
                  <S.ButtonSubmitContainer>
                    <S.ButtonSubmit
                      widthMargin={60}
                      disabled={!isDirty || !isValid}
                    >
                      Submit
                    </S.ButtonSubmit>
                  </S.ButtonSubmitContainer>
                </>
              )}
            </S.LoginInputsContainer>
          )}
 
          {showSingUp && <SingUp />}
        </S.FormContainer>
      </S.Container>
 
      {/* {showAlet && (
        <Alerts
          message={typeAlertAndMessage!.message}
          type={typeAlertAndMessage!.type}
          handleClose={() => setShowAlert(false)}
        />
      )} */}
    </>
  );
}