import { Button, FormControl, FormLabel, Input, Select, HStack, Checkbox } from "@chakra-ui/react";
import { useGetResumeListQuery, useUploadFileMutation } from "state/generalApi";

const ResumeUpload = ({
  uploadedResumeFile,
  setUploadedResumeFile,
  handleResumeChange,
  isDefault,
  setIsDefault,
  selectedResumeFile,
  setSelectedResumeFile,
  showUpload,
  setShowUpload
}) => {
  const {error: uploadError,isLoading:uploadIsLoading, data:uploadIsSuccess} = useUploadFileMutation()
  const {data:resumeListData} = useGetResumeListQuery()
  return (
    <>
      <Button
        mb={3}
        onClick={() => {
          setShowUpload(!showUpload);
          setUploadedResumeFile(null);
          // setSelectedResumeFile('');
          // setIsDefault(false);
        }}
      >
        {showUpload ? "Select Existing Resume" : "Upload New Resume"}
      </Button>
      {showUpload ? (
        <HStack>
          <FormControl marginBottom="20px">
            <FormLabel htmlFor="resume-file">Upload Resume</FormLabel>
            <Input
              type="file"
              id="resume-file"
              onChange={handleResumeChange}
            />
          </FormControl>
          <Checkbox
            isChecked={isDefault}
            onChange={() => setIsDefault(!isDefault)}
          >
            Set as default
          </Checkbox>
        </HStack>
      ) : (
        <FormControl marginBottom="20px">
          <FormLabel htmlFor="selected-file">Select Existing Resume</FormLabel>
          <HStack>
            <Select
              id="selected-file"
              value={selectedResumeFile}
              onChange={handleResumeChange}
            >
              <option value="">--Select--</option>
              {resumeListData.map((resume) => {
                return (
                  <option
                    key={resume.id}
                    value={resume.file_key}
                  >{resume.file_name}</option>
                )
              })}
            </Select>
            <Checkbox
              isChecked={isDefault}
              onChange={() => setIsDefault(!isDefault)}
            >
              Set as default
            </Checkbox>
          </HStack>
        </FormControl>
      )}
    </>
  );
};

export default ResumeUpload;
