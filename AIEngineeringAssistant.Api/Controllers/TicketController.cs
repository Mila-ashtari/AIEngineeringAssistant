using AIEngineeringAssistant.Api.Models;
using AIEngineeringAssistant.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AIEngineeringAssistant.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketController(ITicketService DBticketService)
    {
            _ticketService = DBticketService;
        }

     [HttpGet]
    public ActionResult<List<Ticket>> GetAll() =>
        _ticketService.GetAll();


    [HttpGet("{id}")]
    public ActionResult<Ticket> GetTicket(int id)
    {
        var ticket = _ticketService.Get(id);
        if (ticket is null)
            return NotFound();

        return Ok(ticket);
    }

    [HttpPost]
    public ActionResult AddTicket(Ticket ticket)
    {
        _ticketService.Add(ticket);
        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateTicket(int id, Ticket ticket)
    
        {
    if (id != ticket.Id)
        return BadRequest();

    var existingTicket =
        _ticketService.Get(id);

    if (existingTicket is null)
        return NotFound();

    _ticketService.Update(ticket);

    return NoContent();
}
    

    [HttpDelete("{id}")]
    public ActionResult DeleteTicket(int id)
    {
        _ticketService.Delete(id);
        return NoContent();
    }
}