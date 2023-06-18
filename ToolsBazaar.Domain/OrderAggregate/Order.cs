using ToolsBazaar.Domain.CustomerAggregate;

namespace ToolsBazaar.Domain.OrderAggregate;

public class Order
{
    public int Id { get; init; }
    public DateTime Date { get; init; }
    public decimal TotalAmount => Items.Sum(i => i.Price);
    public List<OrderItem> Items { get; init; }
    public Customer? Customer { get; init; }
}