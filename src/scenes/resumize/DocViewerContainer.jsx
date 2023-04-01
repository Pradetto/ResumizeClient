import { useState,useEffect } from "react";
import { VStack, useMediaQuery, Text,Box } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useDownloadCoverLetterMutation } from "state/formApi";
// import FILE from '../../assets/MP.pdf'
// import FILE2 from '../../assets/MP.docx'


const DocViewerContainer = ({ file, title }) => {
  const fileKey = "1/resumes/1679950860629-Michael Pradetto Resume (Word).docx"
//   const fileKey = "1/resumes/1680377813600-Michael Pradetto Resume (PDF).pdf"
  const [docs, setDocs] = useState([]);
  const [downloadCoverLetter, { isLoading }] = useDownloadCoverLetterMutation();



  useEffect(() => {
    const fetchFileBuffer = async () => {
    try {
        const { data } = await downloadCoverLetter(fileKey);
        const url = data.url;
        const fileType = data.file_info.file_type
        setDocs([{ uri: url, fileType }]);
    } catch (error) {
        console.error("Error downloading file:", error);
    }
    };


    fetchFileBuffer();
  }, [downloadCoverLetter]);

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <VStack>
      <Text as="h2" fontSize="3xl">{title}</Text>
      <Box border="5px solid black" rounded="1%">
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          border="5px solid black"
          style={{
            height: isMobile ? "25rem" : "40rem",
            width: isMobile ? "22rem" : "40rem",
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
    </VStack>
  );
};

export default DocViewerContainer;
