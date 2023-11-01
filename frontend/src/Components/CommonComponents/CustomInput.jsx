import { Container, Input, Text, IconButton, InputGroup, InputRightElement, Box } from '@chakra-ui/react';
import { BiHide, BiShow } from 'react-icons/bi';
import React, { useState } from 'react';

export default function CustomInput({ label, type, placeHolder, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  //   toggle password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box w="full" mt={4}>
      <Text as='b'>{label.charAt(0).toUpperCase() + label.slice(1)}</Text>
      <InputGroup>
        <Input
          onChange={onChange}
          type={showPassword ? 'text' : type}
          border='2px'
          bg={'white'}
          name={label}
          placeholder={placeHolder}
          borderColor='brand.200'
          borderRadius='md'
          _focus={{
            borderColor: 'brand.200',
            boxShadow: '0 0 0 2px rgba(17, 45, 49, 0.2)',
          }}
          _hover={{
            borderColor: 'brand.200',
          }}
          px={3}
          py={2}
        />

        {/* display only for password */}
        {type === 'password' && (
          <InputRightElement width='3rem'>

            {/* toggle hide and show icon */}
            <IconButton
              bg={"transparent"}
              _hover={{ background: "transprent" }}
              h='1.5rem'
              size='sm'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              icon={showPassword ? <BiHide size={"20px"} /> : <BiShow size={"20px"} />}
              onClick={handleTogglePassword}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
}
