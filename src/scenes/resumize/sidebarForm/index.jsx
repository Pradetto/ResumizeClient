import React, { useEffect, useState } from 'react';
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
  useColorModeValue,
  Spinner
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

const SidebarForm = ({setResumeFile,setCoverLetterFile,setSubmittedState}) => {
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
  const [uploadForm, {isLoading: isFormLoading}] = useUploadFormMutation()
  const [deleteDrafts] = useDeleteDraftsMutation()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const boxColor = useColorModeValue(undefined, 'gray.700');

  useEffect(() => {
    setResumeFile({fileKey:selectedResumeData.file_key, isDefault: false})
  },[selectedResumeData,setResumeFile])

  // console.log(selectedCompany,selectedResumeData,selectedJob,selectedRole,selectedHiringManager)

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    let data = {
      resume: {...selectedResumeData},
      company: {...selectedCompany},
      job: {...selectedJob},
      role: {...selectedRole},
      hiring_manager: selectedHiringManager.id !== '' ? {...selectedHiringManager} : null,
      instructions: coverLetterInstructions !== '' ? {coverLetter:coverLetterInstructions} : null
    }

    try {
      const res = await uploadForm(data)
      if (res.error){
        throw new Error(res.error.data.message)
      }
      data = {...data,cover_letter: {...res.data}}
      
      setCoverLetterFile({fileKey:res.data.file_key, isDefault: false})
      setResumeFile({fileKey:data.resume.file_key, isDefault: false})
      setSubmittedState(data)
      onClose();
      clearRoleFilters();
      clearJobFilters();
      clearCompanyFilters();
      clearHiringManagerFilters();
      clearCoverLetterInstructions();
      /* CLEAR EVERYTHING AND CLOSE FORM OPENING */

    } catch (err){
        customToast({
        title: "Submission Error:",
        description: `There was an issue submitting your request please try again. Please validate Job Description and Instructions are clear and concise. If still having issues please Delete Drafts and try again. ${err.message}`,
        status: "error",
      });
      console.error(err.message)
    }
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
              isFormLoading={isFormLoading}
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
              isFormLoading={isFormLoading}
              />

              <HStack gap={4} marginBottom="20px" justify={'center'}>
                <Button
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  isDisabled={!selectedJob.id || isFormLoading}
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
              isFormLoading={isFormLoading}
              />}
              {/* RESUME STUFF CAN GO HERE */}
              <CoverLetter 
              coverLetterInstructions={coverLetterInstructions}
              setCoverLetterInstructions={setCoverLetterInstructions}
              selectedHiringManager={selectedHiringManager}
              setSelectedHiringManager={setSelectedHiringManager}
              selectedJob={selectedJob}
              isFormLoading={isFormLoading}
              />
              
              <DrawerFooter>
                <HStack>
                  {/* DELET DRAFTS BUTTON */}
                  {!isFormLoading &&    
                  <>
                <Button colorScheme="red" isDisabled={isFormLoading} onClick={() => {
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
                  <Button type="submit" colorScheme='green' isDisabled={isFormLoading}>Submit</Button>
                  </>
                }
                {isFormLoading && 
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
                }
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