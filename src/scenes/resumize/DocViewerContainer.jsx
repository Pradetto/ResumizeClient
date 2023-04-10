import { useState,useEffect,useCallback } from "react";
import { VStack, useColorModeValue,IconButton, Text,Box,HStack,Button, useBreakpointValue } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useDownloadDefaultFileMutation, useDownloadFileMutation } from "state/formApi";


const CustomHeader = ({ onRefresh,url,submittedState,isResume }) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  // const submittedState = true
  const isMobile = useBreakpointValue({ base: true, md: false });
  const buttonSize = isMobile ? 'xs': 'sm'
  const titleSize = isMobile ? 'xs' : 'md'


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
        <Button colorScheme="blue" variant="solid" size={buttonSize} isDisabled={!submittedState}>
        Reroll
        </Button>
        <Button colorScheme="green" variant="solid" size={buttonSize} isDisabled={!submittedState}>
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
    </Box>
  );
};

const DocViewerContainer = ({ file, title, width, height,viewerContainerBorderColor,submittedState,isResume }) => {
  const [docs, setDocs] = useState([]);
  const [downloadFile] = useDownloadFileMutation();
  const [downloadDefaultFile] = useDownloadDefaultFileMutation()
  const [renderKey, setRenderKey] = useState(0);

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
        <CustomHeader onRefresh={refreshFile} url={docs.length > 0 ? docs[0].uri : null} submittedState={submittedState} isResume={isResume}/>
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
      </Box>
      {/* <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />   */}
    </VStack>
  );
};

export default DocViewerContainer;
