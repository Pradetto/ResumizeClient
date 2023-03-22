import { FormControl, FormLabel, Flex, Tooltip } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import React from 'react';

const FormTitle = ({ htmlFor, marginBottom = "20px", isRequired = false, text, children, tooltipLabel }) => {
  return (
    <FormControl marginBottom={marginBottom} isRequired={isRequired}>
      <Flex alignItems="center">
        <FormLabel htmlFor={htmlFor} marginBottom="0" mr={1}>{text}</FormLabel>
        {tooltipLabel && (
          <Tooltip label={tooltipLabel} hasArrow>
            <InfoOutlineIcon color="gray.500" boxSize="0.9em" style={{ marginBottom: '1px' }} />
          </Tooltip>
        )}
      </Flex>
      {children}
    </FormControl>
  );
};

export default FormTitle;
