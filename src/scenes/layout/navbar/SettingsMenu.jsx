import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { SettingsIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useIsAuthenticatedQuery } from "state/authApi";
import { useContactInfoQuery } from "state/formApi";

const SettingsMenu = ({ logoutHandler, onClose, isDesktop }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {data:isAuthenticated} = useIsAuthenticatedQuery()
  const {data:user} = useContactInfoQuery()
  // console.log(user)

  const handleClose = () => {
    if (onClose && !isDesktop) {
      onClose();
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
        <Icon boxSize={"0.875rem"} as={SettingsIcon} />
      </MenuButton>
      <MenuList>
        {isAuthenticated && <>
        <MenuItem as={RouterLink} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem as={RouterLink} to="/resetpassword" onClick={handleClose}>
          Update Password
        </MenuItem>
        <MenuDivider />
        <MenuItem >
          {/* Tokens: {Number(user.tokens_remaining)} */}
        </MenuItem>
        <MenuDivider />
        </>}
        <MenuItem onClick={() => {
          toggleColorMode();
          handleClose();
        }}>
          <Flex alignItems="center">
            <Icon
              as={colorMode === "dark" ? FaSun : FaMoon}
              boxSize="0.875rem"
              aria-label="Toggle color mode"
              mr={2}
            />
            {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
          </Flex>
        </MenuItem>
        {isAuthenticated && <>
        <MenuDivider />
        <MenuItem as={RouterLink} to="/logout" onClick={() => {
          logoutHandler();
          handleClose();
        }}>
          Logout
        </MenuItem>
        </>}
      </MenuList>
    </Menu>
  );
};

export default SettingsMenu;
