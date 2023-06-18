##In case of error after cloning the repo, try building the proj file

Try to always use MUI components (https://mui.com/) for the tasks below:
1- Add a theme toggle button on the nav bar that allows the user to switch between dark mode and light mode. Use React context. :: DONE

2- Refactor AllProductsPage.tsx from a class component to a functional component. Use hooks and keep using typescript. :: DONE

3- Update the Price column to display 2 decimals (a price of 57 must be displayed as 57.00) :: DONE
    
4- If the user tries to access a non-existent URL such as http://localhost:44438/a-random-page, redirect them to the existing 404 page named 'PageNotFound.tsx' :: DONE

5- Create order feature: :: DONE
	-	Add an extra column 'Create order' next to the Price column in the All products page
	-	Each cell in the new column should display a cart icon (use @mui/icons-material/ShoppingCartCheckout) that redirects to a new page /create-order/:product-id. Use the product ID as a parameter.
	-	The Create order page should display the following fields in a form:
		-	Product selection dropdown: lists all the products and automatically selects the product ID received as a parameter
		-	Quantity number input
		-	Total price read-only text
		-	Submit button: submits the form to the /orders URL
		-	Don't validate the form in the front-end, just display the error received from the back-end
		-	On success, navigate to '/order-success' (reusing the existing OrderSuccessPage.tsx)

6- Create a /orders POST endpoint:  :: DONE
		-	The endpoint should receive a productId and quantity and it should create an Order with a single OrderItem
		-	Validate the product ID exists and that the quantity parameter is > 0, returning a BadRequest if any validation fails
		-	Log a Warning when the order total price exceeds $3000
		-	The order should be added to the DataSet.AllOrders collection:
			-	Put this logic in the OrderRepository class
			-	Hard-code the new Order.Id and OrderItem.Id to zero and the Order.Customer to null, for simplicity
		-	Integrate with the front-end form in point 5-

7- Push to a public repo on GitHub and send the link :: DONE

Nice to have (optional):

8- Highlight the current active page in the navigation bar buttons. For instance, when the URL is /all-products, the 'All products' button should have a different background colour. :: DONE

9- Add unit tests that cover the logic specified in point 6- :: DONE
