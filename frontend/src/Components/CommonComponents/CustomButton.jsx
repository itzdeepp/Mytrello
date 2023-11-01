import { Button, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function CustomButton({ label, onClick, isProcessing }) {
  return (
    <Button
      mt="7"  w='full' onClick={onClick} bg='brand.200' color='white'
      _hover={{
        bg: 'brand.100',
      }}
      _active={{
        bg: 'brand.300',
      }}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <>
          Please Wait <Spinner  data-testid="spinner" ml={2} size='sm' color='white' />
        </>
      ) : (
        label
      )}
    </Button>
  );
}
