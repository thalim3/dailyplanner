import styled from "styled-components";

interface AlertsProps {
  left?: number;
  top?: number;
  changeStyle: boolean;
}

export const Container = styled.div<AlertsProps>`
  display: flex;
  position: absolute;
  top: ${(props) => (props.changeStyle ? `${props.top}%` : `${10}%`)};
  left: ${(props) => (props.changeStyle ? `${props.left}%` : `${84}%`)};
`;
