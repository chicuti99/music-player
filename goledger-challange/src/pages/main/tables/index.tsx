import { useInfoContext } from ".."
import { ITables, ITablesAlbums, ITablesArtists, ITablesPlaylists, ITablesSongs } from "../../../utils/interfaces";
import { TableContainer, TableStyle } from "./styles";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


export const Tables = ({content, type}: ITables) => {
    const { header, setSelectedAlbum, setSelectedArtist, setSelectedPlaylist, setSelectedSong, setAction } = useInfoContext();
    
    function isAlbum(item: any): item is ITablesAlbums {
        return (item as ITablesAlbums).year !== undefined;
    }
      
    function isPlaylist(item: any): item is ITablesPlaylists {
        return (item as ITablesPlaylists).private !== undefined;
    }
      
    function isSong(item: any): item is ITablesSongs {
        return (item as ITablesSongs).album !== undefined;
    }
      
    function isArtist(item: any): item is ITablesArtists {
        return (item as ITablesArtists).country !== undefined;
    } 

    function selectItem(type: string, item: ITablesAlbums | ITablesArtists | ITablesPlaylists | ITablesSongs) {
        if (isAlbum(item)) {
          setSelectedAlbum(item);
        } else if (isPlaylist(item)) {
            console.log(item)
          setSelectedPlaylist(item);
        } else if (isSong(item)) {
          setSelectedSong(item);
        } else if (isArtist(item)) {
          setSelectedArtist(item);
        }
        setAction(type);
    }

    return(    
        <TableContainer>
            <TableStyle>
                <thead>
                    <tr>
                        {header.map((head, index) => (
                            <th key={index}>{head}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {content.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {header.map((head, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`}>
                                    {(head.toLowerCase() === "songs" || head.toLowerCase() === "Musics") && isPlaylist(item) && (Array.isArray(item.songs) || Array.isArray(item.musics)) ? (
                                        <ul>
                                            {item.songs.map((song, index) => (
                                                <li key={index}>{song}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        item[head.toLowerCase() as keyof typeof item]
                                    )}
                                </td>
                            ))}
                            <td>
                                <MdModeEdit style={{cursor: 'pointer'}} onClick={() => selectItem('edit', item)} /> 
                                <MdDelete style={{cursor: 'pointer'}} color="#b40202" onClick={() => selectItem('delete', item)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableStyle>
        </TableContainer>
    );
};
