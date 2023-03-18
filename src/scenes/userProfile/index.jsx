import {
  Container,
  VStack,
  Text,
  useColorModeValue,
  Avatar,
  Stack,
  Link,
  Icon,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useContactInfoQuery } from "state/generalApi";
import UserDataField from "./UserDataField";
import { useMemo } from "react";
import Error from "components/Error";
import Loading from "components/Loading";
import DeleteProfileModal from "./DeleteProfileModal";

const UserProfile = () => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const {data:user,isLoading,error} = useContactInfoQuery()

  // const user = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john.doe@example.com",
  //   currentTokens: 100,
  //   phoneNumber: "817-676-8533",
  //   address: "123 Main St, Anytown, USA",
  //   job: "Software Engineer",
  //   linkedIn: "https://www.linkedin.com/in/johndoe",
  //   website: "https://www.johndoe.com",
  //   github: "https://github.com/johndoe",
  //   twitter: "https://twitter.com/johndoe",
  // };

    const optionalFields = useMemo(() => {
    return {
      linkedIn: {
        label: "LinkedIn",
        icon: FaLinkedin,
      },
      website: {
        label: "Website",
        icon: ExternalLinkIcon,
      },
      github: {
        label: "GitHub",
        icon: FaGithub,
      },
      twitter: {
        label: "Twitter",
        icon: FaTwitter,
      },
    };
  }, []);

  if (isLoading){
    return <Loading/>
  }
  if (error){
    return <Error/>
  }


  return (
    <Container
      minHeight="calc(100vh - 72px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      px={8}
    >
      <VStack spacing={4} width="100%" maxWidth="md">
        <Avatar size="2xl" name={`${user.firstname} ${user.lastname}`} />
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          {user.firstname} {user.lastname}
        </Text>
        {/* <Text fontSize="xl" color={textColor}>
          {user.job}
        </Text> */}
        <UserDataField label="Email" value={user.email} />
        <UserDataField label="Current Tokens" value={user.currentTokens} />
        <UserDataField label="Phone Number" value={user.phone} />
        <UserDataField label="Address" value={user.address} />

        <Stack direction="row" spacing={3}>
          {Object.entries(optionalFields).map(([key, field]) => {
            const value = user[key];
            if (!value) {
              return null;
            }
            return (
              <Link key={key} href={value} isExternal>
                <Icon as={field.icon} boxSize={6} />
              </Link>
            );
          })}
        </Stack>

        <DeleteProfileModal />
      </VStack>
    </Container>
  );
};

export default UserProfile;
