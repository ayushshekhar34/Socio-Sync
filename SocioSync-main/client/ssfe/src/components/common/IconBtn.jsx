/* eslint-disable react/prop-types */
import { Button, Flex, Text } from "@chakra-ui/react";
const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      border={outline ? "1px solid" : "none"}
      borderColor={outline ? "yellow" : "transparent"}
      colorScheme={outline ? "white" : "yellow"}
      rounded="md"
      py={2}
      px={5}
      fontWeight="semibold"
      cursor="pointer"
      type={type}
    >
      {children ? (
        <Flex align="center">
          {children}
          <Text ml={2} className={outline && "text-yellow-50"}>
            {text}
          </Text>
        </Flex>
      ) : (
        text
      )}
    </Button>
  );
};

export default IconBtn;
