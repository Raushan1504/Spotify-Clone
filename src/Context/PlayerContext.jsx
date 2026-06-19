
import { createContext, useRef} from "react";
 export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
const audioRef = useRef()
const seekBar = useRef()
const seekBg = useRef();

    const contextValue = {
        audioRef,
        seekBar,
        seekBg
        

    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;


