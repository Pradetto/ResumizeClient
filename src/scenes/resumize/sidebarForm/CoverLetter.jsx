import React, { useState } from 'react'
import { 
    RadioGroup,
    Radio,
    Textarea
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import FormTitle from 'components/FormTitle';

const CoverLetter = ({handleGenerateCoverLetterChange,coverLetterText,handleCoverLetterTextChange}) => {
    const generateCoverLetter = useState(true)
    return (
    <>
        {/* DEFAULTING VALUE TO YES */}
        <FormTitle htmlFor="generate-cover-letter" isRequired={false} text="Generate Cover Letter?">
        <RadioGroup
            // value={generateCoverLetter ? 'yes' : 'no'}
            // value='yes'
            onChange={handleGenerateCoverLetterChange}
        >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
        </RadioGroup>
        </FormTitle>
        {generateCoverLetter && (
        <FormTitle htmlFor="cover-letter-text" isRequired={false} text="Cover Letter Text" tooltipLabel="This part can be used to add custom items beyond your resume to this AI developed cover letter. Feel free to add anything to your cover letter">
            <Textarea
            id="cover-letter-text"
            // value={coverLetterText}
            onChange={handleCoverLetterTextChange}
            isDisabled={!generateCoverLetter}
            placeholder="In addition to my resume I have a couple other skills relevant to this job description. Can you please add my Project Management and Google Data Analytics Certifications. Also, can you keep the tone semi-informal as I have a preexisitng relationship with the recruiter."
            />
        </FormTitle>
        )}
    </>
    )

    }

export default CoverLetter