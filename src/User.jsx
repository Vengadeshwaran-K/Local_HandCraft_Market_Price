import { useState } from "react";
import "./User.css";

function User() {

  const [view, setView] = useState("");

  return (
    <div className="user-container">

      <h1>User Management</h1>

      <div className="menu-buttons">
        <button onClick={() => setView("create")}>Create User</button>
        <button onClick={() => setView("get")}>Get Users</button>
        <button onClick={() => setView("update")}>Update User</button>
        <button onClick={() => setView("delete")}>Delete User</button>
      </div>

      {/* CREATE USER */}

      {view === "create" && (
        <form className="user-form">
          <h2>Create User</h2>

          <label>Name</label>
          <input type="text" />

          <label>Email</label>
          <input type="email" />

          <label>Password</label>
          <input type="password" />

          <label>Address</label>
          <input type="text" />

          <label>Phone</label>
          <input type="tel" />

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
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>John</td>
                <td>john@gmail.com</td>
                <td>NY</td>
                <td>9999999999</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* UPDATE USER */}

      {view === "update" && (
          <form className="user-form">

          <h2>Update User</h2>

          <label>Name</label>
          <input type="text"/>

          <label>Email</label>
          <input type="email"/>

          <label>Password</label>
          <input type="password"/>

          <label>Address</label>
          <input type="text"/>

          <label>Phone</label>
          <input type="tel"/>

          <button type="submit">Update</button>

        </form>
      )}

      {/* DELETE USER */}

      {view === "delete" && (
        <form className="user-form">
          <h2>Delete User</h2>

          <label>User ID</label>
          <input type="text" />

          <button type="submit">Delete</button>
        </form>
      )}

    </div>
  );
}

export default User;