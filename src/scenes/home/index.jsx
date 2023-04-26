import { useEffect,useState } from "react";
import { Button, Container, Flex, Heading, Text, Link,useColorModeValue, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useIsAuthenticatedQuery } from "state/authApi";
import Lottie from 'lottie-react'

const Home = () => {

  const {data: isAuthenticated} = useIsAuthenticatedQuery()

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const buttonColor = colorMode === "dark" ? "purple.700" : undefined;
  const buttonTextColor = colorMode === "dark" ? "white" : undefined;

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://assets6.lottiefiles.com/packages/lf20_4DLPlW.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      });
  }, []);

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
            Tailored Cover Letters
          </Heading>
          <Text fontSize="2xl" mb={8}>
            Let Resumize help you stand out from the crowd with a personalized
            cover letter that matches the job description. Please be aware that Resumize is an AI-powered platform, and as a result, the results produced may be inaccurate or contain errors.
          </Text>
          {!isAuthenticated && <Link as={RouterLink} to="/login">
            <Button colorScheme="blue" size="lg" mr={4}>
              Get Started
            </Button>
          </Link>}
          {isAuthenticated && <Link as={RouterLink} to="/resumize">
            <Button colorScheme="blue" size="lg" mr={4} bg={buttonColor} color={buttonTextColor}>
              Resumize
            </Button>
          </Link>}
          <Link as={RouterLink} to="/about">
            <Button  size="lg">
              Learn More
            </Button>
          </Link>
        </Container>
        <Flex justify="center" flexGrow="1" paddingTop={{ base: "2rem", lg: "0" }} boxSize={500}>
          <Lottie animationData={animationData} />
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
