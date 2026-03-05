import { useState, useEffect } from "react";
import "./Order.css";

function Order() {

  const [categories, setCategories] = useState([]);

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

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Order Placed:", orderData);
  };

  // Fetch categories from backend
  useEffect(() => {

    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(data => setCategories(data));

  }, []);

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

        <select
          name="category"
          value={orderData.category}
          onChange={handleChange}
        >

          <option value="">Select Category</option>

          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}

        </select>

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