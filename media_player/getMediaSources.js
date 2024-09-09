import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

// Function to retrieve both video and audio URLs from Firebase Storage, with caching
export const getMediaSources = async (mediaFile) => {
  const storage = getStorage();
  const videoRef = ref(storage, `Videos/${mediaFile}.mp4`);
  const audioRef = ref(storage, `Audios/${mediaFile}.m4a`);

  const videoCacheUri = `${FileSystem.documentDirectory}${mediaFile}.mp4`;
  const audioCacheUri = `${FileSystem.documentDirectory}${mediaFile}.m4a`;

  let videoUri = null;
  let audioUri = null;

  try {
    // Check if video is cached locally
    const videoInfo = await FileSystem.getInfoAsync(videoCacheUri);
    if (videoInfo.exists) {
      videoUri = { uri: videoCacheUri };
    } else {
      // Download and cache the video
      const videoUrl = await getDownloadURL(videoRef);
      const downloadVideo = await FileSystem.downloadAsync(videoUrl, videoCacheUri);
      videoUri = { uri: downloadVideo.uri };
    }
  } catch (error) {
    console.error(`Failed to load video for ${mediaFile}: ${error.message}`);
  }

  try {
    // Check if audio is cached locally
    const audioInfo = await FileSystem.getInfoAsync(audioCacheUri);
    if (audioInfo.exists) {
      audioUri = { uri: audioCacheUri };
    } else {
      // Download and cache the audio
      const audioUrl = await getDownloadURL(audioRef);
      const downloadAudio = await FileSystem.downloadAsync(audioUrl, audioCacheUri);
      audioUri = { uri: downloadAudio.uri };
    }

    // Load the audio into the player
    const audio = new Audio.Sound();
    await audio.loadAsync({ uri: audioUri.uri }, { shouldPlay: false });
  } catch (error) {
    console.error(`Failed to load audio for ${mediaFile}: ${error.message}`);
  }

  return { videoUri, audioUri };
};

// Function to remove cached media after it's done playing
export const removeCachedMedia = async (mediaFile) => {
  const videoCacheUri = `${FileSystem.documentDirectory}${mediaFile}.mp4`;
  const audioCacheUri = `${FileSystem.documentDirectory}${mediaFile}.m4a`;

  try {
    await FileSystem.deleteAsync(videoCacheUri, { idempotent: true });
    await FileSystem.deleteAsync(audioCacheUri, { idempotent: true });
  } catch (error) {
    console.error(`Failed to remove cached media for ${mediaFile}: ${error.message}`);
  }
};

// Function to remove all cached media files at once
export const removeAllCachedMedia = async (mediaFiles) => {
  try {
    const deletePromises = mediaFiles.map(async (mediaFile) => {
      const videoCacheUri = `${FileSystem.documentDirectory}${mediaFile}.mp4`;
      const audioCacheUri = `${FileSystem.documentDirectory}${mediaFile}.m4a`;
      return Promise.all([
        FileSystem.deleteAsync(videoCacheUri, { idempotent: true }),
        FileSystem.deleteAsync(audioCacheUri, { idempotent: true })
      ]);
    });

    await Promise.all(deletePromises);
    console.log("Successfully removed all cached media files.");
  } catch (error) {
    console.error(`Failed to remove all cached media files: ${error.message}`);
  }
};
