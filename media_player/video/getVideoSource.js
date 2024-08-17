export const getVideoSource = (videoFile) => {
    switch (videoFile) {
        case 'test1':
            return require('../../assets/videos/test1.mp4');
        case 'test2':
            return require('../../assets/videos/test2.mp4');
        default:
            console.warn(`Video file ${videoFile} not found.`);
            return null;
    }
};
