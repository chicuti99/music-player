import { PiMicrophoneStageLight } from "react-icons/pi";
import { BiSolidAlbum } from "react-icons/bi";
import { FaMusic } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import { DivNavigation,Navigation } from "./styles";
import { NavOptions } from "../../../utils/interfaces";

export const Navitagion = ({options,setNavOption}:NavOptions) =>{

    return(
        <Navigation>
            <div style={{display:'flex',gap:25}}>
                <DivNavigation onClick={()=> setNavOption(options[2])}>
                    <PiMicrophoneStageLight/>
                    <span>Artists</span>
                </DivNavigation>

                <DivNavigation onClick={()=> setNavOption(options[0])}>
                    <BiSolidAlbum/>
                    <span>Albums</span>
                </DivNavigation>

                <DivNavigation onClick={()=> setNavOption(options[1])}>
                    <FaMusic/>
                    <span>Songs</span>
                </DivNavigation>

                <DivNavigation onClick={()=> setNavOption(options[3])}>
                    <FaListUl/>
                    <span>Playlists</span>
                </DivNavigation>

                
            </div>
        </Navigation>          
    )
}