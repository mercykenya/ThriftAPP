import { storage } from "../firebase";
import { push, getDatabase, ref as dbRef } from "firebase/database";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const writeProductData = async (productData, file) => {

  const storagePath = uuidv4();
  const imageRef = storageRef(storage, storagePath);

  // Adapted from Firebase Docs

  const uploadTask = uploadBytesResumable(imageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
      return false;
    }, 
    () => {
      // Handle successful uploads on complete
      getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
        console.log('File available at', imageURL);
        const db = getDatabase();
        const profilesRef = dbRef(db, 'products/');
        push(profilesRef, {
          name: productData.name,
          price: productData.price,
          condition: productData.condition,
          subject: productData.subject,
          description: productData.description,
          imageURL: imageURL,
          seller: productData.seller,
          email: productData.email,
        });
        return true;
      });
    }
  );
}

export default writeProductData;