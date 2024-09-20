import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 60%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  overflow: auto;

  background-color: rgb(63 63 70);
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 320px;
  flex-direction: column;
  padding: 1.5rem;
`;

export const LabelDayWeek = styled.span`
  font-weight: 600;
  color: rgb(161, 161, 170);
`;

export const DayMonth = styled.span`
  line-height: 1.25;
  font-weight: 800;
  font-size: 1.875rem;
  margin-top: 0.25rem;
`;
