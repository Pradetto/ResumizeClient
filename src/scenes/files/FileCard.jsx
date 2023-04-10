import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  LinkBox,
  Button,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// `
// Company
// Job Link
// Role
// Hiring Manager
// Email
// Phone
// Address
// `

// Job Description

const FileCard = ({ data }) => {
    data = {
        name: 'Mike P',
        description: 'Mike P',
        image: 'Mike P',
        code_link: 'Mike P',
        website_link: 'Mike P',
        tech_stack: 'Mike P',
    }
  const { name, description, image, code_link, website_link, tech_stack } = data;

  const cardHoverBorder = useColorModeValue("black", "white");

  const cardHoverBg = useColorModeValue("gray.50","gray.800");
  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <LinkBox
      as="article"
      w={{ base: "100%", md: "30%", lg: "30%" }}
      maxW="xl"
      borderRadius="md"
      boxShadow="base"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)", border: `2px solid ${cardHoverBorder}` }}
      bg={cardHoverBg}
      cursor="pointer"
      minW="250px"
      _dark={{ boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)" }}
    //   onClick={() => window.open(website_link)}
    >
      {/* <LinkOverlay as={Link} to={websiteLink} target="_blank"> */}
        <Image src={image} alt={name} h="200px" w="100%" objectFit="cover" />
        <Box p="6">
          <Flex direction="column" justify="space-between" h="100%">
            <Box>
              <Text as="h3" fontWeight="bold" mb="4">
                {name}
              </Text>
              <Text mb="4">{description}</Text>
              <Flex flexWrap="wrap" gap={2}>
                {/* {tech_stack.map((tech, index) => (
                  <Badge
                    key={index}
                    colorScheme="purple"
                    variant="outline"
                    mb={2}
                    mr={2}
                  >
                    {tech}
                  </Badge>
                ))} */}
              </Flex>
            </Box>
            <Flex align="center" justify="center" gap={2}>
              <Button as={Link} to={code_link} size="sm" target='_blank'  onClick={handleButtonClick}>
                Resume
              </Button>
              <Button as={Link} to={website_link} target='_blank' colorScheme="purple" size="sm" onClick={handleButtonClick}>
                Cover Letter
              </Button>
            </Flex>
          </Flex>
        </Box>
      {/* </LinkOverlay> */}
    </LinkBox>
  );
};

export default FileCard;
