import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Function to retrieve both video and audio URLs from Firebase Storage
export const getMediaSources = async (mediaFile) => {
  const storage = getStorage();
  const videoRef = ref(storage, `Videos/${mediaFile}.mp4`);
  const audioRef = ref(storage, `Audios/${mediaFile}.m4a`);

  let videoUri = null;
  let audioUri = null;

  try {
    const videoUrl = await getDownloadURL(videoRef);
    videoUri = { uri: videoUrl };
  } catch (error) {
    console.error(`Video not found for ${mediaFile}:`, error.message);
  }

  try {
    const audioUrl = await getDownloadURL(audioRef);
    audioUri = { uri: audioUrl };
  } catch (error) {
    console.error(`Audio not found for ${mediaFile}:`, error.message);
  }

  return { videoUri, audioUri };
};
