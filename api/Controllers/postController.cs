using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class postController : ControllerBase
    {
        // GET: api/post
        [EnableCors("OtherPolicy")]
        [HttpGet]
        public List<Post> Get()
        {
            IPostDataHandler dataHandler = new PostDataHandler();
            return dataHandler.Select();
        }

        // GET: api/post/5

        [EnableCors("OtherPolicy")]

        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/post
        [EnableCors("OtherPolicy")]
        [HttpPost]
        public void Post([FromBody] Post value)
        {
            value.dataHandler.Insert(value);
        }

        // PUT: api/post/5
        [EnableCors("OtherPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Post value)
        {
            System.Console.WriteLine("Get FirstName");
            value.dataHandler.Update(value);
        }

        // DELETE: api/post/5
        [EnableCors("OtherPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Post value = new Post(){ID=id};
            value.dataHandler.Delete(value);
        }
    }
}