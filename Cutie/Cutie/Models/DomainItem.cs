using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cutie.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string Location { get; set; }
        public string Photo { get; set; }
        public string Tag { get; set; }
        public int UserId { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }


    }
}