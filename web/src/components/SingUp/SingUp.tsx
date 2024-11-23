import * as S from "./SingUp.styles";
import * as SLogin from "../Login/Login.styles";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { AlertColor } from "@mui/material";
import { Alerts } from "../Alerts/Alerts";

const url = "http://localhost:3333/register";

interface IAlertProps {
  type: AlertColor;
  message: string;
}

export function SingUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlertAndMessage, setTypeALertAndMessage] = useState<IAlertProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
    watch, 
    setError, 
    formState: { errors }, 
  } = useForm();

  const handleRegister = (data: unknown) => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .post(url, data)
        .then((response) => {
          setIsLoading(false);
          setShowAlert(true);
          setTypeALertAndMessage({
            type: "success",
            message: response.data.message,
          });
          reset();
        })
        .catch((error: any) => {
          setIsLoading(false);
          setShowAlert(true);
          
          if (error.response && error.response.data.message.includes("email")) { //erro email
            setTypeALertAndMessage({
              type: "error",
              message: "Este e-mail já está cadastrado.",
            });
          } 

          else if (error.response && error.response.data.message.includes("password")) { //erro senha
            setTypeALertAndMessage({
              type: "error",
              message: "Senha deve ter entre 6 e 10 caracteres.",
            });
          } else {
            // Em caso de outros erros
            setTypeALertAndMessage({
              type: "error",
              message: error.response.data.message,
            });
          }
        });
    }, 1000);
  };

  const passwordValidation = (value: string) => {
    if (value.length < 6 || value.length > 10) {
      setShowAlert(true);
      setTypeALertAndMessage({
        type: "error",
        message: "Senha deve ter entre 6 e 10 caracteres.",
      });

    }
    return true;
  };

  const confirmPasswordValidation = (value: string) => {
    if (value !== watch("password")) {
      setShowAlert(true);
      setTypeALertAndMessage({
        type: "error",
        message: "Senhas não conferem.",
      });
      return "Senhas não conferem.";
    }
    return true;
  };

  return (
    <>
      <S.SingUpInputsContainer onSubmit={handleSubmit(handleRegister)}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={198}>
                <SLogin.LabelBase>Nome</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                {...register("name", { required: "Nome é obrigatório." })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </SLogin.InputContainer>

            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={163}>
                <SLogin.LabelBase>Sobrenome</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                {...register("lastname", { required: "Sobrenome é obrigatório." })}
              />
              {errors.lastname && <span>{errors.lastname.message}</span>}
            </SLogin.InputContainer>

            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={190}>
                <SLogin.LabelBase>E-mail</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                {...register("email", { required: "E-mail é obrigatório." })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </SLogin.InputContainer>

            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={194}>
                <SLogin.LabelBase>Senha</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                type="password"
                {...register("password", { 
                  required: "Senha é obrigatória.",
                  validate: passwordValidation, 
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </SLogin.InputContainer>

            <SLogin.InputContainer>
              <SLogin.LabelContainer widthMargin={130}>
                <SLogin.LabelBase>Confirmar a senha</SLogin.LabelBase>
              </SLogin.LabelContainer>
              <SLogin.InputBase
                type="password"
                {...register("confirmPassword", {
                  required: "Confirme a senha.",
                  validate: confirmPasswordValidation, 
                })}
              />
              {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </SLogin.InputContainer>

            <SLogin.ButtonSubmitContainer>
              <SLogin.ButtonSubmit widthMargin={10}>
                Registrar
              </SLogin.ButtonSubmit>
            </SLogin.ButtonSubmitContainer>
          </>
        )}
      </S.SingUpInputsContainer>

      {showAlert && (
        <Alerts
          message={typeAlertAndMessage!.message}
          type={typeAlertAndMessage!.type}
          handleClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
