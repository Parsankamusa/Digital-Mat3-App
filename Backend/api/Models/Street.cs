using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Street
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
        public List<Matatu> Matatus { get; set; } = new List<Matatu>(); // Assuming a many-to-many relationship
    }
}