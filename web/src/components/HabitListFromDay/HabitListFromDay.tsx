import { Checkbox, IconButton } from "@mui/material";
import * as S from "./HabitListFronDay.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
      })
      .catch((error) => {
        console.error("Error fetching habits:", error);
        alert("Failed to fetch habits.");
      });
  }, [date]);

  const handleToggleHabit = async (habitId: string) => {
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    try {
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
    } catch (error) {
      console.error("Erro no carregamento de hábito", error);
      alert("Erro no carregamento de hábito.");
    }
  };

  const handleEditHabit = async (habitId: string) => {
    const newTitle = prompt("Qual o seu compromentimento?");
    if (newTitle) {
      try {
        await axios.patch(`http://localhost:3333/habits/${habitId}`, {
          titles: newTitle,
        });
        setHabitsInfo((prevState) => ({
          ...prevState!,
          possibleHabits: prevState!.possibleHabits.map((habit) =>
            habit.id === habitId ? { ...habit, titles: newTitle } : habit
          ),
        }));
        alert("Hábito atualizado com sucesso");
      } catch (error) {
        console.error("Erro no carregamento de hábito:", error);
        alert("Erro no carregamento de hábito.");
      }
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    if (window.confirm("Tem certeza de que deseja excluir este hábito?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3333/habits/${habitId}`
        );
        console.log(response.data); 

        setHabitsInfo((prevState) => ({
          ...prevState!,
          possibleHabits: prevState!.possibleHabits.filter(
            (habit) => habit.id !== habitId
          ),
        }));
        alert("Hábito excluído com sucesso");
      } catch (error) {
        console.error("Erro na exclusão do hábito! Tente novamente.", error);
        alert("Erro na exclusão do hábito! Tente novamente.");
      }
    }
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
              checked={habitsInfo.completedHabits.includes(habit.id)}
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
              isCompleted={habitsInfo.completedHabits.includes(habit.id)}
            >
              {habit.titles}
            </S.Label>


            <IconButton
              onClick={() => handleEditHabit(habit.id)}
              sx={{ padding: "1px",
                    color: "#ffff",
                    width: "12px",
                    height: "12px", }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteHabit(habit.id)}
              sx={{ padding: "1px",
                    color: "#ffff",
                    width: "12px",
                    height: "12px",
               }}
            >
              <DeleteIcon />
            </IconButton>
          </S.ButtonContainer>
        );
      })}
    </S.Container>
  );
}
