import React from 'react'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

/* COMPONENTS */
// import Navbar from 'components/Navbar'
import Navbar from './navbar'

const Layout = () => {
  return (
    <Box minHeight="100vh">
      <Navbar />
      <Box
        minHeight="calc(100vh - var(--navbar-height))"
        pt="var(--navbar-height)"
        width="full"
        overflow='hidden'
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout