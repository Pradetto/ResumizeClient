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
  useMediaQuery,
  useColorMode
} from '@chakra-ui/react';
import { InfoOutlineIcon,ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons';

import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { chakra } from '@chakra-ui/react';
import { components as defaultComponents } from 'react-select';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ChakraCreatableSelect = chakra(CreatableSelect, {
  shouldForwardProp: (prop) => {
    return !['style', 'className', 'innerRef', 'innerProps'].includes(prop);
  },
});

const components = {
  ...defaultComponents,
  DropdownIndicator: (props) => {
    return (
      <defaultComponents.DropdownIndicator {...props}>
        <ChevronDownIcon />
      </defaultComponents.DropdownIndicator>
    );
  },
};


const OldSidebar = () => {
  const [resumeFile, setResumeFile] = useState('');
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
              <CreatableSelect
                id="company"
                value={
                  selectedCompany
                    ? fetchedCompanies.find(
                        (company) => company.id === parseInt(selectedCompany)
                      )
                    : null
                }
                onChange={(option) => handleCompanyChange(option)}
                options={fetchedCompanies.map((company) => ({
                  value: company.id,
                  label: company.name,
                }))}
                placeholder="Select or type to create..."
              />
              <FormControl isRequired marginBottom="20px">
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select
                  id="role"
                  value={subformData.role}
                  onChange={handleRoleChange}
                >
                  <option value="">--Select--</option>
                  {filteredRoles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
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
          <HStack gap={4} marginBottom="20px">
          <Button
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            // marginBottom="20px"
          >
            {showOptionalFields ? 'Hide' : 'Show'} Optional Fields
          </Button>
              <Button
                colorScheme="red"
                marginLeft="10px"
                onClick={resetSelection}
              >
                Reset
              </Button>
              </HStack>

          {showOptionalFields && (
            <>
      <FormControl marginBottom="20px">
        <FormLabel htmlFor ="hiring_manager">Hiring Manager</FormLabel>
                <Select
                  id="hiring-manager"
                  value={subformData.hiring_manager}
                  onChange={(e) => handleSubformDataChange('hiring_manager', e.target.value)}
                >
                  <option value="">--Select--</option>
                  {fetchedHiringManagers.map((manager) => (
                    <option key={manager.id} value={manager.name}>
                      {manager.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel htmlFor="email">Hiring Manager Email</FormLabel>
                <Input
                  type="text"
                  id="email"
                  value={subformData.email}
                  onChange={(e) => handleSubformDataChange('email', e.target.value)}
                />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel htmlFor="phone">Hiring Manager Phone</FormLabel>
                <Input
                  type="text"
                  id="phone"
                  value={subformData.phone}
                  onChange={(e) => handleSubformDataChange('phone', e.target.value)}
                />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel htmlFor="address">Hiring Manager Address</FormLabel>
                <Input
                  type="text"
                  id="address"
                  value={subformData.address}
                  onChange={(e) => handleSubformDataChange('address', e.target.value)}
                />
              </FormControl>
              </>
              )}
              {/* RESUME STUFF CAN GO HERE */}

              {/* DEFAULTING VALUE TO YES */}
              <FormControl marginBottom="20px">
                <FormLabel>Generate Cover Letter?</FormLabel>
                <RadioGroup
                  // value={generateCoverLetter ? 'yes' : 'no'}
                  value='yes'
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

export default OldSidebar

  // const [generateResume, setGenerateResume] = useState(false);
  // const [resumeText, setResumeText] = useState('');
  // const handleGenerateResumeChange = (event) => {
  //   setGenerateResume(event === 'yes');
  // };

  // const handleResumeTextChange = (event) => {
  //   setResumeText(event.target.value);
  // };

             /* <FormControl marginBottom="20px">
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
              )} */





































// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Radio,
//   RadioGroup,
//   Select,
//   Textarea,
//   HStack,
//   Tooltip,
//   useDisclosure,
//   useMediaQuery,
//   useColorMode
// } from '@chakra-ui/react';
// import { InfoOutlineIcon,ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons';

// const Sidebar = () => {
//   // const [generateResume, setGenerateResume] = useState(false);
//   // const [resumeText, setResumeText] = useState('');
//   const [resumeFile, setResumeFile] = useState('');
//   const [selectedFile, setSelectedFile] = useState('');
//   const [jobUrl, setJobUrl] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [generateCoverLetter, setGenerateCoverLetter] = useState(true);
//   const [coverLetterText, setCoverLetterText] = useState('');
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [isMobile] = useMediaQuery("(max-width: 768px)");

//   const [subformData, setSubformData] = useState({
//     company_name: '',
//     role: '',
//     hiring_manager: '',
//     address: '',
//     phone: '',
//     email: '',
//   });

//   const handleSubformDataChange = (field, value) => {
//     setSubformData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };


//   const handleResumeFileChange = (event) => {
//     setResumeFile(event.target.value);
//   };

//   const handleSelectedFileChange = (event) => {
//     setSelectedFile(event.target.value);
//   };

//   const handleJobUrl = (event) => {
//     setJobUrl(event.target.value);
//   };

//   const handleJobDescriptionChange = (event) => {
//     setJobDescription(event.target.value);
//   };

//   // const handleGenerateResumeChange = (event) => {
//   //   setGenerateResume(event === 'yes');
//   // };

//   // const handleResumeTextChange = (event) => {
//   //   setResumeText(event.target.value);
//   // };

//   const handleGenerateCoverLetterChange = (event) => {
//     setGenerateCoverLetter(event === 'yes');
//   };

//   const handleCoverLetterTextChange = (event) => {
//     setCoverLetterText(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // handle form submission logic here
//   };

  
//   return (
//     <>
//       {isMobile ? (
//         <Button
//           position="fixed"
//           bottom="0"
//           right="0"
//           width="50px"
//           height="50px"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           zIndex="docked"
//         //   backgroundColor="gray.100"
//           onClick={onOpen}
//           style={{ cursor: 'pointer' }}
//         //   colorScheme='whatsapp'
//         >
//           <ChevronUpIcon />
//         </Button>
//       ) : (
//         <Button
//           position="fixed"
//           top="72px"
//           left="0"
//           width="50px"
//           height="100%"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         //   backgroundColor="gray.100"
//           onClick={onOpen}
//           style={{ cursor: 'pointer' }}
//         //   colorScheme='whatsapp'
//         >
//           <ChevronRightIcon />
//         </Button>
//       )}
//       <Drawer isOpen={isOpen} onClose={onClose} placement={isMobile ? "bottom" : "left"} size="sm">
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader>Form</DrawerHeader>
//         <DrawerCloseButton />
//           <DrawerBody>
//             <Box as="form" onSubmit={handleSubmit}>
//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="resume-file">Upload Resume</FormLabel>
//                 <Input
//                   type="file"
//                   id="resume-file"
//                   value={resumeFile}
//                   onChange={handleResumeFileChange}
//                 />
//               </FormControl>
//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="selected-file">Select Existing Resume</FormLabel>
//                 <Select
//                   id="selected-file"
//                   value={selectedFile}
//                   onChange={handleSelectedFileChange}
//                 >
//                   <option value="">--Select--</option>
//                   <option value="resume1">Resume 1</option>
//                   <option value="resume2">Resume 2</option>
//                   <option value="resume3">Resume 3</option>
//                 </Select>
//               </FormControl>
//               <FormControl isRequired marginBottom="20px">
//                 <FormLabel htmlFor="company-name">Company Name</FormLabel>
//                 <Input
//                   type="text"
//                   id="company-name"
//                   value={subformData.company_name}
//                   onChange={(e) => handleSubformDataChange('company_name', e.target.value)}
//                 />
//               </FormControl>
//               <FormControl isRequired marginBottom="20px">
//                 <FormLabel htmlFor="role">Role</FormLabel>
//                 <Input
//                   type="text"
//                   id="role"
//                   value={subformData.role}
//                   onChange={(e) => handleSubformDataChange('role', e.target.value)}
//                 />
//               </FormControl>
//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="job-url">Job Link</FormLabel>
//                 <Input type='text' id='job-url' value={jobUrl} onChange={handleJobUrl} />
//               </FormControl>
//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="job-description">Paste Job Description</FormLabel>
//                 <Textarea
//                   id="job-description"
//                   value={jobDescription}
//                   onChange={handleJobDescriptionChange}
//                 />
//               </FormControl>

//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="hiring-manager">Hiring Manager</FormLabel>
//                 <Input
//                   type="text"
//                   id="hiring-manager"
//                   value={subformData.hiring_manager}
//                   onChange={(e) => handleSubformDataChange('hiring_manager', e.target.value)}
//                 />
//               </FormControl>
//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="email">Hiring Manager Email</FormLabel>
//                 <Input
//                   type="text"
//                   id="email"
//                   value={subformData.email}
//                   onChange={(e) => handleSubformDataChange('email', e.target.value)}
//                 />
//               </FormControl>
//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="phone">Hiring Manager Phone</FormLabel>
//                 <Input
//                   type="text"
//                   id="phone"
//                   value={subformData.phone}
//                   onChange={(e) => handleSubformDataChange('phone', e.target.value)}
//                 />
//               </FormControl>
//               <FormControl marginBottom="20px">
//                 <FormLabel htmlFor="address">Hiring Manager Address</FormLabel>
//                 <Input
//                   type="text"
//                   id="address"
//                   value={subformData.address}
//                   onChange={(e) => handleSubformDataChange('address', e.target.value)}
//                 />
//               </FormControl>

//               {/* <FormControl marginBottom="20px">
//                 <FormLabel>Generate Resume?</FormLabel>
//                 <RadioGroup
//                   value={generateResume ? 'yes' : 'no'}
//                   onChange={handleGenerateResumeChange}
//                 >
//                   <Radio value="yes">Yes</Radio>
//                   <Radio value="no">No</Radio>
//                 </RadioGroup>
//               </FormControl>
//               {generateResume && (
//                 <FormControl marginBottom="20px">
//                   <FormLabel htmlFor="resume-text">Resume Text</FormLabel>
//                   <Textarea
//                     id="resume-text"
//                     value={resumeText}
//                     onChange={handleResumeTextChange}
//                     isDisabled={!generateResume}
//                   />
//                 </FormControl>
//               )} */}

//               {/* DEFAULTING VALUE TO YES */}
//               <FormControl marginBottom="20px">
//                 <FormLabel>Generate Cover Letter?</FormLabel>
//                 <RadioGroup
//                   // value={generateCoverLetter ? 'yes' : 'no'}
//                   value='yes'
//                   onChange={handleGenerateCoverLetterChange}
//                 >
//                   <Radio value="yes">Yes</Radio>
//                   <Radio value="no">No</Radio>
//                 </RadioGroup>
//               </FormControl>
//               {generateCoverLetter && (
//                 <FormControl marginBottom="20px">
//                   <HStack align={'center'}>
//                     <FormLabel htmlFor="cover-letter-text">Cover Letter Text</FormLabel>
//                     <Tooltip label="Hover over the text for more information">
//                       <InfoOutlineIcon color="gray.500" />
//                     </Tooltip>
//                   </HStack>
//                   <Textarea
//                     id="cover-letter-text"
//                     value={coverLetterText}
//                     onChange={handleCoverLetterTextChange}
//                     isDisabled={!generateCoverLetter}
//                   />
//                 </FormControl>
//               )}
//               <DrawerFooter>
//                 <Button type="submit">Submit</Button>
//               </DrawerFooter>
//             </Box>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );

// }

// export default Sidebar