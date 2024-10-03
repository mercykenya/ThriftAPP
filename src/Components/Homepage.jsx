import ItemList from "./ItemList";
import React, { useState, useEffect } from 'react';//chnaged to this
import Modal from "./Modal";
import SellerForm from "./SellerForm";
import "./Homepage.css";
import SearchBar from "./SearchBar";
import { getSoldBooks } from './api';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useNavigate, Link } from 'react-router-dom';


const Homepage = ({ products }) => {

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [dropValue, setDropValue] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Toggle the visibility
  };
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      } else {
        setUserEmail(user.email);
        console.log('userEmail=' + userEmail);
      }

    });
  }, [auth, navigate, userEmail]);

  const [isSortByAsc, setIsSortByAsc] = useState(true);
  const compareNumbers = (a, b, isSortByAsc) => {
    if (isSortByAsc) return a - b;
    else return b - a;
  }

  const changeSortByAsc = () => { 
    setIsSortByAsc(!isSortByAsc);
  }

  const [searchTextbooks, setSearchTextbooks] = useState([]);
  useEffect(() => {
    if (typeof products === 'object') {
    const sortedProducts = Object.values(products).sort((a, b) => compareNumbers(a.price, b.price, isSortByAsc));
    setSearchTextbooks(sortedProducts);  
    return;
    }
  
    setSearchTextbooks(products);  // Set searchTextbooks initially with products
  }, [isSortByAsc, products]);

  function onSearch(searchTerm) {
    if (searchTerm === "") {
      setSearchTextbooks(products);
    }
    const productNames = Object.values(products); // { {product1}, {product2}, ... } --> [{product1}, {product2}, ...]
    const filteredProducts = productNames.filter((productName) => {
      return (
        productName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        productName.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setSearchTextbooks(filteredProducts);
  }



  // User sold books logic
  const [userSoldBooks, setUserSoldBooks] = useState([]);

  useEffect(() => {
    async function fetchUserSoldBooks() {
      try {
        const soldBooks = await getSoldBooks(); // Assuming getSoldBooks does not require userId
        setUserSoldBooks(soldBooks);
      } catch (error) {
        console.error("Error fetching user sold books:", error);
      }
    }

    fetchUserSoldBooks();
  }, []);
  for (let i = 0; i < products.length; i++) {
    console.log(products[i].category);
    if (products[i].category !== dropValue) {
    }
  }

  return (
    <div className="homepage-container">
      {/* Adjusted div structure and class names for styling */}
      <div className="text-center header">
        <h1>ThriftNU</h1>
        <div className="user-profile-info">
          <h3>Welcome, to ThriftNU</h3>
          <div className="user-profile-link">
            <Link to="/profile">View Your Profile</Link>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={toggleFormVisibility}
          className="btn btn-primary sell-button my-3"
        >
          {showForm ? "Hide Form" : "Click here to sell an Item"}
        </button>
      </div>


      <Modal open={open} close={closeModal}>
        {selected ? (
          <div>
            <div
              className="card"
              style={{ maxWidth: "60vw", boxShadow: "none" }}
            >
              <img
                className="card-img-top"
                src={selected.imageURL}
                alt="product"
                style={{ width: "80%", height: "auto", position: "relative" }}
              />
              <div className="card-body">
                <h2 className="card-title">{selected.name}</h2>
                <p className="card-text">{selected.description}</p>
                <p className="card-text">Price: ${selected.price}</p>
                <p className="card-text">Condition: {selected.condition}</p>
                <p className="card-text">Seller: {selected.seller}</p>
                <p className="card-text">
                  Seller's Email:{" "}
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Modal>

      <Modal
        className="form-modal"
        open={showForm}
        close={toggleFormVisibility}
      >
        {userEmail && <SellerForm userEmail={userEmail} toggle={toggleFormVisibility} />}
      </Modal>
        
      
      <div className="searchbar">
        <SearchBar onSearch={onSearch} />
        <div className="sort-by">
          <button onClick={changeSortByAsc} className="btn btn-primary sort-button">
            {isSortByAsc ? "Sort by Price ⬆️" : "Sort by Price ⬇️"}
          </button>
        </div>
      </div>

      {/* <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="custom-dropdown"
        >
          {dropValue ? dropValue : "Select a subject"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setDropValue(null);
            }}
          >
            All
          </Dropdown.Item>
          {[
            ...new Set(Object.values(products).map((item) => item.subject)),
          ].map((subject, id) => (
            <Dropdown.Item
              key={id}
              onClick={() => {
                setDropValue(subject);
              }}
            >
              {subject}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> */}

      <ItemList
        items={searchTextbooks} // changed from products to searchTextbooks
        setSelectedItem={setSelected}
        openModal={openModal}
        dropValue={dropValue}
      />

      {/* {showForm && <SellerForm />} */}
    </div>
  );
};

export default Homepage;
