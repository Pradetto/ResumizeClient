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
import { useContactInfoQuery } from "state/formApi";
import UserDataField from "./UserDataField";
import { useMemo } from "react";
import Error from "components/Error";
import Loading from "components/Loading";
import DeleteProfileModal from "./DeleteProfileModal";

const UserProfile = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const {data,isLoading,error} = useContactInfoQuery()

  let user = data || {}

    const formattedAddress = useMemo(() => {
    const addy = user.address
      ? user.address.split(",").map((line) => line.trim())
      : [];
    if (addy.length > 0){
      return addy[0]
    } else {
      return []
    }
  }, [user.address]);

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
      minWidth={'full'}
      minH={'100vh'}
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
        <UserDataField label="Current Tokens" value={Number(user.tokens_remaining).toLocaleString("en-US")} />
        <UserDataField label="Phone Number" value={user.phone} />
        <UserDataField label="Address" value={formattedAddress} />

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
