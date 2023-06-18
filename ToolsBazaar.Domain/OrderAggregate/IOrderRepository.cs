namespace ToolsBazaar.Domain.OrderAggregate;

public interface IOrderRepository
{
    IEnumerable<Order> GetAll();
    void CreateOrder(OrderItem order);
}