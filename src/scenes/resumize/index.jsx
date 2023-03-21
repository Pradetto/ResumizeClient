import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import DocViewerContainer from './DocViewerContainer';
// import Sidebar from './Sidebar';
import FILE from '../../assets/MP.pdf'
// import Sidebar from './form';
// import Form from './form';
import OldSidebar from './OldSidebar';
import SidebarForm from './sidebarForm';


const Resumize = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex >
      <SidebarForm />
      <Flex flexGrow="1" direction="row" flexWrap={'wrap'} ml={isMobile ? "0" : "50px"} gap={10} p={2} w='full' alignItems={'center'} justify='center'>
        <DocViewerContainer file={FILE} title={'Resume'}/>
        <DocViewerContainer file={FILE} title={'Cover Letter'}/>
      </Flex>
    </Flex>
  );
};

export default Resumize;