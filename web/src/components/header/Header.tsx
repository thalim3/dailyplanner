import * as S from "./Header.styles";
import logoImage from "../../assets/logo.svg";
import { SignOut, Plus } from "phosphor-react";
import { NewHabitForm } from "../newHabitForm/NewHabitForm";
import { useState } from "react";

interface IHeaderProps {
  setShowHeader: (value: boolean) => void;
}

export function Header({ setShowHeader }: IHeaderProps) {
  const [shoeNewHabitFomr, setShowNewHabitForm] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    setShowHeader(false);
  };

  return (
    <S.Container>
      <S.ButtonLogoutContainer>
        <S.ButtonLogOut onClick={() => handleLogOut()}>
          <S.IconColor>
            <SignOut size={20} className="text-violet-500" />
          </S.IconColor>
        </S.ButtonLogOut>
      </S.ButtonLogoutContainer>
      <img src={logoImage} alt="habits" />

      <S.ButtonContainer>
        <S.ButtonNewHabit onClick={() => setShowNewHabitForm(true)}>
          <S.IconColor>
            <Plus size={20} className="text-violet-500" />
          </S.IconColor>
          New habit
        </S.ButtonNewHabit>
      </S.ButtonContainer>

      <NewHabitForm
        open={shoeNewHabitFomr}
        handleClose={() => setShowNewHabitForm(false)}
      />
    </S.Container>
  );
}
