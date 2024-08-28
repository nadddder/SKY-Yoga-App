import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Function to retrieve the video URL from Firebase Storage
export const getVideoSource = async (videoFile) => {
  const storage = getStorage();
  const videoRef = ref(storage, `${videoFile}.mp4`);

  try {
    const url = await getDownloadURL(videoRef);
    return { uri: url };
  } catch (error) {
    console.error(`Error fetching video ${videoFile}:`, error);
    return null;
  }
};
