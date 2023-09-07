import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const StoreDeveloperData = (uri) =>
{
    console.log('-----StoreDeveloperData-----------');
    const storageRef = storage().ref();
    // Path where the image will be stored in Firebase Storage
    const path = 'Images/'+auth().currentUser.email+'.png';
    // Local filesystem path to the image file
    const localFilePath = uri;
    // Upload the image file to Firebase Storage
    const uploadTask = storageRef.child(path).putFile(localFilePath);        
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed', (taskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    }, (error) => {
      console.log(error.message);
    }, () => {
      console.log('Image uploaded successfully.');
    });    
}

// export const getDeveloperData = () =>
// {
//     // Reference to the image in Firebase Storage
//     const storageRef = storage().ref('Images/' + auth().currentUser.email + '.png');

//     // Get the download URL of the image
//     storageRef.getDownloadURL().then((url) => {
//         console.log('Async Method 1 -----');
//         console.log('Download URL: ', url);
//         return url;
//     })
//     .catch((error) => {
//         console.log(error.message);
//     });
// }

export const getDeveloperData = async () => {
  // Reference to the image in Firebase Storage
  const storageRef = storage().ref('Images/' + auth().currentUser.email + '.png');

  try {
    // Get the download URL of the image and return it as a resolved promise
    const url = await storageRef.getDownloadURL();
    console.log('Async Method 1 -----');
    console.log('Download URL: ', url);
    return url;
  } catch (error) {
    console.log(error.message);
    throw error; // re-throw the error to be caught by the caller
  }
};
