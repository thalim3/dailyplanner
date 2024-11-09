import Checkbox from "@mui/material/Checkbox";
import * as S from "./DaysWeek.styles";
import { useState } from "react";

const availableWeekDays = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
  "Domingo",
];

interface DaysWeekProps {
  handleSetWeekDays: (value: number[]) => void;
}

export function DaysWeek({ handleSetWeekDays }: DaysWeekProps) {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleToggleWeekDays = (weekDay: number) => {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
      handleSetWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
      handleSetWeekDays(weekDaysWithAddedOne);
    }
  };

  return (
    <S.Container>
      {availableWeekDays.map((weekDay, index) => {
        return (
          <S.CheckboxContainer key={weekDay}>
            <Checkbox
              {...label}
              defaultChecked={false}
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
              onClick={() => handleToggleWeekDays(index)}
            />
            <S.SpanWeekDays>{weekDay}</S.SpanWeekDays>
          </S.CheckboxContainer>
        );
      })}
    </S.Container>
  );
}
