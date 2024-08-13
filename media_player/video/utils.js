export const getVideoSource = (videoFile) => {
    switch (videoFile) {
      case 'test1.mp4':
        return require('../../assets/videos/test1.mp4');
      case 'test2.mp4':
        return require('../../assets/videos/test2.mp4');
      case 'test3.mp4':
        return require('../../assets/videos/test3.mp4');
      default:
        return require('../../assets/videos/test1.mp4');
    }
  };
  