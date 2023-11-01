import { Box, Flex, Heading, Stack, Text, Wrap, useTheme, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CustomInput from '../Components/CommonComponents/CustomInput';
import CustomButton from '../Components/CommonComponents/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/AuthReducer/action';
import { useNavigate } from "react-router-dom"

export default function Signup() {

  const [userInput, setUserInput] = useState({ email: "", name: "", password: "" })
  const isLoginSuccess = useSelector((state) => state.AuthReducer.isLoginSuccess)
  const isLoginProcess = useSelector((state) => state.AuthReducer.isLoginProcess)
  const isLoginFail = useSelector((state) => state.AuthReducer.isLoginFail)
  const isLoginMessage = useSelector((state) => state.AuthReducer.isLoginMessage)
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate()

  // /handel input change
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // handel button click
  const handleClick = () => {
    const { email, password } = userInput;

    // Validation checks
    if (email.trim() === '' || password.trim() === '') {
      displayToast("error", "Please fill out all the fields.")
    } else if (!emailIsValid(email)) {
      displayToast("error", "Please enter a valid email address.")
    } else {
      dispatch(login(userInput));
    }
  };


  // displayToast
  const displayToast = (status, message) => {
    return (
      toast({
        title: message,
        status: status,
        duration: 3000,
        isClosable: true,
      }))
  }


  // Email validation
  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  // useEffect
  useEffect(() => {

    if (!isLoginProcess && isLoginSuccess) {
      displayToast("success", isLoginMessage)
      navigate("/")
    }
    if (!isLoginProcess && isLoginFail) {
      displayToast("error", isLoginMessage)
    }
  }, [isLoginProcess])


  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} >
      <Box minW={"300px"} bg={"white"} border={"2px"} borderColor={"brand.200"} rounded={"10px"} p="4">

        {/* heading text */}
        <Text fontSize='2xl' as="b" > Login to conitnue! </Text>

        {/* email input */}
        <CustomInput onChange={handleChange} label={"email"} type="text" placeHolder={"Enter Your Email!"} />

        {/* password input */}
        <CustomInput onChange={handleChange} label={"password"} type="password" placeHolder={"Enter Your Password!"} />

        {/* submit button */}
        <CustomButton label='Login' onClick={handleClick} isProcessing={isLoginProcess} />


        {/* redirect to signup  */}
        <Wrap cursor={"pointer"} mt="5"> <Text> Don't Have Account, </Text> <Text as="b" onClick={() => { navigate("/signup") }}>Signup</Text> </Wrap>

      </Box>
    </Flex>
  )
}
