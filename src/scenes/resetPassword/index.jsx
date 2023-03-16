import { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useIsAuthenticatedQuery } from 'state/authApi';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ email: '', password: '', password2: '' });
  const [passwordNotMatch, setPasswordNotMatch] = useState('');
  const { data: isAuthenticated } = useIsAuthenticatedQuery();
  const error = null; // get errors if the submit did not go through have to do some dynamic render for both the JWT auth or logged in auth
  const [showPassword, setShowPassword] = useState(false);

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

    if (isAuthenticated) {
      // USER LOGGED IN AND WANTS TO UPDATE
    } else {
      // THIS USER FORGOT PASSWORD EXTRACT JWT TOKEN
    }

    console.log('Here is the Reset Form Data', formData);
  };
  return (
  <Flex
    minH={'var(--main-container-height)'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Stack
      as='form'
      onSubmit={handleSubmit}
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}
    >
    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
      Reset Password?
    </Heading>
    <Text fontSize={'lg'} color={useColorModeValue('gray.800', 'gray.400')}>
      Enter new password.
    </Text>
      {passwordNotMatch && (
        <Alert status='error' mb={4}>
          <AlertIcon />
          {passwordNotMatch}
        </Alert>
      )}
      {error && (
        <Alert status='error' mb={4}>
          <AlertIcon />
          {error.data.message}
        </Alert>
      )}
      <FormControl id='email' isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder='your-email@example.com'
          _placeholder={{ color: 'gray.500' }}
          type='email'
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            onChange={handleChange}
          />
          <InputRightElement h={'full'}>
            <Button
              variant={'ghost'}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='password2' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password2'
            onChange={handleChange}
          />
          <InputRightElement h={'full'}>
            <Button
              variant={'ghost'}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack spacing={6}>
        <Button
          type='submit'
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  </Flex>
);
}

export default ResetPassword