/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    LinearProgress,
    linearProgressClasses,
    Modal,
    Stack,
    styled,
  } from "@mui/material";
  
  import * as S from "./ModalHabitDay.styles";
  import { HabitListFromDay } from "../HabitListFromDay/HabitListFromDay";
  import { useState } from "react";
  
  interface IModalHabitDay {
    handleClose: () => void;
    open: boolean;
    dayAndMonth: string;
    dayOfWeek: string;
    date: string | undefined;
    defaultCompleted?: number;
    amount?: number;
  }
  
  export function ModalHabitDay({
    handleClose,
    open,
    dayAndMonth,
    dayOfWeek,
    date,
    amount = 0,
  }: IModalHabitDay) {
    const [completed, setCompleted] = useState<[]>([]);
    const [possiblesHabits, setPossiblesHabits] = useState<[]>([]);
    const completedPercentage =
      amount > 0
        ? Math.round((completed?.length / possiblesHabits?.length) * 100)
        : 0;
  
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
      height: 10,
      borderRadius: 10,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles("dark", {
          backgroundColor: theme.palette.grey[800],
        }),
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 10,
        backgroundColor: "#9b63fd",
        ...theme.applyStyles("dark", {
          backgroundColor: "#7c3aed",
        }),
      },
    }));
  
    const handleSetCompleted = (value: any) => {
      setCompleted(value);
    };
  
    const handleSetPossiblesHabits = (value: any) => {
      setPossiblesHabits(value);
    };
  
    return (
      <Modal open={open} onClose={handleClose}>
        <S.Container>
          <S.InfoContainer>
            <S.LabelDayWeek>{dayOfWeek}</S.LabelDayWeek>
            <S.DayMonth>{dayAndMonth}</S.DayMonth>
  
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <BorderLinearProgress
                variant="determinate"
                value={completedPercentage}
              />
              <HabitListFromDay
                date={date}
                handleSetCompleted={(value) => handleSetCompleted(value)}
                handleSetPossiblesHabits={(value) =>
                  handleSetPossiblesHabits(value)
                }
              />
            </Stack>
          </S.InfoContainer>
        </S.Container>
      </Modal>
    );
  }
  