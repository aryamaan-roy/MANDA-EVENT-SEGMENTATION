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

import { CContainer } from '@coreui/react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { storage } from '../../firebase1'
import { uploadBytes, listAll } from 'firebase/storage'
import db from '../../firebase1'
import { CForm } from '@coreui/react'

// import { forEach } from 'core-js/core/array'
const Camera = (props) => {
  const location = useLocation()
  const [show_load_message, setShow_load_message] = useState(true)
  const [time_stamps, setTime_stamps] = useState([])
  // const [v, setV] = useState(false)
  var today = new Date()
  if (today.getMonth() < 10) {
    var new_month = '0' + (today.getMonth() + 1)
  } else {
    var new_month = today.getMonth() + 1
  }
  if (today.getDate() < 10) {
    var new_Date = '0' + today.getDate()
  } else {
    var new_Date = today.getDate()
  }

  var date = new_Date + '/' + new_month + '/' + today.getFullYear()
  var currTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

  var currDate = date + ' ' + currTime
  var count = 1

  const output1 = document.querySelector('#output1')
  const [age, setAge] = React.useState('')

  const change_className = (e, index) => {
    all_image_info[index]['class_name'] = e.target.value
    document
      .getElementById(all_image_info[index]['name'] + 'class')
      .setAttribute('value', e.target.value)
    //document.getElementById(all_image_info[index]['name'] + 'class').style.value = e.target.value
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
        <ResponsiveAppBar />
        <br /><br />
    </>
  )
}

export default Camera
