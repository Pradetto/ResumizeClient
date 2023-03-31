import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Feature from 'components/Feature';

const MotionBox = motion(Box);

const About = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  // const boxColor = useColorModeValue('white', 'gray.800');

  const gridInfo = [
            {
              title: 'Upload Your Resume',
              description: 'Easily upload your resume and let Resumize analyze it to customize for each job application.',
              iconName: 'FaUpload',
            },
            {
              title: 'Tailor Your Resume and Cover Letter',
              description: 'Resumize generates a tailored resume and cover letter based on the job link and description you provide.',
              iconName: 'FaPen',
            },
            {
              title: 'Save Time and Effort',
              description: 'Resumize saves you time and effort by creating customized resumes and cover letters automatically.',
              iconName: 'FaClock',
            },
            {
              title: 'Increase Your Chances',
              description: 'Increase your chances of getting the job you want with a tailored resume and cover letter that match the job requirements.',
              iconName: 'FaCheck',
            },
          ]

  return (
    <Box bg={bgColor} py={12} minH='var(--main-container-height)'>
      <Container maxW='container.xl'>
        <VStack spacing={8} align='center' mb={12}>
          <Heading as='h1' size='2xl'>
            About Resumize
          </Heading>
          <Text fontSize='xl' textAlign='center' maxWidth='800px'>
            Resumize is a web app that helps you create tailored resumes and cover letters for specific job applications. Upload your resume, paste a job link and description, and let Resumize do the rest.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {gridInfo.map((feature, index) => (
            <MotionBox
              key={index}
              whileHover={{ scale: 1.05 }}
              borderRadius='md'
              borderWidth='1px'
              p={6}
              // bg={boxColor}
              boxShadow='lg'
              _hover={{
                boxShadow: 'xl',
              }}
              transition='all 0.2s'
            >
              <Feature title={feature.title} description={feature.description} iconName={feature.iconName} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default About;