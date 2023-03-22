import React from 'react'
import { 
    Input,
    Textarea
} from '@chakra-ui/react';
import CreatableSelect from 'react-select/creatable';
import FormTitle from 'components/FormTitle';

const JobInfo = ({selectedCompany,fetchedCompanies,handleCompanyChange,subformData,handleRoleChange,filteredRoles,jobUrl,handleJobUrl,jobDescription,handleJobDescriptionChange}) => {
return (
  <>
    <FormTitle htmlFor="company" isRequired={true} text="Company">
      <CreatableSelect
        id="company"
        // value={
        //   selectedCompany
        //     ? {
        //         value: selectedCompany,
        //         label: fetchedCompanies.find(
        //           (company) => company.id === parseInt(selectedCompany)
        //         ).name,
        //       }
        //     : null
        // }
        onChange={(option) => handleCompanyChange(option)}
        // options={fetchedCompanies.map((company) => ({
        //   value: company.id,
        //   label: company.name,
        // }))}
        placeholder="Select or type to create..."
      />
    </FormTitle>
    <FormTitle htmlFor="role" isRequired={true} text="Role" tooltipLabel="This is the job title you are applying too.">
      <CreatableSelect
        id="role"
        // value={subformData.role ? { label: subformData.role } : null}
        onChange={handleRoleChange}
        // options={filteredRoles.map((role) => ({
        //   value: role.name,
        //   label: role.name,
        // }))}
        placeholder="Select or type to create..."
      />
    </FormTitle>
    <FormTitle htmlFor="job-url" isRequired={true} text="Job Link (URL)" tooltipLabel="Paste a unqiue URL that you haven't used in the paste. There is an error handler to prevent you from making duplicate cover letters for a job. If you do have an exisitng one please edit that.">
      <Input type='text' id='job-url' value={jobUrl} onChange={handleJobUrl} placeholder={jobUrlPlaceholder}/>
    </FormTitle>
    <FormTitle htmlFor="job-description" isRequired={true} text="Paste Job Description" tooltipLabel="The more text the more you use of your tokens. Please try to cut out as much fluff from your job description. The AI is smart enough to reduce the original text from the post to highlight key points to save you tokens on future edits and rerolls.">
      <Textarea
        id="job-description"
        // value={jobDescription}
        placeholder={jobDescriptionPlaceholder}
        onChange={handleJobDescriptionChange}
      />
    </FormTitle>
  </>
)
}

const jobUrlPlaceholder = `https://www.linkedin.com/jobs/view/3533564818`
const jobDescriptionPlaceholder = `The Job Overview

We are seeking a software developer to join our growing company. You will collaborate with other developers to create and maintain the various software applications we use to streamline our business and increase our efficiency.

Your duties will include developing software for mobile and web platforms to automate our internal processes and make communication seamless between departments.

Responsibilities

Below are some of the responsibilities a software engineer is expected to assume in their position:  

Design, debug, and build software applications
Perform code walk-throughs to ensure code correctness
Work with other engineers to architect, build, and test new features
Participate in code reviews and test designs
Work in an agile environment to release software on a regular schedule
Test software applications and debugging to ensure that they meet business requirements
Troubleshoot existing software and resolve any problems
Work with business analysts to define software development lifecycle requirements
Conduct design reviews to confirm that software architecture is sound
Improve and document existing software and tools
Job Qualifications and Skill Sets

Below are the qualifications expected of a software engineer:

Proficiency in at least one programming language, such as Python, SQL, Java, C#, C++, Ruby, PHP, or JavaScript
Proficiency with data structures, algorithms, and computer science fundamentals
Experience with version control using tools such as Git
Experience with testing tools and computer systems
Experience with build tools and development processes
Proficient communication skills
`

export default JobInfo