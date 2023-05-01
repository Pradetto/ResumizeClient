import React, { useState } from 'react';
import { Box, SimpleGrid, Input, VStack, useColorModeValue, Text, Link, Center,Spinner } from '@chakra-ui/react';
import JobCard from './JobCard';
import { useGetAllFilesQuery } from 'state/formApi';
import { Link as RouterLink } from 'react-router-dom';

const Files = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const boxColor = useColorModeValue('gray.100', 'gray.700');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: allFiles, isLoading, error } = useGetAllFilesQuery();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };



  if (isLoading) {
    return (
    <Center h="100vh" w="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
    );
  }

  if (error) {
    return (
      <Center flexDirection="column" h="100vh" w="100%">
        <Text mb={4}>{error}</Text>
        <Text fontWeight={'bold'}>
          Refresh the page and try again
        </Text>
    </Center>
    );
  }

  if (!allFiles || allFiles.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text mb={4}>No files found.</Text>
        <Link as={RouterLink} to="/resumize" color="blue.500">
          Go to Resumize
        </Link>
      </Box>
    );
  }

  const filteredJobs = allFiles.filter((job) =>
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VStack w="100%" spacing="4" bgColor={bgColor}>
      <Input
        placeholder="Filter by company name"
        value={searchTerm}
        onChange={handleSearchChange}
        bgColor={boxColor}
      />
      <Box w="100%" minH={'100vh'} bgColor={bgColor}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6" p={4} alignItems={'center'}>
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Files;
