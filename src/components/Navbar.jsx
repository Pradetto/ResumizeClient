import { useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
  Icon,
  Text,
  Button,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
// import { useTheme } from "@chakra-ui/react";
// import MP_IMAGE from 'assets/MP.png'
import { SettingsIcon } from "@chakra-ui/icons";
import { FiSettings } from "react-icons/fi";
import {GoFile} from "react-icons/go"

import NavLink from "./Navlink";
import { useIsAuthenticatedQuery, useLogoutUserMutation, useInvalidateTags } from "state/authApi";
import { authApi } from "state/authApi";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logoutUser, {isLoading:logoutIsLoading,error:logoutError}] = useLogoutUserMutation()
  const {data,isLoading,error,refetch}= useIsAuthenticatedQuery()
  const btnRef = useRef(null)
  const navigate = useNavigate()
const { invalidateTags } = authApi.util;

  const linksLoggedOut = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    {name: "Login", path: "/login"}
  ];

  const linksLoggedIn = [
    { name: "Home", path: "/home" },
    { name: "Resumize", path: "/resumize" },
    { name: "Files", path: "/files" },
    { name: "About", path: "/about" },
  ]

  const logoutHandler = async () => {
    try{
      await logoutUser()
      navigate('/home')
      window.location.reload(); // Force a hard reload of the page
    } catch(err){
      console.error('Error logging out',err)
    }
  }

  const links = data ? linksLoggedIn : linksLoggedOut;
  console.log('HERE IS LOGOUT DATA', data)
return (
  <>
  {/* NAVBAR */}
    <Flex
      as="header"
      py="4"
      px={{ base: "4", md: "8" }}
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth="1px"
      bg={useColorModeValue("white","purple.700")}
      position="fixed"
      h="var(--navbar-height)"
      w="full"
      zIndex="docked"
    >
      <Button
        leftIcon={<FiMenu />}
        display={{ base: "block", md: "none" }}
        onClick={() => isOpen ? onClose():onOpen()}
        variant="ghost"
        // icon={<FiMenu />}
        size="md"
        aria-label="Open navigation"
        ref={btnRef}

      />
      <HStack alignItems='center' justifyContent='flex-start' as={RouterLink} to='/contact'>
        <Icon as={GoFile} boxSize='25px' position='absolute' transform={"translateX(-20px)"} />
        <Text>Resumize</Text>        
      </HStack>
      <HStack display={{ base: "none", md: "flex" }} spacing="5">
        {links.map((link) => (
          <NavLink key={link.path} to={link.path}>
            {link.name}
          </NavLink>
        ))}
        {data && <NavLink to='/login' onClick={logoutHandler}>Logout</NavLink>}
        <IconButton
          variant="ghost"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
          size="md"
          aria-label="Toggle color mode"
        />
        <IconButton
          variant="ghost"
          // onClick={toggleColorMode}
          icon={<SettingsIcon/>}
          size="md"
          aria-label="Setting"
          mt="auto"
          mx="auto"
        />
      </HStack>
    </Flex>

    {/* MOBILE NAV MENU */}
    <Box
      as="nav"
      pos="fixed"
      top="var(--navbar-height)"
      left="0"
      w="100vw"
      h="full"
      display={isOpen ? "flex" : "none"}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      // bg={useColorModeValue("white", theme.colors.purple["800"])}
      bg={"blackAlpha.600"}
      pb="10"
      overflowY="auto"
      zIndex="dropdown"
    >
      <VStack>
      {links.map((link) => (
        <NavLink key={link.path} to={link.path} onClose={onClose}>
          {link.name}
        </NavLink>
      ))}

      <IconButton
        variant="ghost"
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        size="md"
        aria-label="Toggle color mode"
        mt="auto"
        mx="auto"
      />
      <IconButton
        variant="ghost"
        // onClick={toggleColorMode}
        icon={<SettingsIcon/>}
        size="md"
        aria-label="Setting"
        mt="auto"
        mx="auto"
      />
      </VStack>
    </Box>
  </>
);
};

export default Navbar;

