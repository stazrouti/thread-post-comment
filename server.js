const fs = require('fs');

const { getAllMedia } = require('./media');

const downloadMedia = async (media, i = 0) => {
  i++;
  if (media.length == 0) {
    return;
  }

  return await downloadMedia(media, i);
};



(async () => {
  
  
  const POST_URL = "post url here";
  

  
  let postData = await getAllMedia(POST_URL);

})();
