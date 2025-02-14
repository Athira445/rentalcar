import React, { useState } from "react";
import "./AddCar.css";

function AddCar() {
  const [formData, setFormData] = useState({
    brand: "",
    carName: "",
    model: "",
    price: "",
    imgFile: null, // Changed to handle file upload
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") {
      setFormData({ ...formData, imgFile: files[0] }); // Update with the selected file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("carName", formData.carName);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("imgFile", formData.imgFile); // Append the image file

    try {
      const response = await fetch("http://localhost:4000/api/add-cars", {
        method: "POST",
        body: formDataToSend, // Send as FormData
      });

      const responseText = await response.text(); // Get the raw response text (not JSON)
      console.log('Response text:', responseText);  // Log the response

      if (response.ok) {
        // If response is OK, parse the response as JSON
        const responseData = JSON.parse(responseText);
        console.log('Response Data:', responseData);
        alert("Car added successfully!");
        setFormData({
          brand: "",
          carName: "",
          model: "",
          price: "",
          imgFile: null, // Reset the file input
        });
      } else {
        // If response is not OK, handle the error
        alert("Error adding car!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-car">
      <h1>Add Car</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <input
          type="text"
          name="carName"
          value={formData.carName}
          onChange={handleChange}
          placeholder="Car Name"
          required
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="file"
          name="imgFile" // Handle file upload
          onChange={handleChange}
          required
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCar;
