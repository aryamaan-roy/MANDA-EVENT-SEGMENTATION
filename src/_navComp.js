import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navComp = [
  {
    component: CNavGroup,
    name: 'Company',
    to: '/company',
    items: [
      {
        component: CNavItem,
        name: 'Dashboard Users',
        to: '/company/operations',
      },
    ],
  },
]

export default _navComp
