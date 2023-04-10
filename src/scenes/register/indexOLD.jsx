import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  useBreakpointValue,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRegisterUserMutation } from 'state/authApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [registerUser, { isLoading, error, data }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    street: '',
    apt: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const navigate = useNavigate();
  const [passwordNotMatch, setPasswordNotMatch] = useState('');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setPasswordNotMatch('Passwords do not match');
      return;
    } else {
      setPasswordNotMatch('');
    }

    // Combine the address fields into a single string
    const fullAddress = `${formData.street}, ${formData.apt}, ${formData.state}, ${formData.postalCode}, ${formData.country}`;

    // Include the fullAddress in the data sent to the backend
    const registerData = {
      ...formData,
      address: fullAddress,
    };

    try {
      const response = await registerUser(registerData).unwrap();
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
        street: '',
        apt: '',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
      });
      navigate('/home');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
  <Flex
    minH={'var(--main-container-height)'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={'lg'} color={useColorModeValue('gray.800', 'gray.400')}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
        as={'form'}
        onSubmit={handleSubmit}
      >
        {passwordNotMatch && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {passwordNotMatch}
          </Alert>
        )}
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error.data.message}
          </Alert>
        )}
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstname" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  placeholder="John"
                  _placeholder={{ color: 'gray.500' }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastname">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  placeholder="Doe"
                  _placeholder={{ color: 'gray.500' }}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone number</FormLabel>
            <Input
              type="tel"
              name="phone"
              onChange={handleChange}
              placeholder="(123) 456-7890"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="street" isRequired>
            <FormLabel>Street</FormLabel>
            <Input
              type="text"
              name="street"
              onChange={handleChange}
              placeholder="123 Main St"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <HStack>
            <FormControl id="apt">
              <FormLabel>Apt/Unit</FormLabel>
              <Input
                type="text"
                name="apt"
                onChange={handleChange}
                placeholder="Apt 4B"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="state" isRequired>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                name="state"
                onChange={handleChange}
                placeholder="CA"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="postalCode" isRequired>
                            <FormLabel>Postal Code</FormLabel>
              <Input
                type="text"
                name="postalCode"
                onChange={handleChange}
                placeholder="12345"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
          </HStack>
          <FormControl id="country" isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              name="country"
              onChange={handleChange}
              placeholder="United States"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={handleChange}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password2" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password2"
                onChange={handleChange}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              type="submit"
              isDisabled={isLoading || data}
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
);
}


export default Register