/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@mui/material";
import * as S from "./HabitListFronDay.styles";
import { useEffect, useState } from "react";
import axios from "axios";

interface IHabitListFromDayProps {
  date: string | undefined;

  handleSetCompleted: (value: any) => void;
  handleSetPossiblesHabits: (value: any) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    titles: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitListFromDay({
  date,
  handleSetCompleted,
  handleSetPossiblesHabits,
}: IHabitListFromDayProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    axios
      .get("http://localhost:3333/day", {
        params: {
          date: date,
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, [date]);

  const handleToggleHabit = async (habitId: string) => {
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    await axios.patch(`http://localhost:3333/habits/${habitId}/toggle`);
    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });
  };

  useEffect(() => {
    handleSetCompleted(habitsInfo?.completedHabits);
    handleSetPossiblesHabits(habitsInfo?.possibleHabits);
  }, [
    habitsInfo?.completedHabits,
    habitsInfo?.possibleHabits,
    handleSetCompleted,
    handleSetPossiblesHabits,
  ]);

  return (
    <S.Container>
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <S.ButtonContainer key={habit.id}>
            <Checkbox
              {...label}
              checked={
                habitsInfo.completedHabits.includes(habit.id) ? true : false
              }
              sx={{
                "&.Mui-checked": {
                  color: "#7c3aed",
                },
                "& .MuiSvgIcon-root": {
                  width: 40,
                  height: 40,
                  color: "#b893f7",
                  borderWidth: 1,
                },
              }}
              onClick={() => handleToggleHabit(habit.id)}
            />
            <S.Label
              isCompleted={
                habitsInfo.completedHabits.includes(habit.id) ? true : false
              }
            >
              {habit.titles}
            </S.Label>
          </S.ButtonContainer>
        );
      })}
    </S.Container>
  );
}
