const videoFiles = ['test1.mp4', 'test2.mp4'];

export const pickRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videoFiles.length);
  return videoFiles[randomIndex];
};
