import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import * as S from "./Alerts.styles";
import { useEffect } from "react";

export interface IAlertProps {
  type: AlertColor;
  message: string;
  handleClose: () => void;
  top?: number;
  left?: number;
  changeStyle?: boolean;
}

export function Alerts({
  type,
  message,
  handleClose,
  left,
  top,
  changeStyle = false,
}: IAlertProps) {
  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  });

  return (
    <S.Container left={left} top={top} changeStyle={changeStyle}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity={type} onClose={() => handleClose()}>
          {message}
        </Alert>
      </Stack>
    </S.Container>
  );
}
