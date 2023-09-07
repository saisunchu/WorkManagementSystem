import firestore from '@react-native-firebase/firestore';

export const addNotifications = async (id, data) => {
    console.log("data",data);
    try {
        return new Promise((resolve, reject) => {
            firestore()
                .collection("Tasks")
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

export const updateTasks = async (id, data) => {
    try {
        return new Promise((resolve, reject) => {
            firestore()
                .collection("Tasks")
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

// export const getTasks = async () => {
//     try {
//         return new Promise((resolve, reject) => {
//             firestore()
//                 .collection('Tasks')
//                 .get()
//                 .then(data => {
//                     let projectsData = [];
//                     data.forEach((doc) => {
//                         let appObj = { ...doc.data() }
//                         projectsData.push(appObj);
//                     });
//                     resolve(projectsData)
//                     // this.setState({ isLoading: !this.state.isLoading, dataHolder: [...projectsData] })
//                 })
//         })
//     } catch (error) {
//         return null
//     }
// }
export const getNotifications = async () => {
    console.log('Inside Gettasks------');
    try {
      return new Promise((resolve, reject) => {
        firestore()
          .collection('Tasks')
          .doc('Notifications') // replace 'TaskDetails' with the actual ID of the document you want to retrieve
          .get()
          .then(doc => {
            if (doc.exists) {
              resolve(doc.data());
            } else {
              resolve(null);
            }
          })
          .catch(error => {
            console.error('Error getting document:', error);
            reject(error);
          });
      });
    } catch (error) {
      console.error('Error retrieving task details:', error);
      return null;
    }
  };
  

export const deleteTasks = async (Id) => {
    console.log("deleted id",Id);
    const ID = parseInt(Id);
    try {
        return new Promise(async (resolve, reject) => {
            firestore()
                .collection('Tasks')
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