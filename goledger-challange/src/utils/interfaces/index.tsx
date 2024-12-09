import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; 
    maxlength?: number;
    icon?: React.ReactNode;
    fontSize?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
  }

export interface User {
  username: string;
  password:string
}

export interface IsPrivate {
  isPrivate:boolean
}

export interface NavOptions {
  options: string[];
  setNavOption : React.Dispatch<React.SetStateAction<string>>;
}

export interface ITablesAlbums {
  name: string;
  year:number;
  artist : string
}
export interface AlbumResponse {
  "@assetType": string;
  "@key": string;       
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  artist: {
    "@assetType": string;
    "@key": string;
  };
  name: string;         
  year: number;
}

export interface SongResponse 
  {
    "@assetType": string;
    "@key": string,
    "@lastTouchBy": string,
    "@lastTx": string,
    "@lastUpdated": string,
    album: {
        "@assetType": string,
        "@key": string
    },
    name: string
}

export interface ArtistResponse 
  {
    "@assetType": string;
    "@key": string,
    "@lastTouchBy": string,
    "@lastTx": string,
    "@lastUpdated": string,
    country:string, 
    name: string
}


export interface PlaylistResponse 
  {
    "@assetType": string;
    "@key": string,
    "@lastTouchBy": string,
    "@lastTx": string,
    "@lastUpdated": string, 
    name: string,
    private:boolean,
    songs : [
      {
        "@key" : string
      }
    ]
}

export interface ITablesSongs {
  name: string;
  album:string;
  artist:string
}

export interface ITablesPlaylists {
  name: string;
  songs:string[];
  private:boolean;
}

export interface ITablesArtists {
  name: string;
  country:string;
}

export interface ITables {
  // Title?: string;
  // Artist?:string;
  // Year?:string;
  // Actions?:string;
  // Description?:string;
  // Genre?:string;
  // Album?:string;
  // Duration?:string;
  header:string[];
  content: ITablesAlbums[] | ITablesArtists[] | ITablesPlaylists[] |ITablesSongs[];
  type:string;
}

export interface InfoContextType {
  header: string[];
  setHeader: React.Dispatch<React.SetStateAction<string[]>>;
  navOption: string;
  content: {}[];
  setContent: React.Dispatch<React.SetStateAction<{}[]>>;
  album: ITablesAlbums[];
  setAlbum: React.Dispatch<React.SetStateAction<ITablesAlbums[]>>;
  song: ITablesSongs[];
  setSong: React.Dispatch<React.SetStateAction<ITablesSongs[]>>;
  artist: ITablesArtists[];
  setArtist: React.Dispatch<React.SetStateAction<ITablesArtists[]>>;
  playlist: ITablesPlaylists[];
  setPlaylist: React.Dispatch<React.SetStateAction<ITablesPlaylists[]>>;
  
  selectedAlbum: ITablesAlbums;
  setSelectedAlbum: React.Dispatch<React.SetStateAction<ITablesAlbums>>;
  selectedSong: ITablesSongs;
  setSelectedSong: React.Dispatch<React.SetStateAction<ITablesSongs>>;
  selectedArtist: ITablesArtists;
  setSelectedArtist: React.Dispatch<React.SetStateAction<ITablesArtists>>;
  selectedPlaylist: ITablesPlaylists;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<ITablesPlaylists>>;

  setAction:React.Dispatch<React.SetStateAction<string>>;
  action: string;
}

export interface AlbumAPI {
  assetType: string
}

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: Option[];
  icon?: JSX.Element;
  fontSize?: string;
  containerStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  [key: string]: any; // Para suportar atributos adicionais como `onChange`, `value`, etc.
}