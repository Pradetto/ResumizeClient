import { Button, FormControl, FormLabel, Input, Select, HStack, Checkbox } from "@chakra-ui/react";
import { useGetResumeListQuery } from "state/generalApi";

const ResumeUpload = ({
  showUpload,
  setShowUpload,
  handleFileInputChange,
  handleResumeSelect,
  selectedResumeData,
  setSelectedResumeData
}) => {
  const {data:resumeListData} = useGetResumeListQuery()
  return (
    <>
      <Button
        mb={3}
        onClick={() => {
          setShowUpload(!showUpload);
          setSelectedResumeData({
            id:'',
            user_id:'',
            file_key:'',
            is_default: false
          })
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
              value={selectedResumeData.file_key}
              onChange={handleResumeSelect}
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
                isChecked={selectedResumeData.is_default}
                onChange={() => setSelectedResumeData({...selectedResumeData, is_default: !selectedResumeData.is_default})}
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
              onChange={handleFileInputChange}
            />
          </FormControl>
          <Checkbox
            isChecked={selectedResumeData.is_default}
            onChange={() => setSelectedResumeData({...selectedResumeData, is_default: !selectedResumeData.is_default})}
          >
            Set as default
          </Checkbox>
        </HStack>
      )}
    </>
  );
};

export default ResumeUpload;