import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import React, { useState } from 'react'
import { useForgotPasswordMutation } from 'state/authApi';
import useCustomToast from 'hooks/useCustomToast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [forgotPassword, {error}] = useForgotPasswordMutation()
  const customToast = useCustomToast()


  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async () =>{
    try{
      console.log(email)
      await forgotPassword({email})
      setEmail('')
      customToast({
        title: 'Password reset request sent',
        description: 'Check your email for further instructions.',
        status: 'success',
      });
    } catch(err){
      console.error("Forgot Password error:",err)
      customToast({
        title: 'Forgot Password error',
        description: error.data.message,
        status: 'error',
      });
    }
  }
return (
    <Flex
      minH={'var(--main-container-height)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={handleEmail}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
          onClick={handleSubmit}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword