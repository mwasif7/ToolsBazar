
namespace ToolsBazaar.Web.Tests.Controllers;

public class OrdersControllerTests
{
  private OrdersController _ordersController;
  private Mock<IOrderRepository> _orderRepositoryMock;
  private Mock<IProductRepository> _productRepositoryMock;

  public OrdersControllerTests()
  {
    _orderRepositoryMock = new Mock<IOrderRepository>();
    _productRepositoryMock = new Mock<IProductRepository>();
    _ordersController = new OrdersController(
        null, // Mocked logger instance
        _orderRepositoryMock.Object,
        _productRepositoryMock.Object
    );
  }

  [Fact]
  public void PostOrder_WithValidOrder_ReturnsOkResult()
  {
    // Arrange
    var order = new OrderItem
    {
      Quantity = 5,
      Product = new Product { Id = 1, Name = "Test1", Price = 250 },
    };
    _productRepositoryMock.Setup(repo => repo.GetById(It.IsAny<int>()))
        .Returns(new Product { Id = 1 });

    var result = _ordersController.PostOrder(order);
    Assert.IsType<OkObjectResult>(result);
  }

  [Fact]
  public void PostOrder_WithInvalidQuantity_ReturnsBadRequest()
  {
    var order = new OrderItem
    {
      Quantity = -5,
      Product = new Product { Id = 1, Name = "InvalidQuantity", Price = 200 },
    };

    var result = _ordersController.PostOrder(order);
    Assert.IsType<BadRequestObjectResult>(result);
  }

  [Fact]
  public void PostOrder_WithInvalidProductId_ReturnsBadRequest()
  {
    var order = new OrderItem
    {
      Quantity = 5,
      Product = new Product { Id = 1, Name = "InvalidProductId", Price = 200 },
    };
    _productRepositoryMock.Setup(repo => repo.GetById(It.IsAny<int>()))
        .Returns((Product)null);

    var result = _ordersController.PostOrder(order);
    Assert.IsType<BadRequestObjectResult>(result);
  }

  [Fact]
  public void PostOrder_WithHighPrice_ReturnsOkResultWithWarning()
  {

    var order = new OrderItem
    {
      Quantity = 5,
      Product = new Product { Id = 1, Name = "HighPrice", Price = 700 },
    };
    _productRepositoryMock.Setup(repo => repo.GetById(It.IsAny<int>()))
        .Returns(new Product { Id = 1 });

    var result = _ordersController.PostOrder(order) as OkObjectResult;
    var response = result.Value as ResponseMessage;


    Assert.IsType<OkObjectResult>(result);
    Assert.Equal("Success", response.Message);
    Assert.Equal("Order total price exceeds $3000", response.Warning);
  }
}

