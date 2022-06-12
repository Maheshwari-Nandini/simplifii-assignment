import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Add({ employees, setEmployees, setIsAdding }) {
  const [name, setname] = useState("");
  const [country, setcountry] = useState("");
  const [email, setEmail] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const [date, setDate] = useState("");

  const textInput = useRef(null);
  const updateEmployees = () => {
    axios
      .get("https://mockrestapi.herokuapp.com/api/employee")
      .then(response => {
        setEmployees(response.data.data);
        console.log(response.data.data);
      });
  };
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    if (!name || !country || !email || !age || !date) {
      console.log("form details missing");
    }

    setEmployees(employees);
    setIsAdding(false);
    axios
      .post("https://mockrestapi.herokuapp.com/api/employee", {
        name: name,
        phone: phone,
        email: email,
        country: country,
        dob: date,
      })
      .then(response => {
        console.log(response);
        updateEmployees();
      });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="name">First Name</label>
        <input
          id="name"
          type="text"
          ref={textInput}
          name="name"
          value={name}
          onChange={e => setname(e.target.value)}
        />
        <label htmlFor="country">Last Name</label>
        <input
          id="country"
          type="text"
          name="country"
          value={country}
          onChange={e => setcountry(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="age">age</label>
        <input
          id="age"
          type="number"
          name="age"
          value={age}
          onChange={e => setage(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="number"
          name="phone"
          value={phone}
          onChange={e => setphone(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
