import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './ProfilePage.css'; // Import the CSS file
import { set, getDatabase, ref } from "firebase/database";

// Mock data to replace actual fetch calls
const mockSoldBooks = [
  { id: 1, bookTitle: 'Designa nd Analysis of Algorithims', price: 25, dateSold: '2022-01-01' },
  { id: 2, bookTitle: 'JavaScript Fundamentals', price: 20, dateSold: '2022-02-15' },
  { id: 3, bookTitle: 'Data Structures in Python', price: 30, dateSold: '2022-03-20' },
];

// async function fetchUserData(userId) {
//   // Replace with actual fetch calls
//   const name = "User"; // Replace with getUserName(userId) - if firebase works
//   const purchases = []; // Replace with getPurchases(userId)
//   const soldBooks = mockSoldBooks; // Replace with getSoldBooks(userId)
//   return { name, purchases, soldBooks };
// }

function ProfilePage({ products, updateData }) {
  // const [userData, setUserData] = useState({});
  const [userEmail, setUserEmail] = useState('');
  // console.log(products);
  const auth = getAuth();

  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email);
    }
  });
  }, []);

  const changeProductSold = (product, productId) => {
    const db = getDatabase();
    const productRef = ref(db, `products/${productId}`);
    const newProduct = {
      ...product,
      sold: !product.sold,
    };
    set(productRef, newProduct);
    updateData();
  }
  // Using Object.entries instead of Object.values. This is to get the product id/folder name
  // Downside is that we have to use product[0] to get the id and product[1] to get the product data.
  // Lowercase filter: temporary fix, we can remove toLowerCase after the DB is updated to be only lowercase
  const user_books = Object.entries(products).filter((product) => product[1].email.toLowerCase() === userEmail.toLowerCase());
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const userData = await fetchUserData(userId);
  //       setUserData(userData);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   }

  //   fetchData();
  // }, [userId]);
  // const { name, purchases, soldBooks } = userData;

  return (
    <div>
      <h2>Welcome back</h2>
      <div className="user-sold-books">
        <h2>Books you are selling:</h2>
        <ul style={{ paddingRight: '2rem' }}>
          {user_books.filter((product) => !product[1].sold).map((item, id) =>
            <li key={id}>
              {/* {console.log("hi!", id)} */}
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                <img className="card-img-top" src={item[1].imageURL} alt="product" style={{ paddingRight: '20px', maxWidth: '150px' }} />
                <li style={{border: "0px"}}>
                <div className='profile-text'><b>{item[1].name}</b></div>
                <div className='profile-text'>${item[1].price}</div>
                <div className='profile-text'>{item[1].condition}</div>
                {/* onclick mark as sold */}
                <div className="button-not-sold" onClick={() => changeProductSold(item[1], item[0])}>Mark as sold</div>
                {/* {console.log("hi!", item)} */}

              </li>
              </div>
            </li>
          )}
        </ul>
      </div>
      {/* Display sold books */}
      <div className="user-sold-books">
        <h2>Sold books:</h2>
        {user_books.filter((product) => product.sold) ? 
        <ul style={{ paddingRight: '2rem' }}>
          {user_books.filter((product) => product[1].sold).map((item, id) =>
            <li key={id}>
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                <img className="card-img-top" src={item[1].imageURL} alt="product" style={{ paddingRight: '20px', maxWidth: '150px' }} />
                <li style={{border: "0px"}}>
                  <div className='profile-text'><b>{item[1].name}</b></div>
                  <div className='profile-text'>${item[1].price}</div>
                  <div className='profile-text'>{item[1].condition}</div>
                  <div className="button-sold" onClick={() => changeProductSold(item[1], item[0])}>Mark as not sold</div>
                </li>
              </div>
            </li>
          )}
        </ul> : <p>You have not sold any books yet</p> 
        }
      </div>

      

      {/* Button to navigate back to the homepage */}
      <Link to="/home">
        <button>Go Back to Homepage</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
