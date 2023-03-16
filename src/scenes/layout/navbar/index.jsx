import { useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Flex,
  HStack,
  useDisclosure,
  Icon,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { GoFile } from "react-icons/go";
import NavLink from "components/Navlink";
import { useIsAuthenticatedQuery, useLogoutUserMutation } from "state/authApi";
import MobileNav from "./MobileNav";
import SettingsMenu from "./SettingsMenu";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logoutUser] = useLogoutUserMutation();
  const { data: isAuthenticated } = useIsAuthenticatedQuery();
  const btnRef = useRef(null);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      navigate("/home");
      window.location.reload();
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  const links = isAuthenticated
    ? [
        { name: "Home", path: "/home" },
        { name: "Resumize", path: "/resumize" },
        { name: "Files", path: "/files" },
        { name: "About", path: "/about" },
      ]
    : [
        { name: "Home", path: "/home" },
        { name: "About", path: "/about" },
        { name: "Login", path: "/login" },
      ];

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
      bg={useColorModeValue("white", "purple.700")}
      position="fixed"
      h="var(--navbar-height)"
      w="full"
      zIndex="docked"
    >
      <Button
        leftIcon={<FiMenu />}
        display={{ base: "block", md: "none" }}
        onClick={() => (isOpen ? onClose() : onOpen())}
        variant="ghost"
        size="md"
        aria-label="Open navigation"
        ref={btnRef}
      />
      <HStack
        alignItems="center"
        justifyContent="flex-start"
        as={RouterLink}
        to="/home"
      >
        <Icon as={GoFile} boxSize="25px" position="absolute" transform={"translateX(-20px)"} />
        <Text>Resumize</Text>
      </HStack>
      <HStack display={{ base: "none", md: "flex" }} spacing="5">
        {links.map((link) => (
          <NavLink key={link.path} to={link.path}>
            {link.name}
          </NavLink>
        ))}
        <SettingsMenu isDesktop={true} logoutHandler={logoutHandler} />
      </HStack>
    </Flex>

    {/* MOBILE NAV MENU */}
    <MobileNav
      isOpen={isOpen}
      onClose={onClose}
      links={links}
      logoutHandler={logoutHandler}
      isDesktop={false}
    />
  </>
);
}

export default Navbar