import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, HStack, Checkbox } from "@chakra-ui/react";

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

  return (
    <>
      <Button
        mb={3}
        onClick={() => {
          setShowUpload(!showUpload);
          setUploadedResumeFile(null);
          setSelectedResumeFile('');
          setIsDefault(false);
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
              <option value="resume1">Resume 1</option>
              <option value="resume2">Resume 2</option>
              <option value="resume3">Resume 3</option>
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
