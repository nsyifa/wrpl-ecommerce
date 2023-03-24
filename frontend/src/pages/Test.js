import React, { useState, useEffect } from "react";

function Test() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/profile")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        <li>{users.name}</li>
      </ul>
    </div>
  );
}

export default Test;
