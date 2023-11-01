import { Box, Container, Flex, IconButton, useToast, Spinner, Text, Wrap, Badge } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CustomInput from '../Components/CommonComponents/CustomInput';
import { GrAdd } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, getAllTasks } from '../Redux/AppReducer/action';
import CreateNewTask from '../Components/CreateNewTask';
import TaskCard from '../Components/TaskCard';

export default function Home() {
  const deleteTaskFail = useSelector((store) => store.AppReducer.deleteTaskFail)
  const deleteTaskMessage = useSelector((store) => store.AppReducer.deleteTaskMessage)
  const deleteTaskProcessing = useSelector((store) => store.AppReducer.deleteTaskProcessing)
  const deleteTaskSuccess = useSelector((store) => store.AppReducer.deleteTaskSuccess)
  const updateTaskFail = useSelector((store) => store.AppReducer.updateTaskFail)
  const updateTaskSuccess = useSelector((store) => store.AppReducer.updateTaskSuccess)
  const updateTaskProcessing = useSelector((store) => store.AppReducer.updateTaskProcessing)
  const updateTaskMessage = useSelector((store) => store.AppReducer.updateTaskMessage)
  const taskCreatingSuccess = useSelector((state) => state.AppReducer.taskCreatingSuccess);
  const getAllTasksProcessing = useSelector((state) => state.AppReducer.getAllTasksProcessing);
  const allTasks = useSelector((state) => state.AppReducer.allTasks);

  const dispatch = useDispatch();
  const toast = useToast();

  // displayToast
  const displayToast = (status, message) => {
    return (
      toast({
        title: message,
        status: status,
        duration: 3000,
        isClosable: true,
      })
    );
  };


  // display update task toast
  useEffect(() => {
    if (!updateTaskProcessing && updateTaskSuccess) {
      displayToast("success", updateTaskMessage)
    }
    if (!updateTaskProcessing && updateTaskFail) {
      displayToast("error", updateTaskMessage)
    }
  }, [updateTaskProcessing])


  // display delete task toast
  useEffect(() => {
    if (!deleteTaskProcessing && deleteTaskSuccess) {
      displayToast("success", deleteTaskMessage)
    }
    if (!deleteTaskProcessing && deleteTaskFail) {
      displayToast("error", deleteTaskMessage)
    }
  }, [deleteTaskProcessing])


  // get all tasks
  useEffect(() => {
    dispatch(getAllTasks());
  }, [taskCreatingSuccess, deleteTaskSuccess, updateTaskSuccess]);

  return (
    <Box>

      {/* create new task */}
      <CreateNewTask />


      <Container mt="5">

        {/* display total number of tasks */}
        <Wrap mb="5" display={"flex"} justifyContent={"space-around"} w="full" >

          {/* total tasks */}
          <Badge bg="brand.100" color="white" p="1" px="2"  >  Total Tasks - {allTasks.length} </Badge>

          {/* total pending tasks */}
          <Badge bg="brand.100" color="white" p="1" px="2"  >  Pending Tasks - {allTasks.filter(task => task.status === false).length} </Badge>

          {/* completed tasks */}
          <Badge bg="brand.100" color="white" p="1" px="2"  >  Completed Tasks - {allTasks.filter(task => task.status === true).length} </Badge>
        </Wrap>

        {/* display spinner if processing else ma[p tasks] */}
        {getAllTasksProcessing ? (
          <Flex align="center" justify="center" minH="50vh">

            {/* spinner */}
            <Spinner color='white' size="xl" />
          </Flex>
        ) : (
          allTasks.map((item) => (
            <TaskCard key={item._id} item={item} />
          ))
        )}
      </Container>
    </Box>
  );
}
