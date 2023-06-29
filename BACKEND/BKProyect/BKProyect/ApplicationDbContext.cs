using Microsoft.EntityFrameworkCore;

namespace BKProyect.Models
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {

        }

        public DbSet<TarjetaCredito> TarjetaDeCredito { get; set; }
    }
}
