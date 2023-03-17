import { Box, Flex, Heading, Text,Link } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link as Routerlink } from 'react-router-dom';
const Error = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Error loading requested information
      </Heading>
      <Text color={'gray.500'}>
        Please try to reload the page again. Verify you are logged in <Link as={Routerlink} to="/login" textDecoration={'underline'} fontWeight={'bold'}>here</Link>, and if that does not work our server may be down for maintenance. Please check back again later, or contact support at resumizeAI@gmail.com if this is a persistent issue.
      </Text>
    </Box>
  );
}

export default Error