import { useEffect, useState } from "react";
import { createContext, useRef} from "react";
import {songsData} from '../assets/assets'


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
const audioRef = useRef()
const seekBar = useRef()
const seekBg = useRef();


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

        
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)

    }
    const playWithId = async (id)=>{
       await setTrack(songsData[id])
       await audioRef.current.play()
       setPlayStatus(true)
    }

    const previous = async () => {
        if (track && track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next = async () => {
        if (track && track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,
        next
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;


