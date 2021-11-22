using System;
using api.Interfaces;
using api.Data;

namespace api.models
{
    public class Post
    {
        public int ID{get; set;}
        public string Posttext {get; set;}
        public DateTime Date {get; set;}
        public IPostDataHandler dataHandler{get; set;}

        public Post(){
            dataHandler = new PostDataHandler();
        }
    }
}