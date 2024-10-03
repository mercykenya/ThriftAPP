// api.js

// Simulate a global variable to store sold books data
const soldBooksData = {};

// Function to simulate fetching books sold by the user
export const getSoldBooks = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const soldBooks = soldBooksData[userId] || [];
      resolve(soldBooks);
    }, 1000); 
  });
};

export const logSale = async (userId, bookDetails) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Log the sale
      console.log("Book sold:", bookDetails);

      // Store the sold book in the global variable
      const soldBooks = soldBooksData[userId] || [];
      soldBooks.push({
        id: soldBooks.length + 1,
        ...bookDetails,
        dateSold: new Date().toISOString().split('T')[0], // Current date
      });
      soldBooksData[userId] = soldBooks;

      // Resolve the promise
      resolve();
    }, 500); 
  });
};
