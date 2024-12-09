import styled from "styled-components";
import { common } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';


export const Container = styled.div`
    width:100vw;
    height:100vh;
    margin:0;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    background: linear-gradient(rgb(0 0 0 / 79%) 0%, rgb(8 8 8));    
`

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    height:900px;
    width:750px; 
    align-items:center;
    background-color:#121212;
    border-radius:10px;
`

export const Header = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:32px;
    gap:10px;
    color:white;

    span{
        font-size:32px;
        font-weight:700;
    }
`
export const theme = createTheme({
    palette: {
      primary: { main: common.black },
      secondary: { main: common.white },
    },
  });

    

export const ButtonArea = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;   
    width:100%;
    align-items:center;
    padding-bottom:20px;
    p{
        border:1px solid #292929;
        width:70%;
        margin:15px 0px 0px 0px;
    }
`


export const InputArea = styled.div`
    display:flex;
    flex-direction:column;
    width:50%;
    align-items:center;
    justify-content:center;
    padding-bottom:15px;
`

export const labelStyle = {
    color:'white',
    fontSize:16,
    fontWeight:700,
    paddingBottom:5,
  }

export const ButtonStyle = {
    borderRadius:'30px',
    width:'50%',
    color:'white',
    border:'1px solid grey',
    padding:'14px',

    '&:hover' :{
      border:'1px solid white'
    }

  }


export const SignInButtonStyle = {
    borderRadius:'30px',
    width:'50%',
    color:'black',
    fontWeight:700,
    padding:'14px',
    backgroundColor:'#1ed760',


    '&:hover' :{
        transition: 'all 0.3s ease-in-out',
        transform: 'scale(1.03)',
        backgroundColor:"#3be477"
    }

  }
