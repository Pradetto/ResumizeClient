import { Box, VStack, useColorModeValue } from "@chakra-ui/react";
import NavLink from "components/Navlink";
import SettingsMenu from "./SettingsMenu";

const MobileNav = ({ isOpen, onClose, links, logoutHandler, isDesktop }) => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="var(--navbar-height)"
      left="0"
      w="100vw"
      h="full"
      display={isDesktop ? "none" : isOpen ? "flex" : "none"}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      pb="10"
      overflowY="auto"
      zIndex="dropdown"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <VStack>
        {links.map((link) => (
          <NavLink key={link.path} to={link.path} onClose={onClose}>
            {link.name}
          </NavLink>
        ))}
        <SettingsMenu logoutHandler={logoutHandler} onClose={onClose} isDesktop={isDesktop} />
      </VStack>
    </Box>
  );
};

export default MobileNav;
