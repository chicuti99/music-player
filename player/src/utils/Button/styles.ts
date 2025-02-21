import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  align-items:center;
  width:100%;

  label{
    width:100%;
  }


  input {
    height: 24px;
    padding: 10px;
    border-radius: 8px;
    &:focus {
      border: 1px solid green;
      border-radius: 8px;
    }

    &:disabled {
      cursor: not-allowed;
      color: #33333350;
    }
  }
  span {
    font-weight: bold;
    color: black;
  }
`;
