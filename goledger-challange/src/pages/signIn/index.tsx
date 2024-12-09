import { FaSpotify,FaGoogle,FaFacebook,FaApple } from "react-icons/fa";
import { ButtonArea, ButtonStyle, Container, Content, Header, InputArea, labelStyle, SignInButtonStyle, theme } from './styles';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import Input from "../../utils/Button/Input";
import api, { setBasicAuth } from "../../services/api";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";



export const SignIn = ()=> {
  const [user,setUser] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate();
    
  const signIn = async () =>{
    if(user.username === ''){
      toast.error("digite um um email ou nome de usuario");
      return;
    }

    if(user.password === ''){
      toast.error('Digite uma senha');
      return;
    }
    try{
    setBasicAuth(user);
    const response = await api.get('/query/getSchema');
    
    if (response.status === 401) {
      toast.error('Login ou senha inválidos');
    } 
    
    else if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthorized', 'true');
      toast.success('Login realizado com sucesso!');
      navigate('/main'); // Redireciona para /main após sucesso
    }
    }
    catch(err: any){
      toast.error('erro ao fazer login');
      console.log(err)
    }
  }


    
    return(
    <ThemeProvider theme={theme}>
        <Container>
            <Content>
                <Header>
                    <FaSpotify size={40}/>
                    <span>Entrar no ledgerfy</span>
                </Header>
                <ButtonArea>
                    <Button variant="outlined" startIcon={<FaGoogle/>} sx={ButtonStyle}>Continuar com google</Button>
                    <Button variant="outlined" startIcon={<FaFacebook/>} sx={ButtonStyle}>Continuar com Facebook</Button>
                    <Button variant="outlined" startIcon={<FaApple/>} sx={ButtonStyle}>Continuar com a Apple</Button>
                    <Button variant="outlined" color="primary" sx={ButtonStyle}>Continuar com número de <br/>telefone</Button>
                    <p></p>
                </ButtonArea>
                
                <InputArea>
                    <Input label="E-mail ou nome de usuário" labelStyle={labelStyle} containerStyle={{width:'100%',height:35}} onChange={(e)=>{
                      setUser((prevData) => ({
                        ...prevData,
                        username : e.target.value
                      }));
                    }}/>
                    <Input label="Senha" labelStyle={labelStyle} type="password" containerStyle={{width:'100%',height:35}} onChange={(e) => {
                      setUser((prevData) => ({
                        ...prevData,
                        password : e.target.value
                      }));
                    }}/>
                </InputArea>

                <Button variant="text" sx={SignInButtonStyle} onClick={()=> signIn()}>Entrar</Button>
            </Content>
          </Container>
    </ThemeProvider>
    )
}