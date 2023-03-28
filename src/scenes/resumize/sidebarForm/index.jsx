import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons';

import ResumeUpload from './ResumeUpload';
import JobInfo from './JobInfo';
import HiringManagerInfo from './HiringManagerInfo';
import CoverLetter from './CoverLetter';
import useResumeUpload from 'hooks/useResumeUpload';
import { useUploadFormMutation } from 'state/formApi';
import useJobInfo from 'hooks/useJobInfo';
import useCustomToast from 'hooks/useCustomToast';


const SidebarForm = () => {
const [
  showUpload,
  setShowUpload,
  handleFileInputChange,
  handleResumeSelect,
  selectedResumeData,
  setSelectedResumeData
] = useResumeUpload();

const [
  selectedCompany,
  setSelectedCompany,
  handleSelectedCompany,
  selectedJob,
  setSelectedJob,
  handleSelectedJob,
  handleSelectedJobChange
] = useJobInfo()
  const customToast = useCustomToast()
  const [uploadForm] = useUploadFormMutation()

  /* OLD SETUP */

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [showOptionalFields, setShowOptionalFields] = useState(false);

const handleHiringManagerChange = (option) => {
  if (option) {
    setSubformData((prevData) => ({
      ...prevData,
      hiring_manager: option.label,
    }));
  } else {
    setSubformData((prevData) => ({
      ...prevData,
      hiring_manager: '',
    }));
  }
};


  const [subformData, setSubformData] = useState({
    company_name: '',
    role: '',
    hiring_manager: '',
    address: '',
    phone: '',
    email: '',
  });


  const validateCompanyHandler = () => {

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('called 1')

    if (selectedCompany.id === '' || selectedCompany.company_name === ''){
        console.error("Selected Company error:");
        customToast({
        title: "Selected Company Error:",
        description: `Please make sure you have selected a company.`,
        status: "error",
      });
      return
    }
    if (selectedJob.id === '' || selectedJob.company_id === '' || selectedJob.role === '' || selectedJob.link === '' || selectedJob.description ===''){
        console.error("Job Info error:");
        customToast({
        title: "Job Info Error:",
        description: `Please make sure you have completed the Job role, link and description.`,
        status: "error",
      });
      return
    }
    
    let data = {}
    // console.log(selectedResumeFile)
    // const resume_id = selectedResumeFile.split('/')[0]
    // console.log(resume_id)
    data = {resume: {...selectedResumeData}}

    try {
      await uploadForm(data)
    } catch (err){
      console.error(err.message)
    }
    // handle form submission logic here
  };

  
  return (
    <>
      {isMobile ? (
        <Button
          position="fixed"
          bottom="0"
          right="0"
          width="50px"
          height="50px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="docked"
          // backgroundColor="gray.100"
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
          // colorScheme='whatsapp'
        >
          <ChevronUpIcon />
        </Button>
      ) : (
        <Button
          position="fixed"
          top="72px"
          left="0"
          width="50px"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          // backgroundColor="gray.100"
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
          // colorScheme='whatsapp'
        >
          <ChevronRightIcon />
        </Button>
      )}
      <Drawer isOpen={isOpen} onClose={onClose} placement={isMobile ? "bottom" : "left"} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Form</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Box as="form" onSubmit={handleSubmit}>
              {/* COMPONENTS */}
              <ResumeUpload 
              selectedResumeData={selectedResumeData}
              setSelectedResumeData={setSelectedResumeData}
              showUpload={showUpload}
              setShowUpload={setShowUpload}
              handleFileInputChange={handleFileInputChange}
              handleResumeSelect={handleResumeSelect}
              />
              <JobInfo 
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              handleSelectedCompany={handleSelectedCompany}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              handleSelectedJob={handleSelectedJob}
              handleSelectedJobChange={handleSelectedJobChange}
              />

              <HStack gap={4} marginBottom="20px">
                <Button
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  // marginBottom="20px"
                >
                  {showOptionalFields ? 'Hide' : 'Show'} Optional Fields
                </Button>
                <Button colorScheme="yellow" marginLeft="10px" onClick={() => {console.log('Add button reset')}}>
                  Reset Filters
                </Button>
              </HStack>

              {showOptionalFields && <HiringManagerInfo />}
              {/* RESUME STUFF CAN GO HERE */}
              <CoverLetter />
              
              <DrawerFooter>
                <Button type="submit" colorScheme='green'>Submit</Button>
              </DrawerFooter>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );

}

export default SidebarForm