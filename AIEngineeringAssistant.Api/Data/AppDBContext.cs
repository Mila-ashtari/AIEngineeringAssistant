using AIEngineeringAssistant.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AIEngineeringAssistant.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Ticket> Tickets { get; set; }
}