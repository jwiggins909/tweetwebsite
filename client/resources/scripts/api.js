const baseUrl = "https://localhost:5001/api/post";
var postList = [];
var myPost = {};

function getPosts(){

    const allPostsApiUrl = baseUrl;
    fetch(allPostsApiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        postList = json;
        let html = "<select class = \"posts\" onchange = \"handleOnChange()\" id= \"selectposts\" name = \"posts\" size=10 width=\"100%\">";
        json.forEach((post)=>{
            html += "<option value = " + post.id  + ">" + post.posttext + "</option>";
        })
        html += "</select>";
        document.getElementById("posts").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}
//method that creates an object from the post data and calls the back end and sends the object across to save the post 
function putPost(id){
    const putPostApiUrl = baseUrl + "/"+id;
    const sendPost = {
        id: id,
        postText: document.getElementById("posttext").value
    }
    fetch(putPostApiUrl, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(sendPost)
    })
    .then((response)=>{
        myPost = sendPost;
        getPosts();
        populateForm();
    });
}
//method that allows you to save a new post that didn't exist before
function postTweet(){
    const postTweetApiUrl = baseUrl;
    const sendPost = {
        postText: document.getElementById("posttext").value,
    }
    fetch(postTweetApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(sendPost)
    })
    .then((response)=>{
        myPost = sendPost;
        getPosts();
        blankFields();
    });
}
//method that takes the post id and sends it across to the back end and deletes the data out of the database for the post that has that id
function deleteTweet(){
    const deletePostApiUrl = baseUrl + "/" + myPost.id;
    fetch(deletePostApiUrl, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
    })
    .then((response)=>{
        blankFields();
        getPosts();
    });
}
