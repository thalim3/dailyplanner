import styled from "styled-components";

export const SingUpInputsContainer = styled.form`
  width: 350px;
  min-height: 350px; 
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 6px; 
  padding: 20px;
`;

export const ButtonSubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px; 
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #7c3aed;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;
