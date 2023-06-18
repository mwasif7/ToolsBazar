using ToolsBazaar.Domain.CustomerAggregate;

namespace ToolsBazaar.Persistence;

public class CustomerRepository : ICustomerRepository
{
    public IEnumerable<Customer> GetAll() => DataSet.AllCustomers;
    public Customer GetCustomerById(int id) => DataSet.AllCustomers.FirstOrDefault(c => c.Id == id);
}