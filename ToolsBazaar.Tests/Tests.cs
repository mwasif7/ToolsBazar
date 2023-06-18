using FluentAssertions;
using ToolsBazaar.Persistence;

namespace ToolsBazaar.Tests;

public class UnitTest1
{
    [Fact]
    public void SampleTest() {
        var x = 10;

        x.Should().Be(10);
    }

    [Fact]
    public void MostExpensiveProductsQuery()
    {
        var products = DataSet.AllProducts
                                  .OrderByDescending(p => p.Price)
                                  .ThenBy(p => p.Name)
                              .ToArray();

        products[0].Id.Should().Be(2);
        products[1].Id.Should().Be(7);
        products[2].Id.Should().Be(22);
        products[3].Id.Should().Be(20);
        products[4].Id.Should().Be(21);
    }

    [Fact]
    public void TopCustomersQuery()
    {
        var topCustomers = DataSet.AllOrders
                                  .Where(o =>
                                             o.Date >= new DateTime(2015, 1, 1) &&
                                             o.Date <= new DateTime(2022, 12, 31))
                                  .GroupBy(o => o.Customer.Id)
                                  .OrderByDescending(o => o.Sum(x => x.TotalAmount))
                                  .ToArray();

        topCustomers[0].Key.Should().Be(49);
        topCustomers[1].Key.Should().Be(91);
        topCustomers[2].Key.Should().Be(83);
        topCustomers[3].Key.Should().Be(31);
        topCustomers[4].Key.Should().Be(29);
    }
}