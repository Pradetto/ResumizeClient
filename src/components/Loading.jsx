import React from 'react';
import { Box, Flex, Heading, Text, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'blue.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <Spinner size="xl" color="white" />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Loading requested information
      </Heading>
      <Text color={'gray.500'}>
        Please wait while we fetch the data for you. If it takes too long, try refreshing the page or check your internet connection.
      </Text>
    </Box>
  );
};

export default Loading;
