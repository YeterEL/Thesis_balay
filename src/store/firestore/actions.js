import firebase from 'firebase/app'
import db from '../db/index.js'
require('firebase/auth')

// retrive user house
export function retrieveSingleHouse (context, payload) {
  db.collection('houses')
    .where(
      'user_id',
      '==',
      payload
    )
    .get()
    .then((querySnapshot) => {
      let payload = []
      querySnapshot.forEach(doc => {
        const singleHouse = {
          id: doc.id,
          house_name: doc.data().house_name,
          address: doc.data().address,
          near: doc.data().near,
          distance: doc.data().distance,
          contact_number1: doc.data().contact_number1,
          contact_number2: doc.data().contact_number2,
          details: doc.data().details,
          price_max: doc.data().price_max,
          price_min: doc.data().price_min,
          available_room: doc.data().available_room,
          uploadedBy: doc.data().uploadedBy,
          wifi: doc.data().wifi,
          rate: doc.data().rate,
          reacted: doc.data().reacted,
          due_date: doc.data().due_date,
          numberOfComments: doc.data().numberOfComments,
          loading: true
        }
        payload.push(singleHouse)
      })
      context.commit('retrieveSingleHouse', payload)
    })
}

// retrive user house available room
export function retrieveAvailableRoom (context, payload) {
  db.collection('houses')
    .where(
      'user_id',
      '==',
      payload
    )
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        var room = doc.data().available_room
        context.commit('retrieveAvailableRoom', room)
      })
    })
}

// retrive user paid boarders
export function retrievePaidBoarders (context, payload) {
  db.collection('houses')
    .where(
      'user_id',
      '==',
      payload
    )
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        var paid = doc.data().paid_boarders
        context.commit('retrievePaidBoarders', paid)
      })
    })
}

// retrive user house
export function retrieveHouseBoarders (context, payload) {
  db.collection('houses')
    .where(
      'user_id',
      '==',
      payload
    )
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        var numberOfBoarders = doc.data().boarders
        context.commit('retrieveHouseBoarders', numberOfBoarders)
      })
    })
}

// retrive user house
export function retrieveHouseId (context, payload) {
  db.collection('houses')
    .where(
      'user_id',
      '==',
      payload
    )
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        var id = doc.id
        context.commit('retrieveHouseId', id)
      })
    })
}

// retrive user house
export function retrieveDueDate (context, payload) {
  db.collection('houses')
    .where(
      'user_id',
      '==',
      payload
    )
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        var date = doc.data().due_date
        context.commit('retrieveDueDate', date)
      })
    })
}

export function verifyEmail (context) {
  let currentUser = firebase.auth().currentUser
  currentUser.sendEmailVerification({
    url: 'https://www.example.com/?email=' + currentUser.email,
    handleCodeInApp: true
  })
    .then(() => {
      // Verification email sent.
      console.log('Verification sent')
      console.log(currentUser.emailVerified)
    })
    .catch(error => {
      // Error occurred. Inspect error.code.
      console.log('Fail to send verification sent', error)
    })
}

// register user
export function registerUser (context, payload) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(() => {
      console.log('Register Succesfull')
      firebase
        .auth()
        .currentUser
        .updateProfile({
          displayName: payload.displayName
        }).then(() => {
          console.log('Profile Updated')

          // email verification
          var actionCodeSettings = {
            url: 'https://www.example.com/?email=' + firebase.auth().currentUser.email,
            handleCodeInApp: true
          }
          firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
            .then(() => {
              // Verification email sent.
              console.log('Verification sent')
              var user = firebase.auth().currentUser
              console.log(user.emailVerified)
            })
            .catch(error => {
              // Error occurred. Inspect error.code.
              console.log('Fail to send verification sent', error)
            })
        })
    })
}

// Login user
export function loginUser (context, payload) {
  return (
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
  )
}

// Logout user
export function logoutUser (context) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Logout successful')
    })
}

// retrieve user Id
export function retrieveUserId (context) {
  firebase.auth().onAuthStateChanged((user) => {
    context.commit('retrieveUserId', user.uid)
  })
}

// Add House
export function addHouse (context, payload) {
  db.collection('houses')
    .add({
      user_id: payload.user_id,
      house_name: payload.house_name,
      address: payload.address,
      near: payload.near,
      distance: payload.distance,
      contact_number1: payload.contact_number1,
      contact_number2: payload.contact_number2,
      details: 'Please add your house details for more information about your house',
      price_max: payload.price_max,
      price_min: payload.price_min,
      available_room: payload.available_room,
      wifi: payload.wifi,
      uploadedBy: payload.uploadedBy,
      images: payload.images
    }).then(docRef => {
      context.commit('addHouse', {
        user_id: payload.user_id,
        id: docRef.id,
        house_name: payload.house_name,
        address: payload.address,
        near: payload.near,
        distance: payload.distance,
        contact_number1: payload.contact_number1,
        contact_number2: payload.contact_number2,
        details: 'Please add your house details for more information about your house',
        price_max: payload.price_max,
        price_min: payload.price_min,
        available_room: payload.available_room,
        wifi: payload.wifi,
        uploadedBy: payload.uploadedBy,
        images: payload.images
      })
      console.log('Upload Successful')
    })
}

// add house image
export function addImage (context, payload) {
  db.collection('houseImages')
    .doc(payload.id)
    .collection('images')
    .add({
      image_url: payload.image
    }).then(docRef => {
      context.commit('addImage', {
        id: docRef.id,
        image_url: payload.image
      })
    })
}

// add google map image
export function addGoogleMap (context, payload) {
  db.collection('GoogleImages')
    .doc(payload.id)
    .collection('images')
    .add({
      image_url: payload.image
    }).then(docRef => {
      context.commit('addGoogleMap', {
        id: docRef.id,
        image_url: payload.image
      })
    })
}

// add user house image
export function userImage (context, payload) {
  db.collection('houseUserImages')
    .doc(payload.id)
    .collection('images')
    .add({
      image_url: payload.image
    }).then(docRef => {
      context.commit('addImage', {
        id: docRef.id,
        image_url: payload.image
      })
    })
}

// retrieve user house images
export function retrieveHouseImages (context, id) {
  db.collection('houseUserImages')
    .doc(id)
    .collection('images')
    .get()
    .then((querySnapshot) => {
      let payload = []
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          image_url: doc.data().image_url
        }
        payload.push(data)
      })
      context.commit('retrieveHouseImages', payload)
    })
}

// retrieve google map images
export function retrieveGoogleImages (context, id) {
  db.collection('GoogleImages')
    .doc(id)
    .collection('images')
    .get()
    .then((querySnapshot) => {
      let payload = []
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          image_url: doc.data().image_url
        }
        payload.push(data)
      })
      context.commit('retrieveGoogleImages', payload)
    })
}

// update house info
export function updateHouse (context, payload) {
  db.collection('houses')
    .doc(payload.id)
    .update({
      house_name: payload.house_name,
      address: payload.address,
      near: payload.near,
      distance: payload.distance,
      details: payload.details,
      price_max: payload.price_max,
      price_min: payload.price_min,
      available_room: payload.available_room,
      wifi: payload.wifi
    }).then(docRef => {
      context.commit('updateHouse', {
        id: docRef.id,
        house_name: payload.house_name,
        address: payload.address,
        near: payload.near,
        distance: payload.distance,
        details: payload.details,
        price_max: payload.price_max,
        price_min: payload.price_min,
        available_room: payload.available_room,
        wifi: payload.wifi
      })
      console.log('Upload Successful')
    })
}

// update due date
export function updateDueDate (context, payload) {
  db.collection('houses')
    .doc(payload.id)
    .update({
      due_date: payload.date
    }).then(() => {
      console.log('Document successfully updated!')
      context.commit('updateHouse', payload)
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error)
    })
}

// add boarders
export function addBoarder (context, payload) {
  db.collection('boarders')
    .add({
      owner_id: payload.owner_id,
      full_name: payload.full_name,
      address: payload.address,
      phone: payload.phone,
      rent: payload.rent,
      room: payload.room,
      balance: payload.balance,
      status: payload.status
    }).then(docRef => {
      context.commit('addBoarder', {
        id: docRef.id,
        owner_id: payload.owner_id,
        full_name: payload.full_name,
        address: payload.address,
        phone: payload.phone,
        rent: payload.rent,
        room: payload.room,
        balance: payload.balance,
        status: payload.status
      })
      console.log('Adding Boarders')
    })
}

// Update house boarders
export function updateHouseBoarders (context, payload) {
  db.collection('houses')
    .doc(payload.id)
    .update({
      boarders: Number(payload.boarder)
    }).then(() => {
      console.log('Document successfully updated!')
      context.commit('updateHouse', payload)
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error)
    })
}

// Update house boarders
export function updatePaidBoarders (context, payload) {
  db.collection('houses')
    .doc(payload.id)
    .update({
      paid_boarders: Number(payload.paidBoarders)
    }).then(() => {
      console.log('Document successfully updated!')
      context.commit('updateHouse', payload)
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error)
    })
}

// retrieve boarders
export function retrieveBoarders (context, payload) {
  db.collection('boarders').get()
    .then((querySnapshot) => {
      let payload = []
      querySnapshot.forEach(doc => {
        const houses = {
          id: doc.id,
          owner_id: doc.data().owner_id,
          full_name: doc.data().full_name,
          address: doc.data().address,
          phone: doc.data().phone,
          rent: doc.data().rent,
          room: doc.data().room,
          balance: doc.data().balance,
          status: doc.data().status
        }
        payload.push(houses)
      })
      context.commit('retrieveBoarders', payload)
    })
}

// update boarders
export function updateBoarders (context, payload) {
  db.collection('houses')
    .doc(payload.id)
    .update({
      owner_id: payload.owner_id,
      full_name: payload.full_name,
      address: payload.address,
      phone: payload.phone,
      rent: payload.rent,
      room: payload.room,
      balance: payload.balance,
      status: payload.status
    }).then(docRef => {
      context.commit('updateBoarders', {
        owner_id: payload.owner_id,
        full_name: payload.full_name,
        address: payload.address,
        phone: payload.phone,
        rent: payload.rent,
        room: payload.room,
        balance: payload.balance,
        status: payload.status
      })
      console.log('Upload Successful')
    })
}

// update balance
export function updateBalance (context, payload) {
  db.collection('boarders')
    .doc(payload.id)
    .update({
      balance: payload.balance,
      status: payload.status
    }).then(() => {
      context.commit('updateBoarders', payload)
    }).catch(error => {
      console.log(error)
    })
}

// retrive single boarder
export function retrieveSingleBoarder (context, payload) {
  db.collection('boarders')
    .where(
      firebase.firestore.FieldPath.documentId(),
      '==',
      payload
    )
    .get()
    .then((querySnapshot) => {
      let payload = []
      querySnapshot.forEach(doc => {
        const singleBoarder = {
          id: doc.id,
          owner_id: doc.data().owner_id,
          full_name: doc.data().full_name,
          address: doc.data().address,
          phone: doc.data().phone,
          rent: doc.data().rent,
          room: doc.data().room,
          balance: doc.data().balance,
          status: doc.data().status
        }
        payload.push(singleBoarder)
      })
      context.commit('retrieveSingleBoarder', payload)
    })
}
