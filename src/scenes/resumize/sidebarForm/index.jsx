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
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons';

import ResumeUpload from './ResumeUpload';
import JobInfo from './JobInfo';
import HiringManagerInfo from './HiringManagerInfo';
import CoverLetter from './CoverLetter';
import useResumeUpload from 'hooks/useResumeUpload';
import { useDeleteDraftsMutation, useUploadFormMutation } from 'state/formApi';
import useJobInfo from 'hooks/useJobInfo';
import useCustomToast from 'hooks/useCustomToast';
import useHiringManagerAndInstructions from 'hooks/useHiringManagerAndInstructions';

const SidebarForm = () => {
const [
  showUpload,
  setShowUpload,
  handleFileInputChange,
  handleResumeSelect,
  selectedResumeData,
  setSelectedResumeData,
] = useResumeUpload();

const [
      selectedCompany,
      setSelectedCompany,
      handleSelectedCompany,
      selectedJob,
      setSelectedJob,
      handleSelectedJob,
      selectedRole,
      setSelectedRole,
      clearJobFilters,
      clearCompanyFilters,
      clearRoleFilters,
    ] = useJobInfo()

    const [
        coverLetterInstructions,
        setCoverLetterInstructions,
        selectedHiringManager,
        setSelectedHiringManager,
        handleHiringManagerChange,
        clearHiringManagerFilters,
        clearCoverLetterInstructions,
    ] = useHiringManagerAndInstructions()
  const customToast = useCustomToast()
  const [uploadForm] = useUploadFormMutation()
  const [deleteDrafts] = useDeleteDraftsMutation()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const boxColor = useColorModeValue(undefined, 'gray.800');


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
      const templateData = {
        user: {
          firstname: "",
          lastname: "",
          address: "",
          phone: "",
          email: "",
        },
        date: new Date().toLocaleDateString(),
        default_name: "",
        render_employer: true,
        required_employer: {
          company_name: "",
          role: "",
        },
        employer: {
          hiring_manager: "",
          address: "",
          phone: "",
          email: "",
        },
        content: {
          introduction_paragraph: "",
          body_paragraphs: [
            "",
            "",
            "",
          ],
          closing_paragraph: "",
        },
      };
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
          bg={boxColor}
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
          // colorScheme='whatsapp'
        >
          <ChevronUpIcon  boxSize={'50px'}/>
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
          bg={boxColor}
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
          // colorScheme='whatsapp'
        >
          <ChevronRightIcon boxSize={'50px'}/>
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
              clearJobFilters={clearJobFilters}
              clearCompanyFilters={clearCompanyFilters}
              clearRoleFilters={clearRoleFilters}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              />

              <HStack gap={4} marginBottom="20px" justify={'center'}>
                <Button
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  isDisabled={!selectedJob.id}
                >
                  {showOptionalFields ? 'Hide' : 'Show'} Optional Fields
                </Button>
              </HStack>

              {showOptionalFields && 
              <HiringManagerInfo 
              selectedHiringManager={selectedHiringManager}
              setSelectedHiringManager={setSelectedHiringManager}
              handleHiringManagerChange={handleHiringManagerChange}
              selectedJob={selectedJob}
              selectedCompany={selectedCompany}
              />}
              {/* RESUME STUFF CAN GO HERE */}
              <CoverLetter 
              coverLetterInstructions={coverLetterInstructions}
              setCoverLetterInstructions={setCoverLetterInstructions}
              selectedHiringManager={selectedHiringManager}
              setSelectedHiringManager={setSelectedHiringManager}
              selectedJob={selectedJob}
              />
              
              <DrawerFooter>
                <HStack>    {/* DELET DRAFTS BUTTON */}
              <Button colorScheme="red" onClick={() => {
                deleteDrafts() 
                clearRoleFilters()
                clearJobFilters()
                clearCompanyFilters()
                clearHiringManagerFilters()
                clearCoverLetterInstructions()
                }}
                >
                  Del Drafts
                </Button>
                <Button type="submit" colorScheme='green'>Submit</Button>
                </HStack>
              </DrawerFooter>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SidebarForm