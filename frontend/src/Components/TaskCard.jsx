import { Badge, Box, Button, Flex, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import MoreActionsButton from './MoreActionsButton';

export default function TaskCard({ item }) {
  return (
    <Flex
      p={2}
      mb="2"
      rounded="md"
      bg="white"
      align="center"
      justify="space-between"
      border="2px"
      borderColor={"brand.300"}

    >

    {/* task text */}
      <Text>{item.task}</Text>

      {/* more action button and status badge */}
      <Wrap align="center">

      {/* status badge */}
        <Badge h="fit-content" bg="brand.50" color="black" px="1" cursor="pointer">
          {!item.status ? 'Pending' : 'Completed'}
        </Badge>

        {/* more action button */}
        <MoreActionsButton item={item} />
      </Wrap>
    </Flex>
  );
}
