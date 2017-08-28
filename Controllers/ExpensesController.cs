using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using test_angular.Data;
using test_angular.Models;

namespace test_angular.Controllers
{
    [Route("api/[controller]")]
    public class ExpensesController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ExpensesController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<Expenditure> Get()
        {
            return _context.Expense.AsEnumerable().Select(expense => new Expenditure{
                Description = expense.Description,
                Amount = expense.Amount,
                Date = expense.Date.ToString("yyyy-mm-dd"),
                Type = expense.Type,
                Id = expense.ID
            });
        }
        [HttpGet("{id}")]
        public Expenditure Get(int? id)
        {
            if (id == null)
            {
                return null;
            }
            var expense =  _context.Expense.SingleOrDefault(m => m.ID == id);
            if (expense == null)
            {
                return null;
            }
            return new Expenditure {
                Description = expense.Description,
                Amount = expense.Amount,
                Date = expense.Date.ToLongDateString(),
                Type = expense.Type,
                Id = expense.ID
            };
        }
        [HttpPost]
        public void Post([FromBody]Expenditure value)
        {
            var expense = new Expense {
                Description = value.Description,
                Amount = value.Amount,
                Date = DateTime.Parse(value.Date),
                Type = value.Type
            };
            _context.Add(expense);
            _context.SaveChanges();
        }
        [HttpPut("{id}")]
        public void Put(int? id, [FromBody]Expenditure value)
        {
            if (id != null)
            {
                var expense =  _context.Expense.SingleOrDefault(m => m.ID == id);
                if (expense != null)
                {
                    expense.Description = value.Description;
                    expense.Amount = value.Amount;
                    expense.Date = DateTime.Parse(value.Date);
                    expense.Type = value.Type;

                    _context.Update(expense);
                    _context.SaveChanges();
                }
            }
        }
        [HttpDelete("{id}")]
        public void Delete(int? id)
        {
            if (id != null)
            {
                var expense =  _context.Expense.SingleOrDefault(m => m.ID == id);
                if (expense != null)
                {
                    _context.Remove(expense);
                    _context.SaveChanges();
                }
            }
        }
        public class Expenditure
        {
            public int Id { get; set; }
            public string Description { get; set; }
            public float Amount { get; set; }
            public string Date { get; set; }
            public string Type { get; set; }
        }
    }
}
