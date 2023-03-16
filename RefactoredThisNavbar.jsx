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
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
// import { useTheme } from "@chakra-ui/react";
// import MP_IMAGE from 'assets/MP.png'
import { SettingsIcon } from "@chakra-ui/icons";
import { FiSettings } from "react-icons/fi";
import {GoFile} from "react-icons/go"

import NavLink from "./src/components/Navlink";
import { useIsAuthenticatedQuery, useLogoutUserMutation, useInvalidateTags } from "state/authApi";
import { authApi } from "state/authApi";


const offsetModifier = {
  name: 'offset',
  options: {
    offset: [0, 8], // Change the numbers to control the offset (x, y) between the popper and the reference element.
  },
};


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logoutUser, {isLoading:logoutIsLoading,error:logoutError}] = useLogoutUserMutation()
  const {data,isLoading,error,refetch}= useIsAuthenticatedQuery()
  const btnRef = useRef(null)
  const navigate = useNavigate()
// const { invalidateTags } = authApi.util;

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
      <HStack alignItems='center' justifyContent='flex-start' as={RouterLink} to='/home'>
        <Icon as={GoFile} boxSize='25px' position='absolute' transform={"translateX(-20px)"} />
        <Text>Resumize</Text>        
      </HStack>
      <HStack display={{ base: "none", md: "flex" }} spacing="5">
        {links.map((link) => (
          <NavLink key={link.path} to={link.path}>
            {link.name}
          </NavLink>
        ))}
      <Menu popperModifiers={[offsetModifier]}>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
        >
          <Icon
            boxSize={'0.875rem'}
            as={SettingsIcon}
          />
        </MenuButton>
        <MenuList>
          {data &&
          <>
          <MenuItem as={RouterLink} to='/profile'>Profile</MenuItem>
          <MenuItem as={RouterLink} to='/resetpassword'>Update Password</MenuItem>
          <MenuDivider />
          </>
          }
          <MenuItem onClick={toggleColorMode}>
            <Flex alignItems="center">
              <Icon
                as={colorMode === "dark" ? FaSun : FaMoon}
                boxSize="0.875rem"
                aria-label="Toggle color mode"
                mr={2} // Set the margin right for proper spacing
              />
              {colorMode === 'dark' ? "Light Mode" : "Dark Mode"}
            </Flex>
          </MenuItem>
          {data &&
          <>
          <MenuDivider />
          <MenuItem as={RouterLink} to='/logout' onClick={logoutHandler}>Logout</MenuItem>
          </>
          }
        </MenuList>
      </Menu>
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
      // bg={"blackAlpha.600"}
      pb="10"
      overflowY="auto"
      zIndex="dropdown"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <VStack >
      {links.map((link) => (
        <NavLink key={link.path} to={link.path} onClose={onClose}>
          {link.name}
        </NavLink>
      ))}
      <Menu popperModifiers={[offsetModifier]}>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
        >
          <Icon
            boxSize={'0.875rem'}
            as={SettingsIcon}
          />
        </MenuButton>
        <MenuList>
          {data &&
          <>
          <MenuItem as={RouterLink} to='/profile' onClick={onClose}>Profile</MenuItem>
          <MenuItem as={RouterLink} to='/resetpassword' onClick={onClose}>Update Password</MenuItem>
          <MenuDivider />
          </>
          }
          <MenuItem onClick={() =>{toggleColorMode(); onClose();}} >
            <Flex alignItems="center">
              <Icon
                as={colorMode === "dark" ? FaSun : FaMoon}
                boxSize="0.875rem"
                aria-label="Toggle color mode"
                mr={2} // Set the margin right for proper spacing
              />
              {colorMode === 'dark' ? "Light Mode" : "Dark Mode"}
            </Flex>
          </MenuItem>
          {data &&
          <>
          <MenuDivider />
          <MenuItem as={RouterLink} to='/logout' onClick={() => {logoutHandler(); onClose();}}>Logout</MenuItem>
          </>
          }
        </MenuList>
      </Menu>
      </VStack>
    </Box>
  </>
);
};

export default Navbar;



