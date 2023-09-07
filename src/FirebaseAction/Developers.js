import firestore from '@react-native-firebase/firestore';

export const addDeveloper = async (id, data) => {
    console.log(" Async-----2 data",data);
    try {
        return new Promise((resolve, reject) => {
            firestore()
                .collection("Developers")
                .doc(id)
                .set(data)
                .then((ref) => {
                    console.log(ref)
                    //alert('Add record successfully!');
                    resolve(true)
                })
                .catch((error) => {
                    console.log("error",error);
                    const errorString = JSON.stringify(error);
                    const parseerror = JSON.parse(errorString);
                    alert(parseerror.message) // alert error message 
                    resolve(false)
                });
        })
    } catch (error) {
        return null
    }
}

export const updateDeveloper = async (id, data) => {
    try {
        return new Promise((resolve, reject) => {
            firestore()
                .collection("Developers")
                .doc(id)
                .update(data)
                .then((ref) => {
                    console.log(ref)
                    //alert('Edit record successfully!');
                    resolve(true)
                })
                .catch((error) => {
                    const errorString = JSON.stringify(error);
                    const parseerror = JSON.parse(errorString);
                    alert(parseerror.message) // alert error message 
                    resolve(false)
                });
        })
    } catch (error) {
        return null
    }
}

export const getDeveloper = async (id) => {
    try {
      const snapshot = await firestore()
        .collection('Developers')
        .doc(id)
        .get();
        // .get({ source: 'server' });
  
      if (snapshot.exists) {
        return snapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error retrieving developer:', error);
      return null;
    }
};
  

export const deleteDeveloper = async (Id) => {
    console.log("deleted id",Id);
    const ID = parseInt(Id);
    try {
        return new Promise(async (resolve, reject) => {
            firestore()
                .collection('Developers')
                .doc(Id)
                .delete()
                .then(() => {
                    resolve(true)
                });
        })
    } catch (error) {
        return null
    }
}