import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { setSearch } from "../../redux/Slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";

export const Search = (type) => {
  const [value, setvalue] = useState("");
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(setSearch(null));
  }, []);
  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  const handleClick = () => {
    if (value !== null) {
      const trimVal = value.trim();
      if (trimVal !== "" || trimVal !== null) {
        dispatch(setSearch(trimVal));
      } else {
        dispatch(setSearch(null));
      }
    }
  };

  const handleClose = () => {
    setvalue("");
    dispatch(setSearch(null));
  };

  return (
    <InputGroup mb={2} mt={2} ml={1}>
      <InputLeftElement
        borderRadius={"md"}
        _hover={{ cursor: "pointer", bg: "gray.700", transition: "0.5s" }}
        onClick={handleClick}
      >
        <Search2Icon />
      </InputLeftElement>
      <Input
        bg={"#2e333d"}
        _focus={{ borderColor: "initial", outline: "none", boxShadow: "none" }}
        borderWidth={0}
        placeholder="search"
        fontSize={"sm"}
        color={"gray.400"}
        value={value}
        onChange={handleChange}
      />
      {query && (
        <InputRightElement
          borderRadius={"md"}
          _hover={{ cursor: "pointer", bg: "gray.700", transition: "0.5s" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
