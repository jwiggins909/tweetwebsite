using System;
using System.Dynamic;
using api.Interfaces;
using System.Collections.Generic;
using api.Data;
using api.models;

namespace api.Data
{
    public class PostDataHandler : IPostDataHandler
    {
       private Database db;
        public PostDataHandler()
        {
            db = new Database();
        }
         public List<Post> Select(){
            db.Open();
            string sql = "SELECT * FROM posts order by date desc";           
            List<ExpandoObject> results = db.Select(sql);

            List<Post> post = new List<Post>();
            foreach(dynamic item in results){
                Post temp = new Post(){
                ID = item.id, 
                Posttext = item.posttext, 
                Date = item.date,
                };
            post.Add(temp);
            }
            db.Close();
            return post;
         }
         public void Update(Post post)
         {
            post.Date = DateTime.Now;
            string sql = "UPDATE posts SET posttext=@Posttext, date=@date ";  
            sql+="WHERE id=@id";
            var values = GetValues(post);
            db.Open();
            db.Update(sql, values);
            db.Close();
         }
         public void Delete(Post post)
         { 
            string sql = "DELETE FROM posts WHERE id=@id";
            var values = GetValues(post);
            db.Open();
            db.Update(sql, values);
            db.Close();
         }
         public void Insert(Post post){
            post.Date = DateTime.Now;
            var values = GetValues(post);
            string sql = "INSERT INTO posts(posttext, date)"; 
            sql+="VALUES(@posttext, @date)";
            db.Open();
            db.Insert(sql, values);
            db.Close();
         }

         public Dictionary<string,object> GetValues(Post post)
         {
             var values = new Dictionary<string,object>()
             {
                 {"@id",post.ID},
                 {"@posttext",post.Posttext},
                 {"@date",post.Date},
             };

             return values;
         }
    }
}