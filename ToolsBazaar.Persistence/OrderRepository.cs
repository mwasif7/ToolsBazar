using ToolsBazaar.Domain.OrderAggregate;
using ToolsBazaar.Persistence;

namespace ToolsBazaar.Persistence;

public class OrderRepository : IOrderRepository
{
  public IEnumerable<Order> GetAll() => DataSet.AllOrders;

  public void CreateOrder(OrderItem order)
  {



    var newOrder = new Order
    {
      Id = 0,
      Customer = null,
      Date =
         DateTime
            .Parse("06/18/2023"),
      Items = new List<OrderItem>
                            {
                                new OrderItem
                                {
                                    Quantity = order.Quantity,
                                    Id = 0,
                                    Product =
                                        DataSet.GetProductById(order.Product.Id)
                                }
                            }
    };

    DataSet.AllOrders.Add(newOrder);
  }
}