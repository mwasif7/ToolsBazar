import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

type ProductData = {
  id: number;
  name: string;
  price: number;
};

const CreateOrder = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >(productId);
  const [quantity, setQuantity] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [warning, setWarning] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    populateProductData();
  }, []);

  const populateProductData = async () => {
    const response = await fetch("http://localhost:5127/products");
    const data = await response.json();
    setProducts(data);
  };

    const calculateTotalPrice = (productId: number, quantity: number): number => {
        const product = products.find((p) => p.id === productId);
        if (product) {
            return +(product.price * quantity).toFixed(2);
        }
        return 0;
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    const productId = event.target.value as string;
    setSelectedProductId(productId);
    const product = products.find((p) => p.id === parseInt(productId));
    if (product && quantity) {
      setTotalPrice(calculateTotalPrice(parseInt(productId), quantity));
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity <= 0) setQuantity(1);
    else if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      setTotalPrice(
        calculateTotalPrice(parseInt(selectedProductId as string), newQuantity)
      );
    } else {
      setQuantity(undefined);
      setTotalPrice(0);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5127/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Product: products.find((p) => p.id === parseInt(selectedProductId as string)),
          Quantity: quantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      const responseData = await response.json();
        if (responseData.warning.length > 0) {
            setWarning(responseData.warning);
            setTimeout(() => {
                navigate("/order-success")
            }, 4000);
        } else {
            navigate("/order-success");
        }
     
    } catch (error: any) {
        setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Order</h2>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>{error}!</strong>
          </Alert>
        )}
       { warning && (<Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This is a warning alert — <strong>{warning}, redirecting!</strong>
        </Alert>
       )}
      </Stack>
      <br></br>
      <FormControl fullWidth>
        <InputLabel id="product-label">Product</InputLabel>
        <Select
          label="Product"
          notched
          id="product-select"
          value={selectedProductId}
          onChange={handleProductChange}
          variant="outlined"
          color="secondary"
          sx={{ mb: 4 }}
          autoWidth
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id="quantity-input"
          label="Quantity"
          type="number"
          variant="outlined"
          color="secondary"
          value={quantity}
          onChange={handleQuantityChange}
          InputProps={{
            inputProps: { min: 1 },
          }}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          id="total-price"
          label="Total Price"
          value={totalPrice}
          InputProps={{
            readOnly: true,
            inputProps: { min: 1 },
          }}
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mb: 4 }}
          InputLabelProps={{ shrink: totalPrice !== undefined }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateOrder;
