import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useIsAuthenticatedQuery, useLoginUserMutation } from "state/authApi";
import useCustomToast from "hooks/useCustomToast";
import useLogout from "hooks/useLogout";

const Login = () => {
  const [loginUser, {error, data}] = useLoginUserMutation()
  const {data: isAuthenticated} = useIsAuthenticatedQuery()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate()
  const customToast = useCustomToast();
  const logoutHandler = useLogout()

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap()
      console.log('Login User',response)
      setFormData({email: "", password: "",remember: false})
      navigate('/home')

      customToast({
      title: "Logged in",
      description: "You have successfully logged in.",
      status: "success",
      });
    } catch (err) {
      console.error("Login error:", err);
      customToast({
      title: "Login error",
      description: `${error.data.message}`,
      status: "error",
      });
    }
  };
  return (
    <Flex
      minH={"var(--main-container-height)"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool features ✌️
            </Text>
        </Stack>
        <Box as='form' rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8} onSubmit={handleSubmit}>
            <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={handleChange} placeholder='your-email@example.com' _placeholder={{ color: 'gray.500' }}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox name="remember" onChange={handleChange} isChecked={formData && formData.remember}>
                  Remember me
                </Checkbox>
                <Link as={RouterLink} to='/forgotpassword' color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                type='submit'
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isDisabled={isAuthenticated}
              >
                Sign in
              </Button>
              {isAuthenticated && (
                <Alert status="warning">
                  <AlertIcon />
                  Seems you are already signed in.&nbsp;
                  <Button
                    variant="link"
                    colorScheme="blue"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </Alert>
              )}
            </Stack>
                <Stack pt={6}>
                <Text align={'center'}>
                    Don't have an account? <Link as={RouterLink} to='/register' color={'blue.400'}>Sign up</Link>
                </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;