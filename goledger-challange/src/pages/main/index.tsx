import { createContext, useContext, useEffect, useState } from "react";
import { Albums } from "./albums";
import { Navitagion } from "./navigation";
import { Body, Container, Header } from "./styles"
import { InfoContextType, ITablesAlbums, ITablesArtists, ITablesPlaylists, ITablesSongs } from "../../utils/interfaces";
import api, { setBasicAuth } from "../../services/api";
import { Songs } from "./songs";
import { Artist } from "./artists";
import { Playlist } from "./playlists";

const InfoContext = createContext<InfoContextType>({
    header: [],
    setHeader: () => {},
    navOption: "",
    content: [],
    setContent: () => {},
    album: [],
    setAlbum: () => {},
    song: [],
    setSong: () => {},
    artist: [],
    setArtist: () => {},
    playlist: [],
    setPlaylist: () => {},
    
    selectedAlbum: { artist: '', name: '', year: 2000 },
    setSelectedAlbum: () => {},
    selectedSong: { album: '', name: '' ,artist:''},
    setSelectedSong: () => {},
    selectedArtist: { name: '', country: '' },
    setSelectedArtist: () => {},
    selectedPlaylist: { name: '', private: false, songs: [],musics:[] },
    setSelectedPlaylist: () => {},
    setAction: () => {},
    action: '',
  });
  
  


export const Main = () =>{
    const [header,setHeader] = useState<string[]>([]);

    const options = ['Album','Song','Artist','Playlist'];
    const [album, setAlbum] = useState<ITablesAlbums[]>([]);
    const [song, setSong] = useState<ITablesSongs[]>([]);
    const [selectedAlbum,setSelectedAlbum] = useState<ITablesAlbums>({artist:'',name:'',year:2000});
    const [selectedSong,setSelectedSong] = useState<ITablesSongs>({album:'',name:'',artist:''});
    const [selectedArtist,setSelectedArtist] = useState<ITablesArtists>({name:'',country:''});
    const [selectedPlaylist,setSelectedPlaylist] = useState<ITablesPlaylists>({name:'',private:false,songs:[],musics:[]})
    const [artist,setArtist] = useState<ITablesArtists[]>([]);
    const [playlist,setPlaylist] = useState<ITablesPlaylists[]>([]);
    const [navOption,setNavOption] = useState(options[2]);
    const [action,setAction] = useState('')
    const [content,setContent] = useState([{}]);

    const getData = async() => {
        setBasicAuth()
        options.map(async (opt)=> {
            const query =  {
                query: {
                    selector : {
                         "@assetType": `${opt.toLowerCase()}`
                    }
                }
            }

            const response = await api.post('/query/search',query);
            localStorage.setItem(`@${opt}`,JSON.stringify(response.data.result));
        })
    }

    useEffect(()=>{
        return() => {
            getData();
        }
    },[])
    return(
    <InfoContext.Provider
        value={{header,setHeader,navOption,content,setContent,album,setAlbum,song,setSong,artist,
            setArtist,playlist,setPlaylist,selectedAlbum,selectedArtist,selectedPlaylist,selectedSong,
            setSelectedAlbum,setSelectedArtist,setSelectedPlaylist,setSelectedSong,action,setAction}}
    >
            <Container>
            <Header>
                <Navitagion options={options} setNavOption={setNavOption}/>                                
            </Header>
            <Body>
                <h1>{navOption}</h1>
                {navOption === 'Album' && <>
                    <Albums/>
                </>}

                {navOption === 'Artist' && <>
                    <Artist/>
                </>}

                {navOption === 'Song' && <>
                    <Songs/>
                </>}

                {navOption === 'Playlist' && <>
                    <Playlist/>
                </>}
            </Body>
        </Container>
    </InfoContext.Provider>          
    )
}

export const useInfoContext = () => useContext(InfoContext);