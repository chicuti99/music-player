import { Button } from "@mui/material";
import Input from "../../../utils/Button/Input";
import { AddAlbumButton, Container } from "./styles";
import { useEffect, useState } from "react";
import { useInfoContext } from "..";
import { Tables } from "../tables";
import { AlbumResponse, ArtistResponse, ITablesAlbums, Option } from "../../../utils/interfaces";
import toast from "react-hot-toast";
import api from "../../../services/api";
import Select from "../../../utils/select";

export const Albums = () => {
  const { setHeader, album, setAlbum,header,selectedAlbum,action } = useInfoContext();

  const options = ['Album','Song','Artist','Playlist'];
  const [title,setTitle] = useState('');
  const [artist,setArtist] = useState('');
  const [year,setYear] = useState(2000);
  const [artists,setArtists] = useState<Option[]>([])
  const[selectedArtist,setSelectedArtist] = useState<Option>()
  

  useEffect(() => {
    setHeader(["Name", "Artist", "Year"]);
  }, [setHeader]);

  const deleteAlbum = async () => {
    const query = {
      key: {
        "@assetType": "album",
        name:selectedAlbum.name,
        artist : {
          name : selectedAlbum.artist
        } 
      },
      cascade : true
    }

    await api.post('/invoke/deleteAsset',query);

  }

  useEffect(() => {
    if(action === 'delete'){
      deleteAlbum()
    }

    else if(action === "edit"){
      setTitle(selectedAlbum.name);
      setYear(selectedAlbum.year);
      const artistOfAlbum = artists.find((artist)=> artist.label === selectedAlbum.artist)
      setSelectedArtist(artistOfAlbum);
    }
  },[selectedAlbum])

  function getArtist(){
    const local_artist = localStorage.getItem("@Artist");
    if(local_artist){
      const parsedArtist = JSON.parse(local_artist);
      getAlbums(parsedArtist)
      const artists_list:Option[] = [{label:'',value:''}]
      parsedArtist.map((artist:ArtistResponse) => {
        const opt = {label: artist.name,value:artist["@key"]}
        artists_list.push(opt)
      })

      setArtists(artists_list);
    }

  }

  function getAlbums(artists:ArtistResponse[]) {
    options.map((opt: string) => {
      const local_data = localStorage.getItem(`@${opt}`);
      if (local_data) {
        const parsedData = JSON.parse(local_data);
        if (opt === "Album") {
          const newAlbums = parsedData.map((data: AlbumResponse): ITablesAlbums => ({
            name: data.name,
            year: data.year,
            artist: artists.find((artist) => artist["@key"] === data.artist["@key"])?.name || "",
          }));
          setAlbum(newAlbums);
        }
      }
    });

  }
  

  useEffect(() => {
    getArtist()
  },[])

  const handleAddAlbum = async ()=> {
    const query = {
      asset: [
        {
          "@assetType": "album",
          name: title,
          artist: {
            name: selectedArtist?.label
          },
          year: year
        }
      ]
    }
    
    try{
      await api.post('/invoke/createAsset',query);  
      toast.success("success");
    }  
    catch(err){
      toast.error("error")
    }
  }

  const handleEditAlbum = async ()=> {
    const query = {
      update: {
    "@assetType": "album",
    name: selectedAlbum.name,
    artist: {
      name:selectedArtist?.label
    },
    year: selectedAlbum.year
  }
    }

    try{
      await api.post('/invoke/updateAsset',query);
      toast.success('sucess')  
    }  
    catch(err){
      toast.error('error')
    }
  }

  
  
  return (
    <Container>
      <Input
        label="Name"
        containerStyle={{ width: "100%", height: 40, border: "1px solid #E4E4E7" }}
        labelStyle={{ paddingBottom: 5 }}
        value={title}
        onChange={(e) =>setTitle(e.target.value)}
      />

      <Select label="Artist" options={artists} labelStyle={{ paddingBottom: 5 }} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> {
        const artist_selected = artists.find((artist)=> artist.value === e.target.value)
        setSelectedArtist(artist_selected); 
      }}
      value={selectedArtist?.value || ""}
      />
      <Input
        label="Year"
        containerStyle={{ width: "100%", height: 40, border: "1px solid #E4E4E7" }}
        labelStyle={{ paddingBottom: 5 }}
        onChange={(e) => setYear(Number(e.target.value))}
        value={year}
      />

    
        <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
        <Button variant="contained" sx={AddAlbumButton} onClick={() => handleAddAlbum()}>
          Add album
        </Button>
        <Button variant="contained" sx={AddAlbumButton} onClick={() => handleEditAlbum()}>
          Edit album
        </Button>
        </div>
        <div/>
      <Tables content={album } header={header} type="Album"/>
    </Container>
  );
};
