/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import GenerateDatesFromYearBeginning from "../../utils/GenerateDatesFromYearBeginning.ts";
import * as S from "./HabitList.styles";
import axios from "axios";
import dayjs from "dayjs";
import { ModalHabitDay } from "../ModalHabiyDay/ModalHabitDay.tsx";

type Sumarry = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function HabitList() {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const summaryDates = GenerateDatesFromYearBeginning();
  const minimumSummaryDatesSize = 18 * 7;
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;
  const [summary, setSummary] = useState<Sumarry>([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState<Date>();
  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");
  const [dayInSummary, setDayInSummary] = useState<any>();

  useEffect(() => {
    axios.get("http://localhost:3333/summary").then((response: any) => {
      setSummary(response.data);
    });
  }, []);

  const getdayInSummary = useCallback(() => {
    let dayIn: any;
    if (summary.length > 0) {
      summaryDates.map((date) => {
        dayIn = summary.find((day) => {
          return dayjs(date).isSame(day.date, "day");
        });
      });
      setDayInSummary(dayIn);
    }
  }, [summary, summaryDates]);

  useEffect(() => {
    getdayInSummary();
  });

  return (
    <S.Container>
      <S.DaysContainer>
        {weekDays.map((weekDay, index) => {
          return <S.Day key={`${weekDay}-${index}`}>{weekDay}</S.Day>;
        })}
      </S.DaysContainer>

      <S.ButtonDaysContainer>
        {summary.length > 0 &&
          summaryDates.map((date) => {
            return (
              <S.ButtonDay
                key={date.toString()}
                isDisabled={false}
                onClick={() => {
                  setShowModal(true);
                  setDate(date);
                }}
              ></S.ButtonDay>
            );
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return <S.ButtonDay key={i} isDisabled={true}></S.ButtonDay>;
          })}
      </S.ButtonDaysContainer>
      {showModal && (
        <ModalHabitDay
          dayAndMonth={dayAndMonth}
          dayOfWeek={dayOfWeek}
          open={showModal}
          date={date?.toISOString()}
          amount={dayInSummary?.amount}
          defaultCompleted={dayInSummary?.completed}
          handleClose={() => setShowModal(false)}
        />
      )}
    </S.Container>
  );
}
