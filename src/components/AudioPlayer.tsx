import { useRef, useState } from "react";

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
      <p>Kom i julstämning</p>
      <button onClick={toggleMusic}>{musicPlaying ? "pause" : "play"}</button>
    </>
  );
};
