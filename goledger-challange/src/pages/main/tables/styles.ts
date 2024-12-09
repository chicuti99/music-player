import styled from "styled-components";

export const TableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto; 
  margin-top:50px;
  width:100%;
`;

export const TableStyle = styled.table`
    width:100%;
    color:#71717a;
    font-weight:500;
    height:70px;

    th{
        vertical-align:middle;
        text-align:left;
        padding:20px 16px;
        border-bottom:1px solid #E4E4E7;
        border-collapse:collapse;
    }
    
    td{
        padding:15px 16px;

    }
`