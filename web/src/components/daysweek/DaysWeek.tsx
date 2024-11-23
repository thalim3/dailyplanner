import Checkbox from "@mui/material/Checkbox";
import * as S from "./DaysWeek.styles";
import { useState } from "react";

interface DaysWeekProps {
  handleSetWeekDays: (value: number[]) => void;
  weekDates: Date[];
}

export function DaysWeek({ handleSetWeekDays, weekDates }: DaysWeekProps) {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleToggleWeekDays = (dayIndex: number) => {
    let updatedWeekDays;
    if (weekDays.includes(dayIndex)) {
      updatedWeekDays = weekDays.filter((day) => day !== dayIndex);
    } else {
      updatedWeekDays = [...weekDays, dayIndex];
    }

    setWeekDays(updatedWeekDays);
    handleSetWeekDays(updatedWeekDays); 
  };

  return (
    <S.Container>
      {weekDates.map((date, index) => {
        const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });

        const adjustedIndex = index === 0 ? 1 : (index === 6 ? 0 : index + 1);

        return (
          <S.CheckboxContainer key={index}>
            <Checkbox
              {...label}
              checked={weekDays.includes(adjustedIndex)}
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
              onClick={() => handleToggleWeekDays(adjustedIndex)}
            />
            <S.SpanWeekDays>{dayName}</S.SpanWeekDays>
          </S.CheckboxContainer>
        );
      })}
    </S.Container>
  );
}
