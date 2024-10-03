import React, { useState, useRef } from "react";
import { Button, Form, Col } from "react-bootstrap";
import "./SellerForm.css";
import { useNavigate } from "react-router-dom";
import writeProductData from "../util/writeProductData";

const SellerForm = ({ userEmail, toggle }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    email: userEmail,
    price: "",
    condition: "",
    subject: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target)
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(imageInputRef.current.files[0]);
  };

  const handleSubmit = (productDetails, imageFile) => {
    writeProductData(productDetails, imageFile);
    // Show an alert or confirmation message
    alert("Product submitted successfully!");
    // Log a message before navigating
    console.log("Navigating to /home...");
    // Navigate to homepage after successful submission
    toggle();
    setProductDetails({
      name: "",
      email: userEmail,
      price: "",
      condition: "",
      subject: "",
      description: "",
    });
    navigate("/home");
  };

  return (
    <div>
      <p className="scroll-instructions">Scroll down to see more options</p>
      <Form
        className="seller-form"
        onSubmit={() => handleSubmit(productDetails, imageFile)}
      >
        <h1>Sell a Textbook!</h1>
        {/* <Form.Row> */}
        <Form.Group as={Col} className="form-group">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="seller"
            value={productDetails.seller}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={productDetails.email}
            disabled
          />
        </Form.Group>

        <Form.Group as={Col} className="form-group">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="form-group">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* </Form.Row> */}
        <Form.Group className="form-group">
          <Form.Label>Condition</Form.Label>
          <Form.Control
            as="select"
            name="condition"
            value={productDetails.condition}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option value="New">New</option>
            <option value="Almost New">Almost New</option>
            <option value="Used">Used</option>
            <option value="Fair">Fair</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="select"
            name="subject"
            value={productDetails.subject}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Economics">Economics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="English">English</option>
            <option value="Math">Math</option>
            <option value="Others">Others</option>
            {/* Add other subjects as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description (optional)"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Textbook Image</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={handleFileChange}
            ref={imageInputRef}
            required
          />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          onClick={() => handleSubmit(productDetails, imageFile)}
        >
          Submit
        </Button>

        <Button variant="secondary" style={{marginLeft: "20px"}} onClick={ () => 
          setProductDetails({
          name: "CS 340",
          seller: "Mercy",
          email: userEmail,
          price: 15,
          condition: "Used",
          subject: "Computer Science",
          description: "Networking",
          })
        }> Demo
          </Button>
      </Form>
    </div>
  );
};

export default SellerForm;
