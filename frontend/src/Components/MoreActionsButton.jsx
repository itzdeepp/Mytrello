import React, { useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  useToast,
  background,
} from '@chakra-ui/react';

import { MdOutlineDeleteOutline, MdOutlineDownloadDone } from "react-icons/md"
import { CgMoreVerticalO } from "react-icons/cg"
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../Redux/AppReducer/action';

export default function MoreActionsButton({ item }) {

  const toast = useToast();
  const dispatch = useDispatch();


  // available actions
  const actions = [
    {
      label: !item.status? 'Mark as Completed': "Mark as Pending",
      icon: <MdOutlineDownloadDone />,
      onClick: () => dispatch(updateTask(item._id, !item.status)),
    },
    {
      label: 'Delete Task',
      icon: <MdOutlineDeleteOutline />,
      onClick: () => dispatch(deleteTask(item._id)),
    }
  ];



  return (
    <Flex justifyContent="center">

    {/* pophover */}
      <Popover placement="bottom" >
        <PopoverTrigger>
          <IconButton
            bg="transparent"
            icon={<CgMoreVerticalO />}
            w="fit-content"
          />
        </PopoverTrigger>

        {/* popover content */}
        <PopoverContent border="2px" borderRadius={"10px"} borderColor={"brand.400"} w="fit-content" _focus={{ boxShadow: 'none' }}>
        
        {/* popover arrow */}
          <PopoverArrow border="2px" />
          <PopoverBody >

          {/* buttons stack */}
            <Stack >

            {/* map button */}
              {actions.map((action, index) => (
                <Button
                  bg="transparent"
                  key={index}
                  rightIcon={action.icon}
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
