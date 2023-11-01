import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, useToast, Spinner, Text, Heading } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../Redux/AppReducer/action';
import CustomInput from './CommonComponents/CustomInput';

export default function CreateNewTask() {
  const taskCreatingProcess = useSelector((state) => state.AppReducer.taskCreatingProcess);
  const taskCreatingSuccess = useSelector((state) => state.AppReducer.taskCreatingSuccess);
  const taskCreatingFail = useSelector((state) => state.AppReducer.taskCreatingFail);
  const taskCreatingMessage = useSelector((state) => state.AppReducer.taskCreatingMessage);
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();


  // handel create task function
  const handelCreateTask = () => {

    // check if userInput is empty
    if (userInput.trim() === '') {
      return displayToast('error', 'Please enter a valid task!');
    }

    // create data object
    const data = {
      task: userInput,
      status: false,
    };

    // dispatch createTask function 
    dispatch(createTask(data));
  };


  // display toast message 
  const displayToast = (status, message) => {
    return toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };


  // useEffect to display toast
  useEffect(() => {
    if (!taskCreatingProcess && taskCreatingSuccess) {
      displayToast('success', taskCreatingMessage);
    } else if (!taskCreatingProcess && taskCreatingFail) {
      displayToast('error', taskCreatingMessage);
    }
  }, [taskCreatingProcess, taskCreatingFail, taskCreatingSuccess]);

  return (
    <Box >


      {/* todo heading */}
      <Heading pt={"4"} fontSize={"2xl"} align={"center"} > TODO Application </Heading>

      {/* input and button container */}
      <Container display={'flex'}>

        {/* input */}
        <CustomInput
          onChange={(e) => setUserInput(e.target.value)}
          label={''}
          type='text'
          placeHolder={'Add Your Task!!'}
        />

        {/* add task button */}
        <IconButton
          onClick={handelCreateTask}
          border='2px'
          borderColor={'brand.300'}
          ml='2'
          mt='4'
          icon={taskCreatingProcess ? <Spinner size='sm' /> : <GrAdd />}
          isDisabled={taskCreatingProcess}
        />
      </Container>
    </Box>
  );
}
