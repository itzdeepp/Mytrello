import { Box, Flex, Heading, Stack, Text, Wrap, useTheme, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CustomInput from '../Components/CommonComponents/CustomInput';
import CustomButton from '../Components/CommonComponents/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthentication, signUp } from '../Redux/AuthReducer/action';
import { useNavigate } from "react-router-dom"

export default function Signup() {

  const [userInput, setUserInput] = useState({ email: "", name: "", password: "" })
  const isSignupSuccess = useSelector((state) => state.AuthReducer.isSignupSuccess)
  const isSignupProcess = useSelector((state) => state.AuthReducer.isSignupProcess)
  const isSignupFail = useSelector((state) => state.AuthReducer.isSignupFail)
  const isSignupMessage = useSelector((state) => state.AuthReducer.isSignupMessage)
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();



  // /handel input change
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // handel button click
  const handleClick = () => {
    const { name, email, password } = userInput;

    // Validation checks
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      displayToast("error", "Please fill out all the fields.")
    } else if (!emailIsValid(email)) {
      displayToast("error", "Please enter a valid email address.")
    } else if (password.length < 8) {
      displayToast("error", "Password must have at least 8 characters.")
    } else {
      dispatch(signUp(userInput));
    }
  };


  // displayToast
  const displayToast = (status, message, description) => {
    return (
      toast({
        title: message,
        status: status,
        description: description,
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

    if (!isSignupProcess && isSignupSuccess) {
      displayToast("success", isSignupMessage, "Please Login To Continue!")
    }
    if (!isSignupProcess && isSignupFail) {
      displayToast("error", isSignupMessage)
    }
  }, [isSignupProcess])


  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} >
      <Box minW={"300px"} bg={"white"} border={"2px"} borderColor={"brand.200"} rounded={"10px"} p="4">

        {/* heading  */}
        <Text fontSize='2xl' as="b" > Signup to conitnue! </Text>

        {/* name input] */}
        <CustomInput onChange={handleChange} label={"name"} type="text" placeHolder={"Enter Your Full Name!"} />

        {/* email input */}
        <CustomInput onChange={handleChange} label={"email"} type="text" placeHolder={"Enter Your Email!"} />

        {/* password input */}
        <CustomInput onChange={handleChange} label={"password"} type="password" placeHolder={"Enter Your Password!"} />

        {/* submit button */}
        <CustomButton label='Signup' onClick={handleClick} isProcessing={isSignupProcess} />

        {/* go to login page */}
        <Wrap cursor={"pointer"} mt="5"> <Text> Already Have Account, </Text> <Text as="b" onClick={() => { navigate("/login") }}>Login</Text> </Wrap>

      </Box>
    </Flex>
  )
}
