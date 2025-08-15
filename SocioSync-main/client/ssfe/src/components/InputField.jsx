import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {Box, Text, Input, InputGroup, Icon, InputRightAddon} from '@chakra-ui/react'

const InputField = (props) => {
    const {label, field, password, value, onChange} = props;
    const [showPassword, setShowPassword] = useState(true);
    const temp = password === true ? "password" : "text";
    const [typ, setType] = useState(temp)
    
    const handleClick = () => {
        if(showPassword)
        {
            setType("text");
        }
        else{
            setType("password");
        }
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        onChange(e.target.value);
    };

  return (
    <Box mt={"15px"} mb={"10px"}>
        <Text fontSize={"10px"} padding={1} color={"gray.400"}>{label}</Text>
        <InputGroup>
            <Input mt={"0px"} 
               placeholder={field} 
               focusBorderColor={"yellow.500"} 
               borderBottomWidth={"1px"} 
               borderTopWidth={0} 
               borderRightWidth={0} 
               bg={"gray.800"}
               type={typ}
               color={"gray.300"}
               value={value}
               onChange={handleChange}
               />
            {password && <InputRightAddon 
                          bg={"inherit"} 
                          onClick={handleClick} 
                          bgColor={"gray.800"} 
                          color={"whitesmoke"}
                          borderRightWidth={0} 
                          borderTopWidth={0} 
                          borderBottomWidth={"1px"}
                          borderBottomLeftRadius={0}
                          borderBottomRightRadius={"lg"}
                          borderTopRightRadius={"lg"}
                          _hover={{cursor:"pointer"}}
                          >
             <Icon as={ showPassword ? AiOutlineEye : AiOutlineEyeInvisible}/>
            </InputRightAddon>}
        </InputGroup>
    </Box>
  )
}

export default InputField