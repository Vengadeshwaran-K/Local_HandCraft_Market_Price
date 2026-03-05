import { useState } from "react";
import "./Product.css";

function Product() {

  const baseUrl = "http://localhost:8080/products";

  const [view,setView] = useState("");
  const [products,setProducts] = useState([]);

  const [formData,setFormData] = useState({
    id:"",
    name:"",
    description:"",
    price:"",
    category:"",
    stock:""
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  /* CREATE PRODUCT */

  const createProduct = async(e)=>{
    e.preventDefault();

    const {id, ...productData} = formData;
    const res = await fetch(baseUrl,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(productData)
    });

    const data = await res.json();
    alert(data.message);
  };

  /* GET PRODUCTS */

  const getProducts = async()=>{

    const res = await fetch(baseUrl);
    const data = await res.json();

    setProducts(data);
  };

  /* UPDATE PRODUCT */

  const updateProduct = async(e)=>{
    e.preventDefault();

    const res = await fetch(baseUrl,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
  };

  /* DELETE PRODUCT */

  const deleteProduct = async(e)=>{
    e.preventDefault();

    const res = await fetch(`${baseUrl}/${formData.id}`,{
      method:"DELETE"
    });

    const data = await res.json();
    alert(data.message);
  };

  return(
    <div className="product-container">

      <h1>Product Management</h1>

      <div className="menu-buttons">

        <button onClick={()=>setView("create")}>Create Product</button>

        <button onClick={()=>{
          setView("get");
          getProducts();
        }}>Get Products</button>

        <button onClick={()=>setView("update")}>Update Product</button>

        <button onClick={()=>setView("delete")}>Delete Product</button>

      </div>

      {/* CREATE */}

      {view==="create" && (

        <form onSubmit={createProduct}>

          <input name="name" placeholder="Name" onChange={handleChange}/>
          <input name="description" placeholder="Description" onChange={handleChange}/>
          <input name="price" placeholder="Price" onChange={handleChange}/>
          <input name="category" placeholder="Category" onChange={handleChange}/>
          <input name="stock" placeholder="Stock" onChange={handleChange}/>

          <button>Create</button>

        </form>

      )}

      {/* GET PRODUCTS */}

      {view==="get" && (

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>

            {products.map((p)=>(
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
              </tr>
            ))}

          </tbody>

        </table>

      )}

      {/* UPDATE */}

      {view==="update" && (

        <form onSubmit={updateProduct}>

          <input name="id" placeholder="Product ID" onChange={handleChange}/>
          <input name="name" placeholder="Name" onChange={handleChange}/>
          <input name="description" placeholder="Description" onChange={handleChange}/>
          <input name="price" placeholder="Price" onChange={handleChange}/>
          <input name="category" placeholder="Category" onChange={handleChange}/>
          <input name="stock" placeholder="Stock" onChange={handleChange}/>

          <button>Update</button>

        </form>

      )}

      {/* DELETE */}

      {view==="delete" && (

        <form onSubmit={deleteProduct}>

          <input name="id" placeholder="Product ID" onChange={handleChange}/>

          <button>Delete</button>

        </form>

      )}

    </div>
  );
}

export default Product;