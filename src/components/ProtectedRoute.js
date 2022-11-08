/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Routes, Router, BrowserRouter, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ user, redirectPath = '/', children, type, typeCheck }) => {
  // || type !== typeCheck
  if (!user || type !== typeCheck) {
    // if (type !== typeCheck) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
