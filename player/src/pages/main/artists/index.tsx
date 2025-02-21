import { Button } from "@mui/material";
import Input from "../../../utils/Button/Input";
import { AddArtistButton, Container } from "./styles";
import { useEffect, useState } from "react";
import { useInfoContext } from "..";
import { Tables } from "../tables";
import { ArtistResponse, ITablesArtists } from "../../../utils/interfaces";
import toast from "react-hot-toast";
import api, { setBasicAuth } from "../../../services/api";

export const Artist = () => {
  const { setHeader,header,artist,setArtist,selectedArtist,action} = useInfoContext();

  const options = ['Album','Song','Artist','Playlist'];
  const [name,setName] = useState('');
  const [country,setCountry] = useState('');
  

  
  const getData = async () => {
    setBasicAuth();
  
    const query = {
      query: {
        selector: {
          "@assetType": `artist`,
        },
      },
    };
  
    try {
      const response = await api.post('/query/search', query);
      localStorage.setItem(`@Artist`, JSON.stringify(response.data.result));
      getArtist(); // Atualiza o estado com os novos dados do localStorage
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch artist data");
    }
  };
  
  useEffect(() => {
    setHeader(["Name", "Country"]);
  }, [setHeader]);

  const deleteArtist = async () => {
    const query = {
      key: {
        "@assetType": "artist",
        name:selectedArtist.name
      }
    }

    try{
    await api.post('/invoke/deleteAsset',query);
    toast.success("sucesso");
    }
    catch(err){
      toast.error("error")
    }
    getData();
  }
  useEffect(() => {
    if(action === 'delete'){
      deleteArtist()
    }

    if(action === 'edit'){
      setName(selectedArtist.name);
      setCountry(selectedArtist.country);
    }

  },[selectedArtist])

  function getArtist() {
    options.map((opt: string) => {
      const local_data = localStorage.getItem(`@${opt}`);
      if (local_data) {
        const parsedData = JSON.parse(local_data);
        if (opt === "Artist") {
          const newArtist = parsedData.map((data: ArtistResponse): ITablesArtists => ({
            name: data.name,
            country: data.country,
          }));
  
          setArtist(newArtist);
        }
      }
    });
  }
  

  useEffect(() => {
    getArtist()
  },[])

  const handleEditArtist = async ()=> {
    const query = {

      update:{
          "@assetType": "artist",
          name:name,
         country: country
        }
      
    }
    try{
      await api.post('/invoke/updateAsset',query);
      toast.success("sucesso");
    }

    catch(err){
      toast.error("erro")
    }
    getData();
    
  }

  const handleAddArtist = async ()=> {
    const query = {

      asset: [
        {
          "@assetType": "artist",
          name:name,
         country: country
        }
      ]
    }
    try{
      await api.post('/invoke/createAsset',query);
      toast.success("success")
    }

    catch(err){
      toast.error("error")
    }

    getData();
    
  }

  
  return (
    <Container>
      <Input
        label="Name"
        containerStyle={{ width: "100%", height: 40, border: "1px solid #E4E4E7" }}
        labelStyle={{ paddingBottom: 5 }}
        value={name}
        onChange={(e) =>setName(e.target.value)}
      />
      <Input
        label="Country"
        containerStyle={{ width: "100%", height: 40, border: "1px solid #E4E4E7" }}
        labelStyle={{ paddingBottom: 5 }}
        onChange={(e) =>setCountry(e.target.value)}
        value={country}
      />

      <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
      <Button variant="contained" sx={AddArtistButton} onClick={()=> handleAddArtist()}>
        Add artist
      </Button>

      <Button variant="contained" sx={AddArtistButton} onClick={() => handleEditArtist()}>
        edit artist
      </Button>
      </div>
      <Tables content={artist} header={header} type="Artist"/>
    </Container>
  );
};
