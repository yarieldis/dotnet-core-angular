using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace test_angular.Controllers
{
    [Route("api/[controller]")]
    public class ExpensesController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private static string[] Types = new[]
        {
            "Leisure", "Insurance", "Education", "Medical"
        };

        [HttpGet]
        public IEnumerable<Expenditure> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Expenditure
            {
                Description = Summaries[rng.Next(Summaries.Length)],
                Amount = rng.Next(10, 550),
                Date = DateTime.Now.AddDays(index).ToString("d"),
                Type = Types[rng.Next(Types.Length)]
            });
        }

        [HttpGet("{id}")]
        public Expenditure Get(int id)
        {
            return null;
        }

        [HttpPost]
        public void Post([FromBody]Expenditure value)
        {

        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Expenditure value)
        {

        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            
        }

        public class Expenditure
        {
            public string Description { get; set; }
            public int Amount { get; set; }
            public string Date { get; set; }
            public string Type { get; set; }
        }
    }
}
