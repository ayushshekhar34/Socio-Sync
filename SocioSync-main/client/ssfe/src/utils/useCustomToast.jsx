import { useToast } from '@chakra-ui/react';
const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({ title, status, duration = 5000, isClosable = true, position }) => {
    return toast({
      title,
      status,
      duration,
      isClosable,
      position,
    });
  };

  const updateToast = (toastId, { title, status, duration = 5000, isClosable = true, position }) => {
    toast.update(toastId, {
      title,
      status,
      duration,
      isClosable,
      position,
    });
  };

  return { showToast, updateToast };
};

export default useCustomToast;
