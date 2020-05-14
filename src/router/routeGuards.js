// import store from '../store'
import { auth } from 'firebase'

export const requireAuth = async (to, from, next) => {
  // const Store = store()
  console.log(to, from, next)
  console.log('Checking if user is Signed In')

  const currentUser = auth().currentUser
  console.log(currentUser)
  auth().onAuthStateChanged((user) => {
    if (!user) {
      console.log('User is not Signed In')
      next('/login')
    } else {
      console.log('User is Signed In')
      console.log(user)
      console.log('Checking if email is Verified!')
      if (user.emailVerified) {
        console.log('Email is Verified!')
        next()
      } else {
        console.log('Email is not Verified!')
        next('/verify')
      }
    }
  })
  console.log('DONE AUTH')
}
