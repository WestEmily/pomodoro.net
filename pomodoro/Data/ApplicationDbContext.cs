using Microsoft.EntityFrameworkCore;
using pomodoro.Models.DTO;

namespace pomodoro.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Affirmation> Affirmations { get; set; }
    }
}
