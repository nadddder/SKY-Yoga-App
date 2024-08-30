import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Function to retrieve both video and audio URLs from Firebase Storage
export const getMediaSources = async (mediaFile) => {
  const storage = getStorage();
  const videoRef = ref(storage, `Videos/${mediaFile}.mp4`);
  const audioRef = ref(storage, `Audios/${mediaFile}.mp3`);

  try {
    const videoUrl = await getDownloadURL(videoRef);
    const audioUrl = await getDownloadURL(audioRef);
    return {
      videoUri: { uri: videoUrl },
      audioUri: { uri: audioUrl },
    };
  } catch (error) {
    console.error(`Error fetching media ${mediaFile}:`, error);
    return null;
  }
};
