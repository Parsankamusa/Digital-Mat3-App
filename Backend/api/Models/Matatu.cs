using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Matatu
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StreetId { get; set; } // Foreign key for Street
        // Other properties...

        public virtual Street Street { get; set; }
        public int RouteId { get; set; } // Foreign key property
        public Route RouteObj { get; set; }
        public int SaccoNameId { get; set; } // Foreign key property
        public virtual Sacco SaccoName { get; set; } // Assuming there's a direct relationship or identifier for the Sacco
        public DateTime TimeOfOperation { get; set; }
        public decimal Fare { get; set; }
        public int Capacity { get; set; }
        
        // Marking StopsAndDurations as NotMapped since it's a collection used within the application logic
        [NotMapped]
        public List<StopDuration> StopsAndDurations { get; set; } = new List<StopDuration>();
    }

    // StopDuration remains unchanged
    public class StopDuration
    {
        public string Stop { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
