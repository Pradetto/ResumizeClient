import { useState, useEffect, useCallback } from "react";
import {
  VStack,
  useColorModeValue,
  IconButton,
  Text,
  Box,
  HStack,
  Button,
  useBreakpointValue,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {
  useDownloadDefaultFileMutation,
  useDownloadFileMutation,
  useRerollAndEditCoverLetterMutation,
} from "state/formApi";


const CustomHeader = ({ onRefresh,url,submittedState,setSubmittedState,isResume,setCoverLetterFile,setIsLoading2 }) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  // const submittedState = true
  const isMobile = useBreakpointValue({ base: true, md: false });
  const buttonSize = isMobile ? 'xs': 'sm'
  const titleSize = isMobile ? 'xs' : 'md'
  const [rerollAndEditSubmit,{isLoading}] = useRerollAndEditCoverLetterMutation()
    const { isOpen, onOpen, onClose } = useDisclosure();
  const [editComment, setEditComment] = useState("");
  
  useEffect(() => {
    setIsLoading2(isLoading)
  },[isLoading,setIsLoading2])

  const submitHandler = async () => {
    console.log('submitted state',submittedState)
    const res = await rerollAndEditSubmit(submittedState)
    setCoverLetterFile({fileKey:res.data.file_key, isDefault: false})
    setSubmittedState({...submittedState,cover_letter:{
      file_key: res.data.file_key,
      id: res.data.id
    }})
    // UPDATE SUBMITTEDSTATE
  }

  const handleEditSubmit = async () => {
    onClose();
    const updatedSubmittedState = { ...submittedState, editComment };
    console.log('Here is the updatedSubmittedState',updatedSubmittedState)
    const res = await rerollAndEditSubmit(updatedSubmittedState);
    setSubmittedState({...submittedState,cover_letter:{
      file_key: res.data.file_key,
      id: res.data.id
    }})
    console.log(res);
    setCoverLetterFile({ fileKey: res.data.file_key, isDefault: false });
  };

  const downloadHandler = (url) => {
    window.open(url)
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={bgColor}
      p={2}
    >
      <Text fontSize={titleSize} fontWeight="bold" color={textColor}>
        Document Viewer
      </Text>

      <HStack spacing={4}>
        {!isResume &&
        <>
        <Button colorScheme="blue" onClick={submitHandler} variant="solid" size={buttonSize} isDisabled={!submittedState || isLoading}>
        Reroll
        </Button>
        <Button
          colorScheme="green"
          variant="solid"
          size={buttonSize}
          isDisabled={!submittedState || isLoading}
          onClick={onOpen}
        >
        Edit
        </Button>
        </>
        }
        <Button colorScheme="orange" variant="solid" size={buttonSize}  onClick={() => downloadHandler(url)}>
        Save
        </Button>
      <IconButton
      // boxSize={'1rem'}
      onClick={onRefresh}
      colorScheme="blue"
      size="xs"
      icon={<RepeatIcon />}
      aria-label="Refresh"
      />
      </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Cover Letter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              placeholder="Enter your edit comment here. It is best to be as specific as possible."
              size="sm"
              minHeight={20}
            />
            <Alert status='error' mt={2}>
              <AlertIcon />
              <AlertTitle>Deleting Current File!</AlertTitle>
              <AlertDescription>Note that AI-generated cover letter changes cannot be guaranteed, so please download your current cover letter before generating a new one to avoid potential overwriting.</AlertDescription>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const DocViewerContainer = ({ file, title, width, height,viewerContainerBorderColor,submittedState,setSubmittedState, isResume,setCoverLetterFile }) => {
  const [docs, setDocs] = useState([]);
  const [downloadFile] = useDownloadFileMutation();
  const [downloadDefaultFile] = useDownloadDefaultFileMutation()
  const [renderKey, setRenderKey] = useState(0);
  const [isLoading2,setIsLoading2] = useState(false)

  const fetchFileBuffer = useCallback(async () => {
    try {
      if (file.isDefault) {
        /* DEFAULT */
        const { data } = await downloadDefaultFile(file.fileKey);
        const url = data.url;
        const fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        setDocs([{ uri: url, fileType }]);
      } else {
        /* NOT DEFAULT */
        const { data } = await downloadFile(file.fileKey);
        const url = data.url;
        const fileType = data.file_info.file_type;
        setDocs([{ uri: url, fileType }]);
      }
      setRenderKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, [file, downloadFile, downloadDefaultFile]);

  useEffect(() => {
    fetchFileBuffer();
  }, [fetchFileBuffer, file]);

  const refreshFile = async () => {
    await fetchFileBuffer();
  };


  return (
    <VStack>
      <Text as="h2" fontSize="3xl">{title}</Text>
      <Box border={`5px solid ${viewerContainerBorderColor}`} rounded="1%">
        <CustomHeader onRefresh={refreshFile} url={docs.length > 0 ? docs[0].uri : null} submittedState={submittedState} setSubmittedState={setSubmittedState} isResume={isResume} setCoverLetterFile={setCoverLetterFile} setIsLoading2={setIsLoading2}/>
        {isLoading2 ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <DocViewer
        key={renderKey}
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          border="5px solid black"
          style={{
            height: height,
            width: width,
          }}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
            csvDelimiter: ",", // "," as default,
            pdfZoom: {
              defaultZoom: 1.1, // 1 as default,
              zoomJump: 0.5, // 0.1 as default,
            },
            pdfVerticalScrollByDefault: true, // false as default
          }}
        />
        )}
      </Box>

    </VStack>
  );
};

export default DocViewerContainer;
