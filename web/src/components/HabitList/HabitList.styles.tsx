import styled from "styled-components";

interface IButtonDayProps {
  isDisabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px; 
`;

export const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem; 
`;

export const Day = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem; 
  height: 4rem; 
  color: rgb(161, 161, 170);
  font-size: 1.5rem; 
  font-weight: 700;
  text-align: center;
`;

export const ButtonDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 4rem); 
  gap: 1rem; 
  grid-template-rows: repeat(5, 4rem); 
`;

export const ButtonDay = styled.button<IButtonDayProps>`
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border-radius: 0.75rem; 
  width: 4rem; 
  height: 4rem; 
  background-color: transparent;
  background-image: none;
  border: 2px solid transparent; 
  padding: 1em; 
  font-size: 1.2rem; 
  font-weight: 500;
  font-family: inherit;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  border-color: ${(props) => (props.isDisabled ? "#27272A" : "rgb(82 82 91)")};
  background-color: ${(props) => (props.isDisabled ? "#27272A" : "#3f3f46")};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => !props.isDisabled && "#575757"};
  }
`;
