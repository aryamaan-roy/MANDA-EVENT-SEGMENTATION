/* eslint-disable react/prop-types */
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
const Dashboard = React.lazy(() => import('../views/mainComponents/dashboard'))
const AppContentComp = (props) => {
  // const routeComponents = routes.map(({ path, component }, key) => (
  //   <Route exact path={path} element={component} key={key} />
  // ))
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route exact path="mobile-users" element={<Dashboard mail={props.mail} />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContentComp)
