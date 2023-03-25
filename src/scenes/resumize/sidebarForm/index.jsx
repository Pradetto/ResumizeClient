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
  Center,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons';

import ResumeUpload from './ResumeUpload';
import JobInfo from './JobInfo';
import HiringManagerInfo from './HiringManagerInfo';
import CoverLetter from './CoverLetter';
import { useUploadFileMutation } from 'state/generalApi';
import useResumeUpload from 'hooks/useResumeUpload';


const SidebarForm = () => {
  const [uploadeResumedFile, setUploadedResumeFile, selectedResumeFile, setSelectedResumeFile,resumeUploadStatus,handleResumeChange,handleResumeUpload,isDefault,setIsDefault] = useResumeUpload()

  /* OLD SETUP */
  
  const [selectedFile, setSelectedFile] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generateCoverLetter, setGenerateCoverLetter] = useState(true);
  const [coverLetterText, setCoverLetterText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // /* THIS NEED TO BE FETCHED */
    const resetSelection = () => {
    setSelectedCompany('');
    setSubformData((prevData) => ({
      ...prevData,
      role: '',
      hiring_manager: '',
    }));
  };

  const [selectedCompany, setSelectedCompany] = useState('');
  const [fetchedCompanies, setFetchedCompanies] = useState([
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' },
  ]);

  const [fetchedRoles, setFetchedRoles] = useState([
    { id: 1, name: 'Software Engineer', companyId: 1 },
    { id: 2, name: 'Product Manager', companyId: 1 },
    { id: 3, name: 'Data Scientist', companyId: 2 },
  ]);

  const [fetchedHiringManagers, setFetchedHiringManagers] = useState([
    { id: 1, name: 'John Doe', companyId: 1, email: 'john@companya.com', phone: '1234567890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', companyId: 2, email: 'jane@companyb.com', phone: '0987654321', address: '456 Main St' },
    { id: 3, name: 'Alice Johnson', companyId: 1, email: 'alice@companya.com', phone: '1122334455', address: '789 Main St' },
  ]);

   const filteredRoles = fetchedRoles.filter((role) => role.companyId === parseInt(selectedCompany));
  const filteredHiringManagers = fetchedHiringManagers.filter((manager) => manager.companyId === parseInt(selectedCompany));

  const handleRoleChange = (option) => {
    if (option) {
      setSubformData((prevData) => ({
        ...prevData,
        role: option.label,
      }));

      const selectedRole = filteredRoles.find(
        (role) => role.name === option.label
      );
      const applicableHiringManagers = fetchedHiringManagers.filter(
        (manager) => manager.companyId === selectedRole.companyId
      );
      setFetchedHiringManagers(applicableHiringManagers);
    } else {
      setSubformData((prevData) => ({
        ...prevData,
        role: '',
      }));
    }
  };

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

const handleCompanyChange = (option) => {
  if (option) {
    setSelectedCompany(option.value);
    setSubformData((prevData) => ({
      ...prevData,
      role: '',
      hiring_manager: '',
    }));
  } else {
    setSelectedCompany('');
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

  const handleSubformDataChange = (field, value) => {
    setSubformData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };




  const handleSelectedFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleJobUrl = (event) => {
    setJobUrl(event.target.value);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleGenerateCoverLetterChange = (event) => {
    setGenerateCoverLetter(event === 'yes');
  };

  const handleCoverLetterTextChange = (event) => {
    setCoverLetterText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
              uploadeResumedFile={uploadeResumedFile} 
              selectedResumeFile={selectedResumeFile} 
              setSelectedResumeFile={setSelectedResumeFile} setUploadedResumeFile={setUploadedResumeFile} 
              handleResumeChange={handleResumeChange} 
              handleResumeUpload={handleResumeUpload}
              isDefault={isDefault}
              setIsDefault={setIsDefault}
              />
              <JobInfo />

              <HStack gap={4} marginBottom="20px">
                <Button
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  // marginBottom="20px"
                >
                  {showOptionalFields ? 'Hide' : 'Show'} Optional Fields
                </Button>
                <Button colorScheme="yellow" marginLeft="10px" onClick={resetSelection}>
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