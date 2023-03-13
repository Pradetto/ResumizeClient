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
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  HStack,
  Tooltip,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { InfoOutlineIcon,ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Sidebar = () => {
  const [resumeFile, setResumeFile] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generateResume, setGenerateResume] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [generateCoverLetter, setGenerateCoverLetter] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleResumeFileChange = (event) => {
    setResumeFile(event.target.value);
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

  const handleGenerateResumeChange = (event) => {
    setGenerateResume(event === 'yes');
  };

  const handleResumeTextChange = (event) => {
    setResumeText(event.target.value);
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
        //   backgroundColor="gray.100"
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
        //   colorScheme='whatsapp'
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
        //   backgroundColor="gray.100"
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
        //   colorScheme='whatsapp'
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
              <FormControl marginBottom="20px">
                <FormLabel htmlFor="resume-file">Upload Resume</FormLabel>
                <Input
                  type="file"
                  id="resume-file"
                  value={resumeFile}
                  onChange={handleResumeFileChange}
                />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel htmlFor="selected-file">Select Existing Resume</FormLabel>
                <Select
                  id="selected-file"
                  value={selectedFile}
                  onChange={handleSelectedFileChange}
                >
                  <option value="">--Select--</option>
                  <option value="resume1">Resume 1</option>
                  <option value="resume2">Resume 2</option>
                  <option value="resume3">Resume 3</option>
                </Select>
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel htmlFor="job-url">Job Link</FormLabel>
                <Input type='text' id='job-url' value={jobUrl} onChange={handleJobUrl} />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel htmlFor="job-description">Paste Job Description</FormLabel>
                <Textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel>Generate Resume?</FormLabel>
                <RadioGroup
                  value={generateResume ? 'yes' : 'no'}
                  onChange={handleGenerateResumeChange}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </RadioGroup>
              </FormControl>
              {generateResume && (
                <FormControl marginBottom="20px">
                  <FormLabel htmlFor="resume-text">Resume Text</FormLabel>
                  <Textarea
                    id="resume-text"
                    value={resumeText}
                    onChange={handleResumeTextChange}
                    isDisabled={!generateResume}
                  />
                </FormControl>
              )}
              <FormControl marginBottom="20px">
                <FormLabel>Generate Cover Letter?</FormLabel>
                <RadioGroup
                  value={generateCoverLetter ? 'yes' : 'no'}
                  onChange={handleGenerateCoverLetterChange}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </RadioGroup>
              </FormControl>
              {generateCoverLetter && (
                <FormControl marginBottom="20px">
                  <HStack align={'center'}>
                    <FormLabel htmlFor="cover-letter-text">Cover Letter Text</FormLabel>
                    <Tooltip label="Hover over the text for more information">
                      <InfoOutlineIcon color="gray.500" />
                    </Tooltip>
                  </HStack>
                  <Textarea
                    id="cover-letter-text"
                    value={coverLetterText}
                    onChange={handleCoverLetterTextChange}
                    isDisabled={!generateCoverLetter}
                  />
                </FormControl>
              )}
              <DrawerFooter>
                <Button type="submit">Submit</Button>
              </DrawerFooter>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );

}

export default Sidebar