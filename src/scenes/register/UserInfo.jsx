import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from '@chakra-ui/react';

const UserInfo = ({handleChange,setIsValidUserInfo,formData}) => {
    const checkFormValidity = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    const requiredFields = [
        "firstname",
        "lastname",
        "phone",
        "street",
        "state",
        "postalCode",
        "country",
    ];

    if (requiredFields.includes(name) && value.trim() !== "") {
        setIsValidUserInfo(
        requiredFields.every((field) => formData[field].trim() !== "")
        );
    } else {
        setIsValidUserInfo(false);
    }
    };
  return (
    <>
    <HStack>
    <Box>
        <FormControl id="firstname" isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
            type="text"
            name="firstname"
            onChange={checkFormValidity}
            placeholder="John"
            _placeholder={{ color: 'gray.500' }}
            value={formData.firstname}
        />
        </FormControl>
    </Box>
    <Box>
        <FormControl id="lastname" isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
            type="text"
            name="lastname"
            onChange={checkFormValidity}
            placeholder="Doe"
            _placeholder={{ color: 'gray.500' }}
            value={formData.lastname}
        />
        </FormControl>
    </Box>
    </HStack>
<FormControl id="phone" isRequired>
    <FormLabel>Phone number</FormLabel>
    <Input
        type="tel"
        name="phone"
        onChange={checkFormValidity}
        placeholder="(123) 456-7890"
        _placeholder={{ color: 'gray.500' }}
        value={formData.phone}
    />
    </FormControl>
    <FormControl id="street" isRequired>
    <FormLabel>Street</FormLabel>
    <Input
        type="text"
        name="street"
        onChange={checkFormValidity}
        placeholder="123 Main St"
        _placeholder={{ color: 'gray.500' }}
        value={formData.street}
    />
    </FormControl>
            <HStack>
    <FormControl id="apt">
        <FormLabel>Apt/Unit</FormLabel>
        <Input
        type="text"
        name="apt"
        onChange={checkFormValidity}
        placeholder="Apt 4B"
        _placeholder={{ color: 'gray.500' }}
        value={formData.apt}
        />
    </FormControl>
    <FormControl id="state" isRequired>
        <FormLabel>State</FormLabel>
        <Input
        type="text"
        name="state"
        onChange={checkFormValidity}
        placeholder="CA"
        _placeholder={{ color: 'gray.500' }}
        value={formData.state}
        />
    </FormControl>
    <FormControl id="postalCode" isRequired>
    <FormLabel>Zip</FormLabel>
        <Input
        type="text"
        name="postalCode"
        onChange={checkFormValidity}
        placeholder="12345"
        _placeholder={{ color: 'gray.500' }}
        value={formData.postalCode}
        />
    </FormControl>
    </HStack>
            <FormControl id="country" isRequired>
    <FormLabel>Country</FormLabel>
    <Input
        type="text"
        name="country"
        onChange={checkFormValidity}
        placeholder="United States"
        _placeholder={{ color: 'gray.500' }}
        value={formData.country}
    />
    </FormControl>
    </>
  )
}

export default UserInfo