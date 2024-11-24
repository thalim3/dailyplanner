import { Modal } from "@mui/material";
import * as S from "./NewHabitForm.style";
import { X } from "phosphor-react";
import { DaysWeek } from "../daysweek/DaysWeek"; 
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Alerts } from "../Alerts/Alerts";
import { IAlertProps } from "../Login/Login";

interface INewHabitFormProps {
  handleClose: () => void;
  open: boolean;
  handleSetPossiblesHabits: (value: any) => void;
}

export function NewHabitForm({ handleClose, open, handleSetPossiblesHabits }: INewHabitFormProps) {
  const [titles, setTitle] = useState(""); 
  const [weekDays, setWeekDays] = useState<number[]>([]);  
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlertAndMessage, setTypeALertAndMessage] = useState<IAlertProps>();
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  const getWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const dates: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + diffToMonday + i);
      dates.push(day);
    }

    return dates;
  };

  useEffect(() => {
    const dates = getWeekDates();
    setWeekDates(dates); 
  }, []);

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();

    if (!titles || weekDays.length === 0) {
      setShowAlert(true);
      setTypeALertAndMessage({
        type: "warning",
        message: "Preencha os campos: TÍTULO e RECORRÊNCIA!",
      });
      return;
    }

    try {

      console.log("Dados enviados para a API:", { titles, weekDays });

      const response = await axios.post("http://localhost:3333/habits", {
        titles,
        weekDays,
      });

      console.log("Resposta da API:", response.data); 

      handleSetPossiblesHabits((prevHabits: any) => [
        ...prevHabits,
        response.data,
      ]);

      setShowAlert(true);
      setTypeALertAndMessage({
        type: "success",
        message: "Hábito adicionado",
      });

      setTimeout(() => {
        setTitle(""); 
        setWeekDays([]); 
        handleClose(); 
      }, 1000);
    } catch (error) {
      // Depuração do erro
      console.error("Erro na requisição:", error); 

      let errorMessage = "Hábito adicionado";

      if (axios.isAxiosError(error)) {

        console.error("Erro da API:", error.response);
        errorMessage = error.response?.data?.message || error.message;
      } else {
        console.error("Erro desconhecido:", error);
      }

      setShowAlert(true);
      setTypeALertAndMessage({
        type: "error",
        message: errorMessage,
      });

      setTimeout(() => {
        setTitle(""); 
        setWeekDays([]); 
        handleClose(); 
      }, 1000);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <S.Container>
        <S.ButtonClose onClick={handleClose}>
          <X size={14} aria-label="Fechar" />
        </S.ButtonClose>
        <S.FormContainer onSubmit={createNewHabit}>
          <S.Title>Novo Hábito</S.Title>
          <S.LabelBase isMaginTop={false}>Qual o seu comprometimento?</S.LabelBase>
          <S.InputBase
            type="text"
            id="title"
            placeholder="Ex.: Exercícios, dormir bem, etc..."
            autoFocus
            value={titles}
            onChange={(event) => setTitle(event.target.value)}
          />
          <S.LabelBase isMaginTop={true}>Qual a frequência?</S.LabelBase>
          
          <DaysWeek handleSetWeekDays={setWeekDays} weekDates={weekDates} />
          
          <div>
            <S.ButtonSubmit>Confirmar</S.ButtonSubmit>
          </div>
        </S.FormContainer>
        {showAlert && (
          <Alerts
            left={21}
            top={2}
            changeStyle={true}
            message={typeAlertAndMessage!.message}
            type={typeAlertAndMessage!.type}
            handleClose={() => setShowAlert(false)}
          />
        )}
      </S.Container>
    </Modal>
  );
}
