import { useColorModeValue } from "@chakra-ui/react";
import { useLocation, NavLink as RouterNavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";


const NavLink = ({ to, children, onClose,onClick }) => {
  const activeColor = useColorModeValue("purple.600", "purple.200");
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const hoverBg = useColorModeValue("purple.100", "purple.900");

  const handleClick = () => {
    if (onClose){
      onClose()
    }
    if (onClick){
      onClick()   
    }
  }
  return (
      <Box
      as={RouterNavLink}
      to={to}
        px={2}
        py={1}
        borderRadius="md"
        color={isActive ? activeColor : "gray.400"}
        _hover={{
          textDecoration: "none",
          bg: hoverBg,
        }}
        className={isActive ? "active" : ""}
        onClick={(onClick || onClose) ? handleClick : undefined}
      >
        {children}
      </Box>
  );
};

export default NavLink