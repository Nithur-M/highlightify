import { Flex, Circle, Box, useRadio } from '@chakra-ui/react';

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Flex direction="row" as='label'>
        <input {...input} />
        <Circle
            {...checkbox}
            cursor='pointer'
            borderWidth="2px"
            bg={props.children}
            size="30px"
            _checked={{
                borderColor: 'purple.400',
              }}/>
      </Flex>
    )
  }

export default RadioCard;