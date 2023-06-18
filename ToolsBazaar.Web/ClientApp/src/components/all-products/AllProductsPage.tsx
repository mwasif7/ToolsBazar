import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";

type FetchDataProduct = {
  id: number;
  name: string;
  price: number;
};

const AllProductsPageFunc = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<FetchDataProduct[]>([]);
  const navigate = useNavigate(); // Access the history object

  useEffect(() => {
    populateProductData();
  }, []);

  const renderProductsTable = (products: FetchDataProduct[]) => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Create Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                    <TableCell align="right" style={{ cursor: 'pointer' }}>
                  <ShoppingCartCheckoutIcon
                    onClick={() => handleCheckoutClick(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const handleCheckoutClick = (productId: number) => {
    navigate(`../create-order/${productId}`);
  };

  const populateProductData = async () => {
    const response = await fetch("http://localhost:5127/products");
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };

  const contents = loading ? (
    <CircularProgress size={24} />
  ) : (
    renderProductsTable(products)
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h2">All products</Typography>
      {contents}
    </Stack>
  );
};

export default AllProductsPageFunc;
