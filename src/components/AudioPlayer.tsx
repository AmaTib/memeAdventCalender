import { useRef, useState } from "react";
import "../styles/AudioPlayer.css";

export const AudioPLayer = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(
      "/christmas-jazz-christmas-holiday-347485.mp3"
    );
  }

  function toggleMusic() {
    if (!audioRef.current) return;

    if (!musicPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setMusicPlaying(!musicPlaying);
  }

  return (
    <>
      <section>
        <p>Kom i julstämning</p>
        <img
          className="audioplayerImg"
          onClick={toggleMusic}
          src={musicPlaying ? "/icons8-pause-100.png" : "/icons8-play-100.png"}
          alt="play/pause"
        />
        {musicPlaying && (
          <img
            className="audioplayerImg"
            src="/santa-dance-christmas-music.gif"
            alt="dancing santa"
          />
        )}
      </section>
    </>
  );
};
