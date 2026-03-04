import { useState } from "react";
import "./Order.css";

function Order() {

  const [orderData, setOrderData] = useState({
    customerName: "",
    email: "",
    address: "",
    productName: "",
    quantity: "",
    paymentMethod: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrderData({
      ...orderData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Order Placed:", orderData);

    // Later API call will go here
  };

  return (
    <div className="order-container">

      <h2>Place Order</h2>

      <form className="order-form" onSubmit={handleSubmit}>

        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={orderData.customerName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={orderData.email}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={orderData.address}
          onChange={handleChange}
        />

        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={orderData.productName}
          onChange={handleChange}
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={orderData.quantity}
          onChange={handleChange}
        />

        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={orderData.paymentMethod}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>

        <button type="submit">Place Order</button>

      </form>

    </div>
  );
}

export default Order;