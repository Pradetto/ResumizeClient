import { FormControl, FormLabel, Input, Select, HStack,Checkbox } from "@chakra-ui/react";
import { useState } from "react";


const ResumeUpload = ({resumeFile,handleResumeFileChange,selectedFile,handleSelectedFileChange}) => {
  const [isDefault, setIsDefault] = useState(false)
  return (
  <>
    <FormControl marginBottom="20px">
    <FormLabel htmlFor="resume-file">Upload Resume</FormLabel>
    <Input
        type="file"
        id="resume-file"
        value={resumeFile}
        onChange={handleResumeFileChange}
    />
    </FormControl>
    <FormControl marginBottom="20px">
    <FormLabel htmlFor="selected-file">Select Existing Resume</FormLabel>
      <HStack>
        <Select
          id="selected-file"
          value={selectedFile}
          onChange={handleSelectedFileChange}
        >
          <option value="">--Select--</option>
          <option value="resume1">Resume 1</option>
          <option value="resume2">Resume 2</option>
          <option value="resume3">Resume 3</option>
        </Select>
        <Checkbox isChecked={isDefault} onChange={() => setIsDefault(!isDefault)}>
          Set as default
        </Checkbox>
      </HStack>
    </FormControl>
    </>

  )
}

export default ResumeUpload