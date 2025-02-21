import styled from "styled-components";

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  align-items: center;
  width: 100%;

  label {
    width: 100%;
  }

  select {
    height: 36px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #fff;
    width: 100%;

    &:focus {
      border: 1px solid green;
      border-radius: 8px;
    }

    &:disabled {
      cursor: not-allowed;
      color: #33333350;
      background-color: #f5f5f5;
    }
  }
`;
