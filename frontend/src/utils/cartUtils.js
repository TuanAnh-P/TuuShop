// Function to ensure numbers have two decimal places
export const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

// Function to update cart state with calculated prices
export const updateCart = (state) => {
	// Calculate total items price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	// Calculate shipping price (free if itemsPrice > 100, otherwise 10)
	state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

	// Calculate tax price (15% of itemsPrice)
	state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

	// Calculate total price including items, shipping, and tax
	state.totalPrice = (
		Number(state.itemsPrice) +
		Number(state.shippingPrice) +
		Number(state.taxPrice)
	).toFixed(2);

	// Store updated cart state in localStorage
	localStorage.setItem('cart', JSON.stringify(state));

	return state;
};
