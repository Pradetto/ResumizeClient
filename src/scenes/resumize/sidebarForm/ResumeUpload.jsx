import { Button, FormControl, FormLabel, Input, Select, HStack, Checkbox } from "@chakra-ui/react";
import { useGetResumeListQuery } from "state/generalApi";

const ResumeUpload = ({
  handleResumeChange,
  isDefault,
  setIsDefault,
  selectedResumeFile,
  setSelectedResumeFile,
  showUpload,
  setShowUpload
}) => {
  const {data:resumeListData} = useGetResumeListQuery()

  return (
    <>
      <Button
        mb={3}
        onClick={() => {
          setShowUpload(!showUpload);
          setSelectedResumeFile('');
          setIsDefault(false);
        }}
      >
        {showUpload ? "Upload New Resume":"Select Existing Resume"}
      </Button>
      {showUpload ? (
        <FormControl marginBottom="20px">
          <FormLabel htmlFor="selected-file">Select Existing Resume</FormLabel>
          <HStack>
            <Select
              id="selected-file"
              value={selectedResumeFile}
              onChange={handleResumeChange}
            >
              <option value="">--Select--</option>
              {resumeListData?.map((resume) => {
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
      ) : (
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
      )}
    </>
  );
};

export default ResumeUpload;
