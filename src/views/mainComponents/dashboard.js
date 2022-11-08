/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useRef } from 'react'
import ResponsiveAppBar from './nav.js'
import SpacingGrid from './grids.js'
//MUI

import Modal from '@mui/material/Modal'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
//import './Home.css'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { CContainer } from '@coreui/react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { storage } from '../../firebase1'
import { uploadBytes, listAll } from 'firebase/storage'
import db from '../../firebase1'
import { CForm } from '@coreui/react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { forEach } from 'core-js/core/array'
const Dashboard = (props) => {
  const navigate = useNavigate()

  const [proper_date, setDate] = useState('Not set')
  //const [all_image_info, setImage_info] = useState()
  const [show_full_image, setShow_full_image] = useState(false)
  const [full_image_url, setFull_image_url] = useState('')
  const [all_image_info, setImage_info] = useState([{}])
  const [initial_path, setInitial_path] = useState('')
  const [time_stamp_selected, setTime_stamp_selected] = useState(0)

  // The use effect module will obtain the image info from the database and store it in the state variable all_image_info.
  const newuserHandler = () => {
    console.log('load_button')
  }
  const clearuserHandler = () => {
    console.log('load_button')
  }
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user)
        //alert('Welcome ' + user.email + ' !!!')
      } else {
        console.log('No user')
        navigate('/')
      }
    });
  }, [])
  return (
    <>
        <ResponsiveAppBar />
        <br /><br />
        <SpacingGrid />
    </>
  )
}

export default Dashboard
