import { useEffect, useState } from "react";
import { createContext, useRef} from "react";
import {songsData} from '../assets/assets'


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
const audioRef = useRef(null)
const seekBar = useRef(null)
const seekBg = useRef(null);


const [track,setTrack] = useState(songsData[0]);
const [playStatus,setPlayStatus] = useState(false);
const [time,setTime] = useState({
    currentTime:{
        seconds: 0,
        minute: 0,
    },
    totalTime :{
        seconds:0,
        minute:0
    }
})

useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateSeek = () => {
        if (!audio.duration || !seekBar.current) return;
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.current.style.width = `${progress}%`;
        setTime({
            currentTime: {
                seconds: Math.floor(audio.currentTime % 60),
                minute: Math.floor(audio.currentTime / 60)
            },
            totalTime: {
                seconds: Math.floor(audio.duration % 60),
                minute: Math.floor(audio.duration / 60)
            }
        });
    };

    audio.addEventListener('loadedmetadata', updateSeek);
    audio.addEventListener('timeupdate', updateSeek);

    return () => {
        audio.removeEventListener('loadedmetadata', updateSeek);
        audio.removeEventListener('timeupdate', updateSeek);
    };
}, []);




    const play = ()=> {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)

    }

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;


