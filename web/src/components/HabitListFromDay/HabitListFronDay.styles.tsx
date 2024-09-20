import styled from "styled-components";

interface ILabelProps {
  isCompleted: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.52rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
  width: auto;
  height: 54px;
`;

export const Label = styled.span<ILabelProps>`
  color: ${(props) => (props.isCompleted ? "#a0a0a0" : "#ffff")};
  font-weight: 600;
  font-size: 1.25rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "")};
`;
