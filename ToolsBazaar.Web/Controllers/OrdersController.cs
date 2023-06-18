using Microsoft.AspNetCore.Mvc;
using ToolsBazaar.Domain.OrderAggregate;
using ToolsBazaar.Domain.ProductAggregate;

namespace ToolsBazaar.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
  private readonly ILogger<ProductsController> _logger;
  private readonly IOrderRepository _orderRepository;
  private readonly IProductRepository _productRepository;

  public OrdersController(
    ILogger<ProductsController> logger,
    IOrderRepository orderRepository,
    IProductRepository productRepository)
  {
    _logger = logger;
    _orderRepository = orderRepository;
    _productRepository = productRepository;
  }

  [HttpPost]
  public IActionResult PostOrder([FromBody] OrderItem order)
  {
    try
    {
      var quantity = order.Quantity;
      var productId = order.Product.Id;
      if (quantity <= 0)
      {
        return BadRequest("Quantity must be greater than 0");
      }

      var product = _productRepository.GetById(productId);
      if (product is null)
      {
        return BadRequest("Invalid product Id");
      }

      var message = "";
      if (order.Price > 3000)
      {
        message = "Order total price exceeds $3000";
      }

      _orderRepository.CreateOrder(order);

      var response = new ResponseMessage
      {
        Message = "Success",
        Warning = message
      };

      return Ok(response);
    }
    catch (Exception ex)
    {
      return BadRequest($"Exception occurred, check the stack strace. {ex}");
    }

  }
}
