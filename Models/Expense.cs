using System;
using System.ComponentModel.DataAnnotations;

namespace test_angular.Models
{
    public class Expense
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public float Amount { get; set; }
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Date { get; set; }
        public string Type { get; set; }
    }
}
