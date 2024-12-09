import { Button } from "@mui/material";
import Input from "../../../utils/Button/Input";
import { AddPlaylistButton, Container } from "./styles";
import { useEffect, useState } from "react";
import { useInfoContext } from "..";
import { Tables } from "../tables";
import { AlbumAPI, ArtistResponse, ITablesPlaylists, ITablesSongs, Option, PlaylistResponse, SongResponse } from "../../../utils/interfaces";
import toast from "react-hot-toast";
import api from "../../../services/api";
import Select from "../../../utils/select";

export const Playlist = () => {
  const { setHeader, header,playlist,setPlaylist,selectedPlaylist,action } = useInfoContext();

  const options = ['Album','Song','Artist','Playlist'];
  const [name,setName] = useState('');
  const [album,setAlbum] = useState('');
  const [songsList,setSongList] = useState<Option[]>([])
  const[selectedSongs,setSelectedSongs] = useState<Option>()
  const[listOfSelectedSongs,setListOfSelectedSongs] = useState<Option[]>([])
  const [artists,setArtists] = useState<ArtistResponse[]>([])
  const[albums,setAlbums] = useState<AlbumAPI[]>([])
  const[storedSongs,setStoredSongs] = useState<SongResponse[]>([])
  

  useEffect(() => {
    setHeader(["Name", "Songs"]);
  }, [setHeader]);

  function getAlbumsAndArtists() {
    const local_artists = localStorage.getItem("@Artist");
    const local_album = localStorage.getItem("@Album");

    if(local_album){
      const parsedAlbums = JSON.parse(local_album);
      setAlbums(parsedAlbums);
    }

    if(local_artists){
      const parsedArtist = JSON.parse(local_artists);
      setArtists(parsedArtist);
    }
  }
  function getArtist(){
    const local_songs = localStorage.getItem("@Song");
    if(local_songs){
      const parsedSongs = JSON.parse(local_songs);
      setStoredSongs(parsedSongs);
      const songs:Option[] = [{label:'',value:''}]
      parsedSongs.map((song:SongResponse) => {
        const opt = {label:song.name,value:song["@key"]}
        songs.push(opt)
      })

      setSongList(songs)
    }
    
  }

  function getPlaylist() {
    options.map((opt: string) => {
      const local_data = localStorage.getItem(`@${opt}`);
      if (local_data) {
        const parsedData = JSON.parse(local_data);
        if (opt === "Playlist") {
          const newPlaylist = parsedData.map((data: PlaylistResponse): ITablesPlaylists => ({
            name: data.name,
            private: data.private,
            songs: []
          }));
  
          setPlaylist(newPlaylist);
        }
      }
    });
  }
  

  useEffect(() => {
    getPlaylist();
    getArtist()
    getAlbumsAndArtists()
  },[])

  const deletePlaylist = async ()=>  {
    
    const query = {
        key: {
            "@assetType": "playlist",
            name:"selectedPlaylist.name"
        }
    }

  await api.post('/invoke/deleteAsset',query);

}

  useEffect(() => {
        return () => {
            if(action === 'delete'){
                deletePlaylist()
            }
        }        
  },[selectedPlaylist])


  const handleAddPlaylist = async ()=> {
    console.clear();
    console.log(albums,artists,storedSongs)
    
  }

  const handleAddSong = ()=> {
    
    if(selectedSongs){
      const actualList = listOfSelectedSongs;

      actualList.push()
    }
  }
  
  useEffect(()=> {
    console.log(listOfSelectedSongs)
  },[listOfSelectedSongs])
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
        label="Private"
        containerStyle={{ width: "100%", height: 40, border: "1px solid #E4E4E7" }}
        labelStyle={{ paddingBottom: 5 }}
        onChange={(e) =>setAlbum(e.target.value)}
        value={album}
      />

      <Select label="musicas" options={songsList} labelStyle={{ paddingBottom: 5 }}
        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> {
          const artist_selected = songsList.find((song)=> song.value === e.target.value)
           setSelectedSongs(artist_selected);
           
        }}
        value={selectedSongs?.value || ""}
      />

      <div style={{width:'100%',display:"flex",justifyContent:'space-between'}}>
        <Button variant="contained" sx={AddPlaylistButton} onClick={handleAddPlaylist}>
          Add Playlist
        </Button>
        <Button variant="contained" sx={AddPlaylistButton} onClick={handleAddSong}>
          Add music
        </Button>
        
        <Button variant="contained" sx={AddPlaylistButton} onClick={handleAddPlaylist}>
          Edit Playlist
        </Button>
      </div>
      <Tables content={playlist } header={header} type="Playlist"/>
    </Container>
  );
};
