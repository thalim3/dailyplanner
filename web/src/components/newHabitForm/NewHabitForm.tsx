import { Modal } from "@mui/material";
import * as S from "./NewHabitForm.style";
import { X } from "phosphor-react";
import { DaysWeek } from "../daysweek/DaysWeek";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Alerts } from "../Alerts/Alerts";
import { IAlertProps } from "../Login/Login";

interface INewHabitFormProps {
  handleClose: () => void;
  open: boolean;
}

export function NewHabitForm({ handleClose, open }: INewHabitFormProps) {
  const [titles, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [showAlet, setShowAlert] = useState(false);
  const [typeAlertAndMessage, setTypeALertAndMessage] = useState<IAlertProps>();

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();
    if (!titles || weekDays.length === 0) {
      setShowAlert(true);
      setTypeALertAndMessage({
        type: "warning",
        message: "Fill in the fields: TITLE and RECURRENCE!",
      });

      return;
    }
    await axios
      .post("http://localhost:3333/habits", {
        titles,
        weekDays,
      })
      .then(() => {
        setShowAlert(true);
        setTypeALertAndMessage({
          type: "success",
          message: "Habit successfully created!!",
        });

        setTimeout(() => {
          setTitle("");
          setWeekDays([]);
          handleClose();
        }, 1000);
      })
      .catch((error) => {
        setShowAlert(true);
        setTypeALertAndMessage({
          type: "error",
          message: error.response.data.message,
        });

        setTimeout(() => {
          setTitle("");
          setWeekDays([]);
          handleClose();
        }, 1000);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <S.Container>
        <S.ButtonClose onClick={handleClose}>
          <X size={14} aria-label="Fechar" />
        </S.ButtonClose>
        <S.FormContainer onSubmit={createNewHabit}>
          <S.Title>Create a habit</S.Title>
          <S.LabelBase isMaginTop={false}>What is your commitment?</S.LabelBase>
          <S.InputBase
            type="text"
            id="title"
            placeholder="Ex.: Atividade física, dormir cedo, meta de hidratação, etc..."
            autoFocus
            value={titles}
            onChange={(event) => setTitle(event.target.value)}
          />
          <S.LabelBase isMaginTop={true}>What is the recurrence?</S.LabelBase>
          <DaysWeek handleSetWeekDays={setWeekDays} />
          <div>
            <S.ButtonSubmit>Create</S.ButtonSubmit>
          </div>
        </S.FormContainer>
        {showAlet && (
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
