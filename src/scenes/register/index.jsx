import { useState } from 'react';
import {
  Flex,
  Box,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  ButtonGroup,
} from '@chakra-ui/react';
import { useRegisterUserMutation } from 'state/authApi';
import { useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import LoginCredentials from './LoginCredentials';
import { Progress } from '@chakra-ui/react';
import useCustomToast from 'hooks/useCustomToast';

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
    city:'',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const customToast = useCustomToast();
  const [isValidUserInfo, setIsValidUserInfo] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePostalCode = (postalCode) => {
    const postalCodeRegex = /^[0-9-()+]+$/;
    return postalCodeRegex.test(postalCode);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9-()+]+$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const sanitizeInput = (input) => {
    return input.replace(/[-()]/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      showPasswordMismatchToast();  
      return;
    }

      if (!validatePostalCode(formData.postalCode)) {
    customToast({
      title: 'Error',
      description: 'Postal code must contain numbers only.',
      status: 'error',
    });
    return;
  }

  if (!validatePhoneNumber(formData.phone)) {
    customToast({
      title: 'Error',
      description: 'Phone number must contain numbers only.',
      status: 'error',
    });
    return;
  }

    // Combine the address fields into a single string
    const fullAddress = `${formData.street}, ${formData.apt}, ${formData.city}, ${formData.state}, ${formData.postalCode}, ${formData.country}`;

    // Include the fullAddress in the data sent to the backend
    const registerData = {
      ...formData,
      address: fullAddress,
      phone: sanitizeInput(formData.phone),
    };

    console.log(registerData)

    try {
      await registerUser(registerData).unwrap();
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
        street: '',
        apt: '',
        city:'',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
      });
      navigate('/home');

      customToast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
    });
    } catch (err) {
      console.error('Registration error:', err);
      customToast({
      title: 'Account not created.',
      description: `${error.data.message}`,
      status: 'error',
    });
    }
  };

  const showPasswordMismatchToast = () => {
  customToast({
    title: 'Error.',
    description: 'Passwords do not match.',
    status: 'error',
  });
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
          <Progress hasStripe value={progress} mb="5%" isAnimated />
          {step === 1 ? (
            <UserInfo handleChange={handleChange} setIsValidUserInfo={setIsValidUserInfo} formData={formData}/>
          ) : (
            <LoginCredentials
              handleChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              formData={formData}
            />
          )}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <HStack spacing="5%">
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 50);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                >
                  Back
                </Button>
                {step !== 2 && (
                <Button
                  w="7rem"
                  isDisabled={(step === 1 && !isValidUserInfo) || step === 2}
                  onClick={() => {
                    setStep(step + 1);
                    setProgress(progress + 50);
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
                )}
              </HStack>
              {step === 2 && (
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
              )}
            </Flex>
          </ButtonGroup>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;