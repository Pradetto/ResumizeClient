import { VStack, useMediaQuery, Text,Box, HStack, Button } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useEffect } from "react";
// import FILE from '../../assets/MP.pdf'
// import FILE2 from '../../assets/MP.docx'

const DocViewerContainer = ({file,title}) => {
    const docs = [
        {uri:file}
    ]
    const [isMobile] = useMediaQuery("(max-width: 768px)")

    return (
        <VStack>
            <Text as='h2' fontSize='3xl'>{title}</Text>
            <Box border="5px solid black">
                <DocViewer
                    pluginRenderers={DocViewerRenderers}
                    documents={docs}
                    border="5px solid black"
                    style={{ height: isMobile ? "400px" : "600px", width: isMobile? "350px" : "600px"}}
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
            <HStack>
                <Button>Reroll</Button>
                <Button>Edit</Button>
                <Button>Save</Button>
            </HStack>
        </VStack>
    )
}

export default DocViewerContainer