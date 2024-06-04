using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Sacco
    {
         public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Matatu> Matatus { get; set; } = new List<Matatu>(); // Assuming a many-to-many relationshipadd 
    }
}