using Microsoft.AspNetCore.Mvc;
using ToolsBazaar.Domain.CustomerAggregate;

namespace ToolsBazaar.Web.Controllers;

public record CustomerDto(string Name);

[ApiController]
[Route("[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICustomerRepository _customerRepository;
    private readonly ILogger<CustomersController> _logger;

    public CustomersController(ILogger<CustomersController> logger, ICustomerRepository customerRepository)
    {
        _logger = logger;
        _customerRepository = customerRepository;
    }
    
    [HttpPut("{customerId:int}")]
    public ActionResult UpdateCustomerName(int customerId, CustomerDto dto)
    {
        var customer = _customerRepository.GetCustomerById(customerId);
        if (customer is null)
        {
            _logger.LogWarning($"Customer #{customerId} was not found");

            return NotFound();
        }

        customer.UpdateName(dto.Name);

        return Ok();
    }
}