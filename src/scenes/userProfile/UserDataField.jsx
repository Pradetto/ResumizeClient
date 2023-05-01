import { HStack, Text } from "@chakra-ui/react";

const UserDataField = ({ label, value }) => {
  if (!value) {
    return null;
  }

  return (
    <HStack>
      <Text fontWeight="bold">{label}:</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default UserDataField;