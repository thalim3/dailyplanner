import styled from "styled-components";

interface labelProps {
  isMaginTop: boolean;
}

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;

  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  overflow: auto;
  background-color: rgb(63 63 70);

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  scrollbar-width: thin;
`;

export const ButtonClose = styled.span`
  display: flex;
  height: 14px;
  width: 14px;
  background: transparent;
  border: none;
  position: relative;
  cursor: pointer;
  left: 95%;
  top: 10px;
  color: rgb(139 92 246);
`;

export const Title = styled.h2`
  display: flex;
  position: relative;
  right: 119px;
  font-size: 32px;
  font-weight: 800;
  font-family: "Alata", sans-serif;
`;

export const FormContainer = styled.form`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
  padding-bottom: 10px;
`;

export const LabelBase = styled.label<labelProps>`
  font-weight: 400;
  font-family: "Alata", sans-serif;
  display: flex;
  position: relative;
  right: ${(props) => (props.isMaginTop ? "110px" : "98px")};
  margin-top: ${(props) => (props.isMaginTop ? "10px" : "")};
`;

export const InputBase = styled.input`
  width: 368px;
  height: 10px;
  padding: 16px;
  background-color: rgb(39 39 42);
  border-radius: 10px;
  margin-top: 0.75rem;
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
`;

export const ButtonSubmit = styled.button`
  display: flex;
  width: 300px;
  border: 1px solid rgb(139 92 246);
  border-radius: 10px;
  background: rgb(139 92 246);
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
