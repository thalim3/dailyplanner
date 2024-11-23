import { useCallback, useEffect, useState } from "react";
import GenerateDatesFromYearBeginning from "../../utils/GenerateDatesFromYearBeginning.ts";
import * as S from "./HabitList.styles";
import axios from "axios";
import dayjs from "dayjs";
import { ModalHabitDay } from "../ModalHabiyDay/ModalHabitDay.tsx";

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function HabitList() {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [summary, setSummary] = useState<Summary>([]); 
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [dayInSummary, setDayInSummary] = useState<any[]>([]); 
  const [selectedDay, setSelectedDay] = useState<number | null>(null); 
  const today = dayjs();
  const currentMonth = today.month();
  const currentYear = today.year();
  const daysInMonth = today.daysInMonth();
  const firstDayOfMonth = dayjs(new Date(currentYear, currentMonth, 1));
  const firstDayOfWeek = firstDayOfMonth.day();
  const summaryDates = GenerateDatesFromYearBeginning(); 

  useEffect(() => {
    axios.get("http://localhost:3333/summary").then((response: any) => {
      setSummary(response.data);
    });
  }, []);

  const getDayInSummary = useCallback(() => {
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const currentDay = dayjs().date(i + 1).format("YYYY-MM-DD"); 
      const habitForDay = summary.find((habit) => habit.date === currentDay); 
      return habitForDay || null;
    });
    setDayInSummary(days); 
  }, [summary, daysInMonth]);

  useEffect(() => {
    getDayInSummary();
  }, [summary, getDayInSummary]); 

  const handleDayClick = (i: number, date: Date) => {
    setSelectedDay(i + 1);  
    setShowModal(true);
    setDate(date);
  };

  return (
    <S.Container>
      <S.DaysContainer>
        {weekDays.map((weekDay, index) => (
          <S.Day key={index}>{weekDay}</S.Day>
        ))}
      </S.DaysContainer>

      <S.ButtonDaysContainer>
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <S.ButtonDay key={`empty-${i}`} isDisabled={true}></S.ButtonDay>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = dayjs().date(i + 1); 
          const habitForDay = dayInSummary[i];
          const isSelected = selectedDay === i + 1; 

          return (
            <S.ButtonDay
              key={i}
              isDisabled={false}
              onClick={() => handleDayClick(i, date.toDate())}  
              isSelected={isSelected}  
            >
              {i + 1}
              {habitForDay && habitForDay.completed > 0 && <span>✔</span>}
            </S.ButtonDay>
          );
        })}
      </S.ButtonDaysContainer>

      {showModal && date && (
        <ModalHabitDay
          dayAndMonth={dayjs(date).format("DD/MM")}
          dayOfWeek={dayjs(date).format("dddd")}
          open={showModal}
          date={date?.toISOString()}
          amount={dayInSummary.find((day) => day?.date === dayjs(date).format("YYYY-MM-DD"))?.amount}
          defaultCompleted={dayInSummary.find((day) => day?.date === dayjs(date).format("YYYY-MM-DD"))?.completed}
          handleClose={() => setShowModal(false)}
        />
      )}
    </S.Container>
  );
}
