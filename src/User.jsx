import { useState } from "react";
import "./User.css";

function User() {

  const [view, setView] = useState("");
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    address: "",
    phone: ""
  });

  const [deleteId, setDeleteId] = useState("");

  const baseUrl = "http://localhost:8080/user";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* CREATE USER */

  const createUser = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
  };

  /* GET ALL USERS */

  const getUsers = async () => {

    const res = await fetch(`${baseUrl}/allUsers`);
    const data = await res.json();

    setUsers(data);
  };

  /* UPDATE USER */

  const updateUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/updateUsers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
  };

  /* DELETE USER */

  const deleteUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/${deleteId}`, {
      method: "DELETE"
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="user-container">

      <h1>User Management</h1>

      <div className="menu-buttons">

        <button onClick={() => setView("create")}>
          Create User
        </button>

        <button
          onClick={() => {
            setView("get");
            getUsers();
          }}
        >
          Get Users
        </button>

        <button onClick={() => setView("update")}>
          Update User
        </button>

        <button onClick={() => setView("delete")}>
          Delete User
        </button>

      </div>

      {/* CREATE USER */}

      {view === "create" && (
        <form className="user-form" onSubmit={createUser}>

          <h2>Create User</h2>

          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} />

          <label>Phone</label>
          <input type="tel" name="phone" onChange={handleChange} />

          <button type="submit">Submit</button>

        </form>
      )}

      {/* GET USERS */}

      {view === "get" && (

        <div className="table-section">

          <h2>User List</h2>

          <table>

            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* UPDATE USER */}

      {view === "update" && (

        <form className="user-form" onSubmit={updateUser}>

          <h2>Update User</h2>

          <label>User ID</label>
          <input type="number" name="id" onChange={handleChange} />
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} />

          <label>Phone</label>
          <input type="tel" name="phone" onChange={handleChange} />

          <button type="submit">Update</button>

        </form>

      )}

      {/* DELETE USER */}

      {view === "delete" && (

        <form className="user-form" onSubmit={deleteUser}>

          <h2>Delete User</h2>

          <label>User ID</label>

          <input
            type="number"
            onChange={(e) => setDeleteId(e.target.value)}
          />

          <button type="submit">
            Delete
          </button>

        </form>

      )}

    </div>
  );
}

export default User;