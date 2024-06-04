using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Matatu> Matatus { get; set; }
        public DbSet<Sacco> Saccos { get; set; }
        public DbSet<Street> Streets { get; set; }
        public DbSet<api.Models.Route> Routes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary keys
            modelBuilder.Entity<Matatu>().HasKey(m => m.Id);
            modelBuilder.Entity<Sacco>().HasKey(s => s.Id);
            modelBuilder.Entity<Street>().HasKey(s => s.Id);
            modelBuilder.Entity<api.Models.Route>().HasKey(r => r.Id);

            // Keyless entity configuration
            modelBuilder.Entity<StopDuration>().HasNoKey();

            // Relationships
            modelBuilder.Entity<Sacco>()
              .HasMany(s => s.Matatus)
              .WithOne(m => m.SaccoName)
              .HasForeignKey(m => m.SaccoNameId);

            modelBuilder.Entity<Street>()
              .HasMany(s => s.Matatus)
              .WithOne(m => m.Street)
              .HasForeignKey(m => m.StreetId);

            modelBuilder.Entity<api.Models.Route>()
               .HasMany(r => r.Matatus)
               .WithOne(m => m.RouteObj)
               .HasForeignKey(m => m.RouteId);
        }
    }
}
