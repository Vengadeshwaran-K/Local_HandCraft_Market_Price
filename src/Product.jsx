import { useState } from "react";
import "./Product.css";

function Product() {

  const [view, setView] = useState("");

  return (
    <div className="product-container">

      <h1>Product Management</h1>

      <div className="menu-buttons">
        <button onClick={() => setView("create")}>Create Product</button>
        <button onClick={() => setView("get")}>Get Products</button>
        <button onClick={() => setView("update")}>Update Product</button>
        <button onClick={() => setView("delete")}>Delete Product</button>
      </div>

      {/* CREATE PRODUCT */}

      {view === "create" && (
        <form className="product-form">
          <h2>Create Product</h2>

          <label>Name</label>
          <input type="text" name="name" />

          <label>Description</label>
          <input type="text" name="description" />

          <label>Price</label>
          <input type="number" name="price" />

          <label>Category</label>
          <input type="text" name="category" />

          <label>Stock</label>
          <input type="number" name="stock" />

          <button type="submit">Submit</button>
        </form>
      )}

      {/* GET PRODUCTS */}

      {view === "get" && (
        <div className="table-section">
          <h2>Product List</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Laptop</td>
                <td>Gaming Laptop</td>
                <td>80000</td>
                <td>Electronics</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* UPDATE PRODUCT */}

      {view === "update" && (
        <form className="product-form">
          <h2>Update Product</h2>

          <label>Product ID</label>
          <input type="text" />

          <label>Name</label>
          <input type="text" />

          <label>Description</label>
          <input type="text" />

          <label>Price</label>
          <input type="number" />

          <label>Category</label>
          <input type="text" />

          <label>Stock</label>
          <input type="number" />

          <button type="submit">Update</button>
        </form>
      )}

      {/* DELETE PRODUCT */}

      {view === "delete" && (
        <form className="product-form">
          <h2>Delete Product</h2>

          <label>Product ID</label>
          <input type="text" />

          <button type="submit">Delete</button>
        </form>
      )}

    </div>
  );
}

export default Product;