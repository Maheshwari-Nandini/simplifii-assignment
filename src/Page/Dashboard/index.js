import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import List from "./List";
import Add from "./Add";
const employeesData = [
  {
    id: 1,
    name: "Susan",
    country: "Jordon",
    email: "susan@example.com",
    phone: "0000000",
    age: "23",
    dob: "2019-04-11",
  },
];

function Dashboard() {
  const [employees, setEmployees] = useState(employeesData);
  const [isAdding, setIsAdding] = useState(false);
  const updateEmployees = () => {
    axios
      .get("https://mockrestapi.herokuapp.com/api/employee")
      .then(response => {
        setEmployees(response.data.data);
        console.log(response.data.data);
      });
  };
  useEffect(() => {
    updateEmployees();
  }, []);
  const handleDelete = _id => {
    axios
      .delete(`https://mockrestapi.herokuapp.com/api/employee/${_id}`)
      .then(response => {
        setEmployees(employees.filter(employee => employee._id !== _id));
      });
  };

  return (
    <div className="container">
      {/* List */}
      {!isAdding && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List employees={employees} handleDelete={handleDelete} />
        </>
      )}
      {/* Add */}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
    </div>
  );
}

export default Dashboard;
