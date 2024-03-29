import React from "react";
import { Button, FormControl, FormLabel, Input, HStack, Checkbox, } from "@chakra-ui/react";
import { useGetResumeListQuery } from "state/formApi";
import {Select} from "chakra-react-select";

const ResumeUpload = ({
  showUpload,
  setShowUpload,
  handleFileInputChange,
  handleResumeSelect,
  selectedResumeData,
  setSelectedResumeData,
  isFormLoading
}) => {
  const {data:resumeListData} = useGetResumeListQuery()

  const options = resumeListData?.map((resume) => ({
  value: resume.file_key,
  label: resume.file_name,
  })) || [];

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
        isDisabled={isFormLoading}
      >
        {showUpload ? "Upload New Resume":"Select Existing Resume"}
      </Button>
      {showUpload ? (
        <FormControl marginBottom="20px">
          <FormLabel htmlFor="selected-file">Select Existing Resume</FormLabel>
          <HStack>
            <Select
              id="selected-file"
              size="lg"
              value={
                selectedResumeData.file_key
                  ? {
                      value: selectedResumeData.file_key,
                      label: resumeListData.find(
                        (resume) => resume.file_key === selectedResumeData.file_key
                      )?.file_name,
                    }
                  : null
              }
              onChange={(option) => handleResumeSelect(option)}
              options={options}
              placeholder="--Select--"
              isDisabled={isFormLoading}
            />
              <Checkbox
                isChecked={selectedResumeData.is_default}
                onChange={() => setSelectedResumeData({...selectedResumeData, is_default: !selectedResumeData.is_default})}
                isDisabled={isFormLoading}
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
              isDisabled={isFormLoading}
            />
          </FormControl>
          <Checkbox
            isChecked={selectedResumeData.is_default}
            onChange={() => setSelectedResumeData({...selectedResumeData, is_default: !selectedResumeData.is_default})}
            isDisabled={isFormLoading}
          >
            Set as default
          </Checkbox>
        </HStack>
      )}
    </>
  );
};

export default ResumeUpload;