import { useContext, useEffect, useState } from 'react'
import { AudioContext } from '../../context/AudioContext';
import style from './playbar.module.scss'
import { IconButton, Slider } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import seconsToMMSS from '../../utils/seconsToMMSS';

const TimeControls = () => {
    const [currentTime, setCurrentTime] = useState(0);

    const { audio, currentTrack} = useContext(AudioContext)

    const { duration } = currentTrack;

    const formattedDuration = seconsToMMSS(duration);
    const formattedCurrentTime = seconsToMMSS(currentTime);

    const sliderCurrentTime = Math.round((currentTime / duration) * 100);

    const handleChangeCurrentTime = (_, value) => {
        const time = Math.round(value / 100 * duration);

        setCurrentTime(time);
        audio.currentTime = time;
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 1000)

        return () => {
            clearInterval(timeInterval);
        }
    }, []);

    return (
        <>
            <p>{formattedCurrentTime}</p>
            <Slider step={1} min={0} max={100} value={sliderCurrentTime} onChange={handleChangeCurrentTime} />
            <p>{formattedDuration}</p>
        </>
    )
}

const Playbar = () => {
    const { currentTrack, handleToggleAudio, isPlaying} = useContext(AudioContext);

    const { title, artists, preview } = currentTrack;

    return (
        <div className={style.playbar}>
            <img className={style.preview} src={preview} alt="" />
            <IconButton onClick={() => handleToggleAudio(currentTrack)}>
                {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <div className={style.credits}>
                <h4>{title}</h4>
                <p>{artists}</p>
            </div>
            <div className={style.slider}>
                <TimeControls/>
            </div>
        </div>
    )
}

export default Playbar;