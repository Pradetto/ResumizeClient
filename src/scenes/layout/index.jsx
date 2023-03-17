import React from 'react'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

/* COMPONENTS */
import Navbar from './navbar'

const Layout = () => {
  console.log('Clean up navbar colors from purple on hover')
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