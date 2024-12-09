import { Button } from "@mui/material";
import Input from "../../../utils/Button/Input";
import { AddSongButton, Container } from "./styles";
import { useEffect, useState } from "react";
import { useInfoContext } from "..";
import { Tables } from "../tables";
import { AlbumResponse, ArtistResponse, ITablesSongs, Option, SongResponse } from "../../../utils/interfaces";
import toast from "react-hot-toast";
import api from "../../../services/api";
import Select from "../../../utils/select";

export const Songs = () => {
  const { setHeader, song,header,setSong,selectedSong ,action} = useInfoContext();

  const options = ['Album','Song','Artist','Playlist'];
  const [name,setName] = useState('');
  const [album,setAlbum] = useState<Option[]>([]);
  const [artist,setArtist] = useState<Option[]>([]);
  const[selectedArtist,setSelectedArtist] = useState<Option>();
  const[selectedAlbum,setSelectedAlbum] = useState<Option>();
  

  useEffect(() => {
    setHeader(["Name", "Album","artist"]);
  }, [setHeader]);

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
      setArtist(artists_list);
    }
  }

  function getAlbums(artists:ArtistResponse[]) {
    const local_albums = localStorage.getItem("@Album");
    if(local_albums){
        const parsedAlbums = JSON.parse(local_albums);
        getSongs(parsedAlbums,artists)
        const albums_list:Option[] = [{label:'',value:''}]
       parsedAlbums.map((album:AlbumResponse) => {
        const opt = {label : album.name , value: album["@key"]}
        albums_list.push(opt);
       })

       setAlbum(albums_list)
    }
  }
  
  function getSongs(albums:AlbumResponse[],artists:ArtistResponse[]) {
    options.map((opt: string) => {
      const local_data = localStorage.getItem(`@${opt}`);
      if (local_data) {
        const parsedData = JSON.parse(local_data);
        if (opt === "Song") {
          const newSongs = parsedData.map((data: SongResponse): ITablesSongs => ({
            name: data.name,
            album: albums.find((album) => data.album["@key"] === album["@key"])?.name || "",
            artist : artists.find((artist)=> {
                const album = albums.find((album) => data.album["@key"] === album["@key"])
                if(artist["@key"] === album?.artist["@key"]){
                    return artist
                }
            })?.name || ""
          }));
  
          setSong(newSongs);
        }
      }
    });
  }
  

  useEffect(() => {
    getArtist()
  },[])


  const deleteSong = async ()=>{
    const query = {
        key: {
          "@assetType": "song",
          name:selectedSong.name,
          album : {
            name : selectedSong.album,
            artist:{
                name:selectedSong.artist
            }

          } 
        },
        cascade : true
      }
  
      await api.post('/invoke/deleteAsset',query);
  
  }

  useEffect(() => {
        if(action === 'delete'){
            deleteSong()
        }

        if(action === 'edit'){
            setName(selectedSong.name);
            const artistOfSong = artist.find((artist)=> artist.label === selectedSong.artist)
            setSelectedArtist(artistOfSong);

            const albumOfSong = album.find((alb)=> alb.label === selectedSong.album)
            setSelectedAlbum(albumOfSong);
        }  
  },[selectedSong])


  const handleAddSong = async () => {
    const query = {
      asset: [
        {
          "@assetType": "song",
          name: name,
          album: {
            name: selectedAlbum?.label,
            artist: {
              name: selectedArtist?.label
            }
          }
        }
      ]
    };
  
    try {
      await api.post('/invoke/createAsset', query);
      toast.success("sucess")
    } catch(err) {
      toast.error("error")
    }
  };
  

  const handleEditSong = async ()=> {
    
    const query = {
        update: {
          "@assetType": "song",
          name: selectedSong.name,
          album: {
            name: selectedAlbum?.label,
            artist: {
              name: selectedArtist?.label
            }
          },
          artist: {
            name: selectedArtist?.label
          }
        }
      }

      try{
        await api.post('/invoke/updateAsset', query);
        toast.success("success")
      }
      catch(err){
        toast.error("error")
      }
      
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

      <Select label="Album" options={album} labelStyle={{ paddingBottom: 5 }} 
        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> {
          const album_selected = album.find((alb)=> alb.value === e.target.value)
           setSelectedArtist(album_selected)
        }}
        value={selectedAlbum?.value || ""}
      />

      <Select label="Artist" options={artist} labelStyle={{ paddingBottom: 5 }}
        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> {
          const artist_selected = artist.find((art)=> art.value === e.target.value)
           setSelectedArtist(artist_selected)
        }}
        value={selectedArtist?.value || ""}
      />

      <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
        <Button variant="contained" sx={AddSongButton} onClick={()=> handleAddSong()}>
            Add song
        </Button>
        <Button variant="contained" sx={AddSongButton} onClick={()=>handleEditSong()}>
            Edit song
        </Button>
      </div>
      <Tables content={song } header={header} type="Song"/>
    </Container>
  );
};
