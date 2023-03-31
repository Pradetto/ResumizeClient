import React from 'react'
import { 
  Textarea,
} from '@chakra-ui/react';
// import CreatableSelect from 'react-select/creatable';
import { CreatableSelect } from "chakra-react-select";
import FormTitle from 'components/FormTitle';
import { useCreateJobMutation, useGetCompaniesListQuery, useGetRolesAndHiringManagerQuery, useInsertCompanyMutation, useGetExistingLinkMutation, useCreateRoleMutation } from 'state/formApi';
import useCustomToast from 'hooks/useCustomToast';

const JobInfo = ({
  selectedCompany,
  setSelectedCompany,
  handleSelectedCompany,
  selectedJob,
  setSelectedJob,
  handleSelectedJob,
  clearJobFilters,
  clearCompanyFilters,
  clearRoleFilters,
  selectedRole,
  setSelectedRole,
}) => {
  const {data: companiesListData} = useGetCompaniesListQuery()
  const [insertCompany] = useInsertCompanyMutation()
  const [createJob] = useCreateJobMutation()
  const [existingLink] = useGetExistingLinkMutation()
  const [createRole] = useCreateRoleMutation()
  const {data: roleAndHiringManagerData} = useGetRolesAndHiringManagerQuery(selectedCompany.id, { skip: selectedCompany.id === '' })
  const customToast = useCustomToast()

  const customComponents = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null, 
  };
  
return (
  <>

    {/* COMPANY */}
    <FormTitle htmlFor="company" isRequired={true} text="Company">
      <CreatableSelect
        id="company"
        value={
          selectedCompany.id && selectedCompany.company_name
            ? {
                value: selectedCompany.id,
                label: selectedCompany.company_name,
              }
            : null
        }
        onChange={(option) => handleSelectedCompany(option)}
        onCreateOption={async (newCompanyName) => {
          const res = await insertCompany({ company_name: newCompanyName });

          if (!res.error){
            customToast({
              title: "Success!",
              description: `Company created.`,
              status: "success",
            });
            setSelectedCompany({ id: res.data.id, company_name: res.data.company_name, link: '', description: '' });
          } else {
            clearCompanyFilters()
            customToast({
              title: "Error!",
              description: `Company not created. Try again please.`,
              status: "error",
            });
          }
        }}

        options={
          companiesListData?.map((company) => ({
            value: company.id,
            label: company.company_name,
          })) || []
        }
        placeholder="Select or type to create..."
        required
        // styles={customStyles}
      />
    </FormTitle>
    


    {/* LINK */}
    {selectedCompany.id !== '' &&
    <FormTitle htmlFor="link" isRequired={true} text="Job Link (URL)" tooltipLabel="Paste a unqiue URL that you haven't used in the paste. There is an error handler to prevent you from making duplicate cover letters for a job. Please try delete drafts button if you disconnected while trying to submit the form. If it still does not work after that visit the files page and edit it there.">
      <CreatableSelect
        id="link"
        name="link"
        value={
          selectedJob.link
            ? {
                value: selectedJob.link,
                label: selectedJob.link,
              }
            : null
        }

        onCreateOption={async (value) => {
          const res = await createJob({ company_id: selectedCompany.id, link:value });

          if (!res.error){
            customToast({
              title: "Success!",
              description: `Job created.`,
              status: "success",
            });
            setSelectedJob(prevData => ({
              ...prevData,
              id: res.data.id,
              company_id: res.data.company_id,
              link: res.data.link
            }));
          } else if (res.error.data.message === "The link already exists for this user") {
            const result = await existingLink(value)
            setSelectedJob(prevData => ({
              ...prevData,
              id: res.data.id,
              link: result.data.link,
              role_id:result.data.role_id,
              description: result.data.description
            }));
            customToast({
              title: "Job link already exists!",
              description: `Fetched existing job.`,
              status: "error",
            });
          } else {
            clearJobFilters()
            customToast({
              title: "Error!",
              description: `Job not created. Try again please.`,
              status: "error",
            });
          }
        }}
        placeholder={jobUrlPlaceholder}
        required
        components={customComponents}
        // styles={customStyles}
        noOptionsMessage={() => 'Press Enter or click here to create'}
        formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
      />
    </FormTitle>
    }


    {/* ROLE */}
    {selectedJob.link && (
      <FormTitle htmlFor="role" isRequired={true} text="Role" tooltipLabel="This is the Role you are applying too.">
      <CreatableSelect
        id="role"
        value={
          selectedRole.id && selectedRole.role_name
            ? {
                value: selectedRole.id,
                label: selectedRole.role_name,
              }
            : null
        }
        onChange={(option) => {
          handleSelectedJob(option)
        }}
        onCreateOption={async (value) => {
          const res = await createRole({ company_id: selectedCompany.id, role_name:value });

          if (!res.error){
            customToast({
              title: "Success!",
              description: `Job created.`,
              status: "success",
            });
            setSelectedJob(prevData => ({
              ...prevData,
              role_id: res.data.id,
            }));
            setSelectedRole({
              id: res.data.id,
              role_name: res.data.role_name
            });
          } else if (res.error.data.message === "The role already exists for this company") {
            customToast({
              title: "Role already exists!",
              description: `Please select from dropdown.`,
              status: "error",
            });
          } else {
            clearRoleFilters()
            customToast({
              title: "Error!",
              description: `Role not created. Try again please.`,
              status: "error",
            });
          }
        }}
        options={
          roleAndHiringManagerData?.roles.map((job) => ({
            value: job.id,
            label: job.role_name,
          })) || []
        }
        placeholder="Select or type to create..."
        required
        // styles={customStyles}
      />
    </FormTitle>
    )}



    {/* DESCRIPTION */}
    {selectedJob.role_id && (
    <FormTitle htmlFor="job-description" isRequired={true} text="Paste Job Description" tooltipLabel="The more text the more you use of your tokens. Please try to cut out as much fluff from your job description. The AI is smart enough to reduce the original text from the post to highlight key points to save you tokens on future edits and rerolls.">
      <Textarea
        id="job-description"
        value={selectedJob.description}
        placeholder={jobDescriptionPlaceholder}
        onChange={(e) => setSelectedJob(prevData => {
          return {...prevData, description:e.target.value}
        })}
      />
    </FormTitle>
    )}



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