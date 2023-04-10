import { useState, useEffect } from 'react';
import { Flex, useColorModeValue, VStack, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import DocViewerContainer from './DocViewerContainer';
import SidebarForm from './sidebarForm';

const Resumize = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const viewerContainerWidth = isMobile ? "22rem" : "38rem";
  const viewerContainerHeight = isMobile ? "22rem" : "50rem";
  const viewerContainerBorderColor = useColorModeValue("black",undefined);

  const [resumeFile,setResumeFile] = useState(null)
  const [coverLetterFile,setCoverLetterFile] = useState(null)
  const [submittedState,setSubmittedState] = useState(null)
  console.log(submittedState)

  useEffect(() => {
    // You can replace these keys with the actual keys of your default files
    const defaultResumeFileKey = "resume_default.docx";
    const defaultCoverLetterFileKey = "cover_letter_default.docx";

    // Set default file keys if none are provided
    if (!resumeFile) {
      setResumeFile({fileKey:defaultResumeFileKey,isDefault:true});
    }
    if (!coverLetterFile) {
      setCoverLetterFile({fileKey:defaultCoverLetterFileKey,isDefault:true});
    }
  }, [resumeFile,coverLetterFile]);
  return (
    <Flex>
      <SidebarForm setResumeFile={setResumeFile} setCoverLetterFile={setCoverLetterFile} setSubmittedState={setSubmittedState}/>
      <Flex flexGrow="1" direction="row" flexWrap={'wrap'} ml={isMobile ? "0" : "50px"} gap={10} p={2} w='full' alignItems={'flex-start'} justify='center' bgColor={bgColor} minH={'100vh'}>
          {resumeFile && <DocViewerContainer file={resumeFile} title={'Resume'} width={viewerContainerWidth} height={viewerContainerHeight} viewerContainerBorderColor={viewerContainerBorderColor} isResume={true}/>}
          {coverLetterFile && 
          <VStack>
            <DocViewerContainer file={coverLetterFile} title={'Cover Letter'} width={viewerContainerWidth} height={viewerContainerHeight} viewerContainerBorderColor={viewerContainerBorderColor} submittedState={submittedState} isResume={false}/>
          </VStack>
          }
        {/* <ChatBox></ChatBox> */}
      </Flex>
    </Flex>
  );
};

export default Resumize;
