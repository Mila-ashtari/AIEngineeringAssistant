using AIEngineeringAssistant.Api.Data;
using AIEngineeringAssistant.Api.Models;

namespace AIEngineeringAssistant.Api.Services;

public class DBTicketService : ITicketService
{
    private readonly AppDbContext _context;

    public DBTicketService(AppDbContext context)
    {
        _context = context;
    }

    public List<Ticket> GetAll() => _context.Tickets.ToList();

    public Ticket? Get(int id) => _context.Tickets.Find(id);

    public void Add(Ticket ticket)
    {
        _context.Tickets.Add(ticket);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var ticket = Get(id);

        if (ticket is not null)
        {
            _context.Tickets.Remove(ticket);
            _context.SaveChanges();
        }
    }

    public void Update(Ticket ticket)
    {
        _context.Tickets.Update(ticket);
        _context.SaveChanges();
    }
}
