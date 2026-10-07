using AIEngineeringAssistant.Api.Models;

namespace AIEngineeringAssistant.Api.Services;

public class TicketService : ITicketService
{
    static List<Ticket> Tickets { get; }

    static int nextId = 3;

    static TicketService()
    {
        Tickets = new List<Ticket>
        {
            new Ticket
            {
                Id = 1,
                Title = "Customer API returns 401",
                Description = "Customer API returns 401 after login.",
                Status = "Open",
                Priority = "High"
            },

            new Ticket
            {
                Id = 2,
                Title = "Database timeout",
                Description = "Report generation times out.",
                Status = "In Progress",
                Priority = "Medium"
            }
        };
    }

    public List<Ticket> GetAll() => Tickets;

    public  Ticket? Get(int id) =>
        Tickets.FirstOrDefault(t => t.Id == id);

    public  void Add(Ticket ticket)
    {
        ticket.Id = nextId++;
        Tickets.Add(ticket);
    }

    public  void Delete(int id)
    {
        var ticket = Get(id);

        if (ticket is null)
            return;

        Tickets.Remove(ticket);
    }

    public  void Update(Ticket ticket)
    {
        var index = Tickets.FindIndex(t => t.Id == ticket.Id);

        if (index == -1)
            return;

        Tickets[index] = ticket;
    }
}
