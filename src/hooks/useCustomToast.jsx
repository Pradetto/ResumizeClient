// hooks/useCustomToast.js
import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description,
    status,
    duration = 3000,
    isClosable = true,
    position = "bottom",
  }) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
      position,
    });
  };

  return showToast;
};

export default useCustomToast;
