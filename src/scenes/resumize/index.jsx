import { Flex, useMediaQuery,useColorModeValue, HStack,Button, VStack } from '@chakra-ui/react';
import React from 'react';
import DocViewerContainer from './DocViewerContainer';
import FILE from '../../assets/MP.pdf'
import SidebarForm from './sidebarForm';
import ChatBox from './chatbox';


const Resumize = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
      const bgColor = useColorModeValue('gray.50', 'gray.700');
  return (
    <Flex >
      <SidebarForm />
      <Flex flexGrow="1" direction="row" flexWrap={'wrap'} ml={isMobile ? "0" : "50px"} gap={10} p={2} w='full' alignItems={'center'} justify='center' bgColor={bgColor} minH={'100vh'}>
        <HStack>
          <DocViewerContainer file={FILE} title={'Resume'}/>
          <VStack>
          <DocViewerContainer file={FILE} title={'Cover Letter'}/>
          <HStack spacing={4}>
            <Button colorScheme="blue" variant="solid">
                Reroll
            </Button>
            <Button colorScheme="green" variant="solid">
                Edit
            </Button>
            <Button colorScheme="orange" variant="solid">
                Save
            </Button>
          </HStack>
          </VStack>
        </HStack>
        {/* <ChatBox></ChatBox> */}
      </Flex>
    </Flex>
  );
};

export default Resumize;