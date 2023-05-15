import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';
import { useDownloadFileMutation } from 'state/formApi';

const JobCard = ({ job }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boxColor = useColorModeValue('white', 'gray.700');
  const [downloadFile] = useDownloadFileMutation()

  const handleContactOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen();
  };

  const addUrlPrefix = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
  };

  const handleBoxClick = () => {
    const fullUrl = addUrlPrefix(job.jobLink);
    window.open(fullUrl, '_blank');
  };

    const downloadHandler = async (e,fileKey) => {
      e.stopPropagation();
      try{
        const { data } = await downloadFile(fileKey);
        const url = data.url;
        window.open(url)
      } catch(err){
        // ADD CUSTOM TOAST HERE
      }


  }

  return (
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bgColor={boxColor}
        _hover={{ cursor: 'pointer', transform: 'scale(1.02)' }}
        transition="all 0.2s ease-in"
        onClick={handleBoxClick}
      >
        <VStack p="4" spacing="2" justifyContent="space-between">
          <VStack spacing="2">
            <Text fontSize="2xl" fontWeight="bold">{job.companyName}</Text>
            <Text fontSize="lg">{job.position}</Text>
            <Box
              px="2"
              maxH="200px"
              overflowY="scroll"
            >
              <Text>{job.description}</Text>
            </Box>
          </VStack>
          <HStack>
            <Button onClick={(e) => downloadHandler(e, job.resume_fileKey)}>Resume</Button>
            <Button onClick={(e) => downloadHandler(e, job.coverLetter_fileKey)}>Cover Letter</Button>
            {job.contactInfoAvailable && (
              <IconButton onClick={handleContactOpen} icon={<BsPersonFill />}/>
            )}
          </HStack>
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Contact Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="start" spacing="2">
                {job.hiringManager && <Text fontWeight={'bold'}>Hiring Manager: <Box as='span' fontWeight={'normal'}>{job.hiringManager}</Box></Text>}
                {job.email && <Text fontWeight={'bold'}>Email: <Box as='span' fontWeight={'normal'}>{job.email}</Box></Text>}
                {job.phone && <Text fontWeight={'bold'}>Phone: <Box as='span' fontWeight={'normal'}>{job.phone}</Box></Text>}
                {job.address && <Text fontWeight={'bold'}>Address: <Box as='span' fontWeight={'normal'}>{job.address}</Box></Text>}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
  );
};

export default JobCard;