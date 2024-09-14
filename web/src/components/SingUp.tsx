import * as S from "./SingUp.styles";
import * as SLogin from "./Login.styles";
 
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { Loading } from "../Loading/Loading";
// import { AlertColor } from "@mui/material";
// import { Alerts } from "../Alerts/Alerts";
 
const url = "http://localhost:3333/register";
 
// interface IAlertProps {
//   type: AlertColor;
//   message: string;
// }
 
export function SingUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlet, setShowAlert] = useState(false);
  //const [typeAlertAndMessage, setTypeALertAndMessage] = useState<IAlertProps>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm();
 
  const handleRegister = (data: unknown) => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .post(url, data)
        .then((reponse) => {
          setIsLoading(false);
          setShowAlert(true);
        //   setTypeALertAndMessage({
        //     type: "success",
        //     message: reponse.data.message,
        //   });
          reset();
        })
        .catch((error: any) => {
          setIsLoading(false);
          setShowAlert(true);
        //   setTypeALertAndMessage({
        //     type: "error",
        //     message: error.response.data.message,
        //   });
        });
    }, 1000);
  };
 
  return (
    <>
      <S.SingUpInputsContainer onSubmit={handleSubmit(handleRegister)}>
        {isLoading ? (
          <>
          <></>
            {/* <Loading /> */}
          </>
        ) : (
          <>
            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={163}>
                <SLogin.LabelBase>First name</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                {...register("name", { required: true })}
              ></SLogin.InputBase>
            </SLogin.InputContainer>
 
            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={163}>
                <SLogin.LabelBase>Last name</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                {...register("lastname", { required: true })}
              ></SLogin.InputBase>
            </SLogin.InputContainer>
 
            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={190}>
                <SLogin.LabelBase>Email</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                {...register("email", { required: true })}
              ></SLogin.InputBase>
            </SLogin.InputContainer>
 
            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={163}>
                <SLogin.LabelBase>Password</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                {...register("password", { required: true })}
              ></SLogin.InputBase>
            </SLogin.InputContainer>
 
            <SLogin.ButtonSubmitContainer>
              <SLogin.ButtonSubmit
                widthMargin={10}
                disabled={!isDirty || !isValid}
              >
                Register
              </SLogin.ButtonSubmit>
            </SLogin.ButtonSubmitContainer>
          </>
        )}
      </S.SingUpInputsContainer>
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