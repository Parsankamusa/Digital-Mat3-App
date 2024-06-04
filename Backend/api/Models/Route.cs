using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Route
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
        public string Location { get; set; } // Assuming location refers to a general area or point of interest
        public List<Matatu> Matatus { get; set; } = new List<Matatu>(); // Collection of Matatu objects associated with this Route
    }

}