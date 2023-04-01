import { useState,useEffect } from "react";
import { VStack, useMediaQuery, Text,Box } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useDownloadDefaultFileMutation, useDownloadFileMutation } from "state/formApi";
// import FILE from '../../assets/MP.pdf'
// import FILE2 from '../../assets/MP.docx'


const DocViewerContainer = ({ file, title, width, height,viewerContainerBorderColor }) => {
  const [docs, setDocs] = useState([]);
  const [downloadFile, { isLoading }] = useDownloadFileMutation();
  const [downloadDefaultFile] = useDownloadDefaultFileMutation()



  useEffect(() => {
    const fetchFileBuffer = async () => {
    try {
        if (file.isDefault){
            console.log('IS DEFAULT')
            const {data} = await downloadDefaultFile(file.fileKey)
            const url = data.url;
            const fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            console.log(url,fileType)
            setDocs([{ uri: url, fileType }]);
        } else {
            console.log('NOT DEFAULT')
            const { data } = await downloadFile(file.fileKey);
            const url = data.url;
            const fileType = data.file_info.file_type
            setDocs([{ uri: url, fileType }]);
        }
    } catch (error) {
        console.error("Error downloading file:", error);
    }
    };


    fetchFileBuffer();
  }, [downloadFile,file.fileKey,file.isDefault,downloadDefaultFile]);


  return (
    <VStack>
      <Text as="h2" fontSize="3xl">{title}</Text>
      <Box border={`5px solid ${viewerContainerBorderColor}`} rounded="1%">
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          border="5px solid black"
          style={{
            height: height,
            width: width,
          }}
          config={{
            // header: {
            //   disableHeader: true,
            //   disableFileName: true,
            //   retainURLParams: false,
            // },
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
