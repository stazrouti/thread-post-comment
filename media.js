const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const getPostData = async (id) => {
  let request = await fetch("https://www.threads.net/api/graphql", {
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "x-asbd-id": "129477",
      "x-fb-friendly-name": "BarcelonaPostPageQuery",
      "x-fb-lsd": "N1RcROyvW2TeIOAP1NF1Rw",
      "x-ig-app-id": "238260118697367",
    },
    "body": new URLSearchParams({
      lsd: "N1RcROyvW2TeIOAP1NF1Rw",
      variables: `{"postID":"${id}"}`,
      doc_id: 5587632691339264
    }),
    "method": "POST"
  });
  let response = await request.json();
  let allMediaString = JSON.stringify(response);
  
  let Comment = await getComment(allMediaString);
  let Commentf = JSON.stringify(Comment[0]);
  let Post_User = JSON.stringify(Comment[1]);



  /* console.log("posrdata:",response); */
  return response;
};
const getComment = async (data) => {
    const response = JSON.parse(data);
    let Arn='';
  
    const Post_Pic = response.data.data.containing_thread.thread_items[0].post.image_versions2.candidates[1].url;
    const Post_User = response.data.data.containing_thread.thread_items[0].post.user.username;
    const replyThreads = response.data.data.reply_threads;
  
    if (replyThreads) {
      const comments = replyThreads.flatMap((thread) =>
        thread.thread_items.map((threadItem) => ({
            
          profilePicUrl: threadItem.post.user.profile_pic_url,
          username: threadItem.post.user.username,
          text: threadItem.post.caption &&  threadItem.post.caption.text !== undefined ? threadItem.post.caption.text : 'no Text',
          like_count:threadItem.post.like_count,
        }))
      );

      comments.forEach((comment) => {
          
        if(comment.username=="aboyoussef12k"){
            Arn=comment.text;
        }
        console.log("Profile Pic URL:", comment.profilePicUrl);
        console.log("Username:", comment.username);
        console.log("Text:", comment.text);
        console.log("Like:", comment.like_count);
        console.log("-------------------------");
        
      });
      

    } else {
      console.log("No reply threads found.");
    }
  
    return [Post_Pic, Post_User];
  };
  
  
  

const getPostId = async (url) => {
  let request = await fetch(url);
  let response = await request.text();
  let postId = response.match(/{"post_id":"(.*?)"}/);
  
  return postId[1];
};

const getAllMedia = async (url) => {
  let postId = await getPostId(url);
  let postData = await getPostData(postId);
  
  return null;
};



module.exports = { getAllMedia }