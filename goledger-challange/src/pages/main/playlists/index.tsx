import { Button, Checkbox } from "@mui/material";
import Input from "../../../utils/Button/Input";
import { AddMusicButton, AddPlaylistButton, Container, DeleteMusicButton } from "./styles";
import { useEffect, useState } from "react";
import { useInfoContext } from "..";
import { Tables } from "../tables";
import { AlbumAPI, AlbumResponse, ArtistResponse, ITablesPlaylists, ITablesSongs, Option, PlaylistResponse, SongResponse } from "../../../utils/interfaces";
import toast from "react-hot-toast";
import api from "../../../services/api";
import Select from "../../../utils/select";

export const Playlist = () => {
  const { setHeader, header, playlist, setPlaylist, selectedPlaylist, action } = useInfoContext();

  const options = ['Album', 'Song', 'Artist', 'Playlist'];
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [songsList, setSongList] = useState<Option[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<Option>();
  const [listOfSelectedSongs, setListOfSelectedSongs] = useState<Option[]>([]);
  const [artists, setArtists] = useState<ArtistResponse[]>([]);
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const [storedSongs, setStoredSongs] = useState<SongResponse[]>([]);
  const[isPrivate,setIsPrivate] = useState(false)

  useEffect(() => {
    setHeader(["Name", "Songs"]);
  }, [setHeader]);

  function getAlbumsAndArtists() {
    const local_artists = localStorage.getItem("@Artist");
    const local_album = localStorage.getItem("@Album");

    if (local_album) {
      const parsedAlbums = JSON.parse(local_album);
      setAlbums(parsedAlbums);
    }

    if (local_artists) {
      const parsedArtist = JSON.parse(local_artists);
      setArtists(parsedArtist);
    }
  }

  function getArtist() {
    const local_songs = localStorage.getItem("@Song");
    if (local_songs) {
      const parsedSongs = JSON.parse(local_songs);
      setStoredSongs(parsedSongs);
      const songs: Option[] = [{ label: '', value: '' }];
      parsedSongs.map((song: SongResponse) => {
        const opt = { label: song.name, value: song.album["@key"] };
        songs.push(opt);
      });

      setSongList(songs);
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
    getArtist();
    getAlbumsAndArtists();
  }, []);

  const deletePlaylist = async () => {
    const query = {
      key: {
        "@assetType": "playlist",
        name: selectedPlaylist.name
      }
    };

    await api.post('/invoke/deleteAsset', query);
  };

  useEffect(() => {
      if (action === 'delete') {
        deletePlaylist();
      }

      console.log(selectedPlaylist)
    
  }, [selectedPlaylist]);

  const handleAddPlaylist = async () => {
    const playlistToSend = {
      asset: [
        {
          "@assetType": "playlist",
          "name": name,
          "private": isPrivate,
          "songs": listOfSelectedSongs.map((song) => {
            const album = albums.find((a) => a["@key"] === song.value);
            const artistKey = album?.artist["@key"];
            const artistName = artists.find((artist) => artist["@key"] === artistKey)?.name || "";
  
            return {
              "name": song.label,
              "album": {
                "name": album?.name || "",
                "artist": {
                  "name": artistName,
                },
              },
            };
          }),
        },
      ],
    };
  
    try {
      await api.post('/invoke/createAsset', playlistToSend);
      toast.success("Playlist added successfully!");
    } catch (error) {
      console.log(albums, listOfSelectedSongs);
      toast.error("Error adding playlist.");
    }
  };

  const generateUpdateBody = () => {
    return {
      update: {
        "@assetType": "playlist",
        name: "Testando 232",
        private: isPrivate,
        songs: listOfSelectedSongs.map((song) => ({
          "@assetType": "song",
          "@key": song.value, // A chave da música está em `value`
        })),
      },
    };
  };
  
  const handleUpdatePlaylist = async () => {
    const bodyToSend = generateUpdateBody();
  
    try {
      await api.post('/invoke/updateAsset', bodyToSend);
      toast.success("Playlist updated successfully!");
    } catch (error) {
      console.log("Error updating playlist:", error);
      toast.error("Failed to update playlist.");
    }
  };
  
  

  const handleAddSong = () => {
    if (selectedSongs) {
      const actualList = [...listOfSelectedSongs]; 
      const songToAdd = { label: selectedSongs.label, value: selectedSongs.value };

      if (!actualList.some(song => song.value === songToAdd.value)) {
        actualList.push(songToAdd); 
        setListOfSelectedSongs(actualList);
      }
    }
  };


  return (
    <Container>
      <Input
        label="Name"
        containerStyle={{ width: "100%", height: 40, border: "1px solid #E4E4E7" }}
        labelStyle={{ paddingBottom: 5 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Select
        label="available musics"
        options={songsList}
        labelStyle={{ paddingBottom: 5 }}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const song_selected = songsList.find((song) => song.value === e.target.value);
          setSelectedSongs(song_selected);
        }}
        value={selectedSongs?.value || ""}
      />

      <Select
        label="current musics"
        options={songsList}
        labelStyle={{ paddingBottom: 5 }}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const song_selected = songsList.find((song) => song.value === e.target.value);
          setSelectedSongs(song_selected);
        }}
        value={selectedSongs?.value || ""}
      />

    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        checked={isPrivate}
        onChange={() => setIsPrivate(!isPrivate)}
        color="primary"
      />
      <span>Privado</span>
    </div>
    
      <div style={{ width: '100%', display: "flex", justifyContent: 'space-between' }}>
        <Button variant="contained" sx={AddPlaylistButton} onClick={handleAddPlaylist}>
          Add Playlist
        </Button>
        <Button variant="contained" sx={AddMusicButton} onClick={handleAddSong}>
          Add music
        </Button>

        <Button variant="contained" sx={DeleteMusicButton} onClick={handleUpdatePlaylist}>
          Delete music
        </Button>

        <Button variant="contained" sx={AddPlaylistButton} onClick={handleUpdatePlaylist}>
          Edit Playlist
        </Button>
      </div>
      <Tables content={playlist} header={header} type="Playlist" />
    </Container>
  );
};
