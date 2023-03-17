import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const LoginCredentials = ({handleChange,showPassword,setShowPassword,formData}) => {
  return (
    <>
        <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            value={formData.email}
        />
        </FormControl>
        <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
            <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            value={formData.password}
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
            value={formData.password2}
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
    </>
  )
}

export default LoginCredentials