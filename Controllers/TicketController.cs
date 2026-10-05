using AIEngineeringAssistant.Api.Models;
using AIEngineeringAssistant.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AIEngineeringAssistant.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Ticket>> GetAllTickets()
    {
        var tickets = TicketService.GetAll();
        return Ok(tickets);
    }

    [HttpGet("{id}")]
    public ActionResult<Ticket> GetTicket(int id)
    {
        var ticket = TicketService.Get(id);
        if (ticket is null)
            return NotFound();

        return Ok(ticket);
    }

    [HttpPost]
    public ActionResult AddTicket(Ticket ticket)
    {
        TicketService.Add(ticket);
        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateTicket(int id, Ticket ticket)
    
        {
    if (id != ticket.Id)
        return BadRequest();

    var existingTicket =
        TicketService.Get(id);

    if (existingTicket is null)
        return NotFound();

    TicketService.Update(ticket);

    return NoContent();
}
    

    [HttpDelete("{id}")]
    public ActionResult DeleteTicket(int id)
    {
        TicketService.Delete(id);
        return NoContent();
    }
}