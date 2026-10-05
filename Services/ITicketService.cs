using AIEngineeringAssistant.Api.Models;

namespace AIEngineeringAssistant.Api.Services;

public interface ITicketService
{
    List<Ticket> GetAll();

    Ticket? Get(int id);

    void Add(Ticket ticket);

    void Update(Ticket ticket);

    void Delete(int id);
}