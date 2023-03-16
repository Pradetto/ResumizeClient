import React from 'react';
import { VStack, Heading, Text, Icon } from '@chakra-ui/react';
import { FaUpload, FaPen, FaClock, FaCheck } from 'react-icons/fa';

const iconMap = {
  FaUpload: FaUpload,
  FaPen: FaPen,
  FaClock: FaClock,
  FaCheck: FaCheck,
};

const Feature = ({ title, description, iconName }) => {
  const IconComponent = iconMap[iconName];

  return (
    <VStack align="start" spacing={3}>
      <Heading as="h3" size="md">
        <Icon as={IconComponent} boxSize={6} mr={2}/>
        {title}
      </Heading>
      <Text>{description}</Text>
    </VStack>
  );
};

export default Feature;
