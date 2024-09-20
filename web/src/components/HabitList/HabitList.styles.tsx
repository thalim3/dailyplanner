import styled from "styled-components";

interface IButtonDayProps {
  isDisabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex: 1;

  margin-top: 100px;
`;

export const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Day = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: rgb(161 161 170);

  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
`;

export const ButtonDaysContainer = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, minmax(0, 1fr));
`;

export const ButtonDay = styled.button<IButtonDayProps>`
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border-radius: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  background-image: none;

  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;

  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};

  border-color: ${(props) => (props.isDisabled ? "#27272A" : "rgb(82 82 91)")};
  background-color: ${(props) => (props.isDisabled ? "#27272A" : "#3f3f46")};
  transition: border-color 0.25s;
`;
