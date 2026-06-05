import React, { useEffect, useState } from "react";
import "./form.css";
import RadioList from "./RadioList";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  //   useEffect(() => {
  //     console.log(formData);
  //   }, [formData]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            //   required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={4}
            maxLength={7}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            //   required
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            //   required
          />
        </div>
        <RadioList />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
