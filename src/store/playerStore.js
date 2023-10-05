import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  audio: null,
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  currentTime: 0,
  setAudio: (audio) => {
    set({ audio });
  },
  setVolume: (volume) => {
    set((state) => {
      state.audio.volume = volume;
      return { volume };
    });
  },
  setIsPlaying: (isPlaying) => {
    set((state) => {
      if (state.audio.src === "") return { isPlaying: false };
      if (isPlaying) {
        state.audio.play();
      } else {
        state.audio.pause();
      }
      return { isPlaying };
    });
  },
  setCurrentTime: (currentTime) => {
    set({ currentTime });
  },
  setCurrentMusic: (currentMusic) => {
    set((state) => {
      const { song, playlist } = currentMusic;
      if (song) {
        const src = `/music/${playlist?.id}/0${song.id}.mp3`;
        state.audio.src = src;
        state.setIsPlaying(true);
      }
      return { currentMusic };
    });
  },
}));
