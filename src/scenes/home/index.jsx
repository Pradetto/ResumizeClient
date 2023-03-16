import { Button, Container, Flex, Heading, Text, Link,useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import unemployed from "../../assets/unemployed.svg";
import { useIsAuthenticatedQuery } from "state/authApi";

const Home = () => {
  const spinAnimation = {
    rotate: 360,
    transition: { duration: 2, loop: Infinity },
  };
  const {data: isAuthenticated} = useIsAuthenticatedQuery()
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Flex direction="column" minHeight="var(--main-container-height)" bg={bgColor}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={{ base: "center", lg: "space-between" }}
        align="center"
        flexGrow="1"
        padding={{ base: "2rem", lg: "4rem" }}
      >
        <Container maxW={{ base: "container.md", lg: "container.lg" }}>
          <Heading as="h1" size="3xl" mb={8}>
            Resumize
          </Heading>
          <Heading as="h2" size="xl" mb={4}>
            Tailored Resumes and Cover Letters
          </Heading>
          <Text fontSize="2xl" mb={8}>
            Let Resumize help you stand out from the crowd with a personalized
            resume and cover letter that matches the job description.
          </Text>
          {!isAuthenticated && <Link as={RouterLink} to="/login">
            <Button colorScheme="blue" size="lg" mr={4}>
              Get Started
            </Button>
          </Link>}
          {isAuthenticated && <Link as={RouterLink} to="/resumize">
            <Button colorScheme="blue" size="lg" mr={4}>
              Get Started
            </Button>
          </Link>}
          <Link as={RouterLink} to="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </Container>
        <Flex justify="center" flexGrow="1" paddingTop={{ base: "2rem", lg: "0" }}>
          <motion.img
            src={unemployed}
            alt="Unemployed"
            height={400}
            width={400}
            style={spinAnimation}
          />
        </Flex>
      </Flex>
      <Flex align="center" justify="center" padding="1rem" >
        <Text fontSize="lg" textAlign="center">
          © 2023 Resumize. All rights reserved.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
