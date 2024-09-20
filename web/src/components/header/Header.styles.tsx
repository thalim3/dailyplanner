import styled from "styled-components";

export const Container = styled.div`
  width: 1024px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  left: 10%;
  top: 10%;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ButtonNewHabit = styled.button`
  border: 1px solid rgb(139 92 246);
  border-radius: 10px;
  background: transparent;
  font-weight: 400;
  font-family: "Alata", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #d8b6ff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4b0082, 0 0 0 4px #f5f5f5;
  }
`;

export const IconColor = styled.span`
  color: rgb(139 92 246);
  display: flex;
  align-items: center;
`;

export const ButtonLogoutContainer = styled.div`
  display: flex;
  position: absolute;
  left: 100%;
  top: 20%;
`;

export const ButtonLogOut = styled.button`
  border: 1px solid rgb(139 92 246);
  width: 50px;

  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: transparent;
  font-weight: 400;
  font-family: "Alata", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #d8b6ff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4b0082, 0 0 0 4px #f5f5f5;
  }
`;
