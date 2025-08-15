import { useState, useRef, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../services/operations/ProfileSettingsAPI";
import IconBtn from "../../common/IconBtn";
import useCustomToast from "../../../utils/useCustomToast";
import {
  Box,
  Flex,
  Button,
  Text,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { loginData } = useSelector((state) => state.auth);
  console.log("loginreducerdata is:", loginData)
  const user = loginData;
  const dispatch = useDispatch();
  const { showToast, updateToast } = useCustomToast();


  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  // const [updatedFormData, setUpdatedFormData] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      setLoading(true);
      const formData = new FormData();
      console.log(imageFile);
      // formData.displayPicture = imageFile;
      // formData.append("displayPicture", imageFile);
      //   setUpdatedFormData(formData);
      // console.log("formdata", formData);
      dispatch(updateDisplayPicture(token, imageFile, showToast, updateToast)).then(() => {
        setLoading(false);
        // console.log("opns me sahi gya");
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        rounded="md"
        borderWidth="1px"
        borderColor="white"
        bg="gray.800"
        color="white"
        mx={"auto"}
        width={"100%"}
        maxW={"700px"}
        p={"8"}
      >
        <Flex align="center" gap={4}>
          <Image
            src={previewSource || user?.profilePic}
            alt={`profile-${user?.firstName}`}
            className="aspect-square"
            w="78px"
            h="78px"
            rounded="full"
            objectFit="cover"
          />
          <Box>
            <VStack gap={3}>
              <Text fontSize="lg">Change Profile Picture</Text>
              <Flex gap={3}>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  display="none"
                  accept="image/png, image/gif, image/jpeg"
                />
                <Button
                  onClick={handleClick}
                  disabled={loading}
                  rounded="md"
                  bg="yellow.400"
                  py={2}
                  px={4}
                  fontWeight="semibold"
                  color="black"
                  cursor="pointer"
                  _hover={"white"}
                >
                  Select
                </Button>
                <IconBtn
                  text={loading ? "Uploading..." : "Upload"}
                  onClick={handleFileUpload}
                >
                  {!loading && <FiUpload fontSize="lg" color="richblack.900" />}
                </IconBtn>
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
