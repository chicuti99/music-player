import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    padding-top:20px;
    width:70%;
`

export const AddPlaylistButton = {
    borderRadius:'8px',
    color:'white',
    backgroundColor:'black',
    padding:'10px',

    '&:hover' :{
        transition: 'all 0.3s ease-in-out',
        transform: 'scale(1.03)',
        backgroundColor:"#2F2E31"
    }
}


export const AddMusicButton = {
    borderRadius:'8px',
    color:'white',
    backgroundColor:'green',
    padding:'10px',

    '&:hover' :{
        transition: 'all 0.3s ease-in-out',
        transform: 'scale(1.03)',
        backgroundColor:"#6dd40b"
    }
}

export const DeleteMusicButton = {
    borderRadius:'8px',
    color:'white',
    backgroundColor:'red',
    padding:'10px',

    '&:hover' :{
        transition: 'all 0.3s ease-in-out',
        transform: 'scale(1.03)',
        backgroundColor:"#c0450b"
    }
}