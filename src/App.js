import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Routes, Router, BrowserRouter } from 'react-router-dom'
//import './scss/style.scss'
import { auth } from './firebase'
import db from './firebase1'
import { func } from 'prop-types'
import { AppContentComp} from 'src/components/index'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Team - 21
// Containers
const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute'))
const DefaultLayoutComp = React.lazy(() => import('./layout/DefaultLayoutComp'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/login'))
const Dashboard = React.lazy(() => import('./views/mainComponents/dashboard'))
const SignUp = React.lazy(() => import('./views/pages/signup/signup'))
const Grid2 = React.lazy(() => import('./views/mainComponents/grid2'))
const Label  = React.lazy(() => import('./views/mainComponents/label'))
const Images = React.lazy(() => import('./views/mainComponents/images'))
function App() {
  // different users
  const [mobileUsers, setMobileUsers] = useState([])
  const [bizUsers, setBizUsers] = useState([])
  const [customersData1, setCustomersData1] = useState([])
  const [type, setType] = useState(null)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [company, setCompany] = useState(null)
  useEffect(() => {
    db.collection('account_details')
      .doc('Dashboard')
      .collection('Accounts')
      .onSnapshot((snapshot) => {
        setCustomersData1(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        )
      })
  }, [])

  useEffect(() => {
    customersData1.map(({ id, data }) => {
      if (data.email === email) {
        //console.log('email matched :' + email)
        setType(data.type)
      }
      if (data.type === 'client') {
        setCompany(data.company_name)
      }
    })
  }, [customersData1, bizUsers, mobileUsers, email, company])

  console.log('company', company)

  useEffect(() => {
    var unsubscribe = auth.onAuthStateChanged((userAuth) => {
      var user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
        type: userAuth?.type,
      }
      if (userAuth) {
        console.log(userAuth)
        setUser(user)
        setEmail(user.email)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])

  var mail = ''
  var name = ''
  if (user) {
    name = user.email.substring(0, user.email.indexOf('@'))
    var txt = user.email.substring(user.email.indexOf('@'))
    mail = user.email
    name = name.charAt(0).toUpperCase() + name.slice(1)
  } else {
    name = null
    mail = null
  }
  console.log(name)

  return (
    <div className="App">
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" element={<Login user={mail} />} />
            <Route exact path="/SignUp" element={<SignUp user={mail} />} />
            <Route exact path="/Dashboard" element={<Dashboard user={mail} />} />
            <Route exact path="/Grid2" element={<Grid2 user={mail} />} />
            <Route exact path="/LABELS" element={<Label user={mail} />} />
            <Route exact path="/IMAGES" element={<Images user={mail} />} />
            {/* <Route exact path="/" element={<Dashboard user={mail} />}></Route> */}
            <Route
              path="company/*"
              element={
                <ProtectedRoute user={name} type={type} typeCheck="biz">
                  {/* <DefaultLayoutComp mail={name} /> */}
                  <AppContentComp  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </React.Suspense>
      </HashRouter>
    </div>
  )
}

export default App
