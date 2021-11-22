//method used to populate the list box on the html page
function handleOnLoad(){
    getPosts();
}
//method that gets the id of the post that's been selected and looks through the list for the post that has the same id and uses it to populate the form
function handleOnChange(){
    const selectedId = document.getElementById("selectposts").value;
    postList.forEach((post)=>{
        if(post.id == selectedId){
            myPost = post;
        }
    });

    populateForm();
}
//method that activates the edit button, calls the makeEditable() method allowing the user to edit the post fields, and calls the hideButtons() method which replaces the new, edit, and delete buttons with the save and cancel button
function handleEditClick(){
    makeEditable();
    hideButtons();
    var buttonHtml = "<button class=\"btn btn-primary btn-lg\" onclick=\"handleEditSave("+myPost.id+")\">Save</button>"
    buttonHtml += "<button class=\"btn btn-warning btn-lg btn-cancel\" onclick=\"handleCancelSave()\">Cancel</button>"
    document.getElementById("saveButton").innerHTML = buttonHtml;
    document.getElementById("saveButton").style.display = "inline-block";
}
//method that activates the new button allowing the user to create a new post by 
function handleNewClick(){
    makeEditable();
    hideButtons();
    blankFields();
    var buttonHtml = "<button class=\"btn btn-primary btn-lg\" onclick=\"handleNewSave()\">Save</button>"
    buttonHtml += "<button class=\"btn btn-warning btn-lg btn-cancel\" onclick=\"handleCancelSave()\">Cancel</button>"
    document.getElementById("saveButton").innerHTML = buttonHtml;
    document.getElementById("saveButton").style.display = "inline-block";
}
//method that activates the delete button and allows the user to delete a post by calling the deleteTweet() method
function handleDeleteClick(){
    deleteTweet();
}
//method that cancels the save by putting the data back on the form, making the data read-only, and showing the new, edit, and delete buttons
function handleCancelSave(){
    populateForm();
    makeReadOnly();
    showButtons();
}
//method that saves for an edit by calling the putPost() method and passing the id, making the fields read-only, and showing the new, edit, and delete buttons 
function handleEditSave(id){
    putPost(id);
    makeReadOnly();
    showButtons();
}
// method that saves for a new post by calling the postPost() method, making the fields read-only, showing the new, edit, and delete buttons, and blanking out the fields 
function handleNewSave(){
    postTweet();
    makeReadOnly();
    showButtons();
    blankFields();
}



//method that populates the form with the posttext data
function populateForm(){
    document.getElementById("posttext").value = myPost.posttext;
}
//method that hides the buttons by setting the display for each button to none
function hideButtons(){
    document.getElementById("newButton").style.display = "none";
    document.getElementById("editButton").style.display = "none";
    document.getElementById("deleteButton").style.display = "none";
}
//method that displays the buttons
function showButtons(){
    document.getElementById("newButton").style.display = "inline-block";
    document.getElementById("editButton").style.display = "inline-block";
    document.getElementById("deleteButton").style.display = "inline-block";
    document.getElementById("saveButton").style.display = "none";
}
// method that makes the fields editable by setting the readOnly property to false
function makeEditable(){
    postText = document.getElementById("posttext").readOnly=false;
}
// method that blanks out the fields by setting the value of each field to blank
function blankFields(){
    document.getElementById("posttext").value = "";
}
//method that sets the fields to read-only
function makeReadOnly(){
    postText = document.getElementById("posttext").readOnly=true;
}