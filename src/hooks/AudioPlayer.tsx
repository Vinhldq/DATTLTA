import { useEffect, useState } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { Track } from "../types";

export const AudioPlayer = (track : Track | null | undefined) => {
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false); // State for looping status
  const [duration, setDuration] = useState(0); // Duration in milliseconds
  const [position, setPosition] = useState(0); // Current playback position in milliseconds
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    if (track?.audio_file) {
      playTrack();
    }
  }, [track]);


  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    if (!track?.audio_file) {
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.audio_file,
    });

    setSound(newSound);

    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    //Looping
    await newSound.setIsLoopingAsync(true);
    await newSound.playAsync();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    // Set the duration when it's available (i.e., when the sound is loaded)
    if (status.durationMillis) {
      setDuration(status.durationMillis); // Set the duration
    }

    setPosition(status.positionMillis); // Update current position

    if (status.didJustFinish) {
      setIsPlaying(false); // Set to false when the song finishes
    }

    setIsPlaying(status.isPlaying);
  };

  const onPlayPause = async () => {
    if (!sound) {
      return null;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1); // Wrap around to the start
    setCurrentTrackIndex(nextIndex);
  };

  const playPreviousTrack = () => {
    const prevIndex = (currentTrackIndex - 1); // Wrap around to the end
    setCurrentTrackIndex?.(prevIndex);
  };


  // Toggle looping on or off
  const toggleLooping = async () => {
    if (sound) {
      const newLoopingStatus = !isLooping;
      setIsLooping(newLoopingStatus); // Update the state
      await sound.setIsLoopingAsync(newLoopingStatus); // Apply to the sound object
    }
  };

  // Helper function to format time (mm:ss)
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return {
    sound,
    isPlaying,
    duration,
    position,
    isLooping,
    onPlayPause,
    toggleLooping,
    formatTime,
    playTrack,
    playNextTrack,
    playPreviousTrack
  };
};
