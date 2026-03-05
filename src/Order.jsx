import { useState } from "react";
import "./Order.css";

function Order() {

  const [orderData, setOrderData] = useState({
    productName: "",
    category: "",
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

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();

    alert(data.message);
  };

  return (
    <div className="order-container">

      <h2>Place Order</h2>

      <form className="order-form" onSubmit={handleSubmit}>

        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={orderData.productName}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={orderData.category}
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
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
        </select>

        <button type="submit">Place Order</button>

      </form>

    </div>
  );
}

export default Order;