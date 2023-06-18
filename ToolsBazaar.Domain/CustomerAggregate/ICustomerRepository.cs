namespace ToolsBazaar.Domain.CustomerAggregate;

public interface ICustomerRepository
{
    Customer GetCustomerById(int id);
    IEnumerable<Customer> GetAll();
}