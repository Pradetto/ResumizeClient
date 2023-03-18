import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, useDisclosure, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDeleteProfileMutation } from 'state/authApi';
import useCustomToast from 'hooks/useCustomToast';

const DeleteProfileModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleteProfile] = useDeleteProfileMutation()
    const navigate = useNavigate()
    const customToast = useCustomToast()

    const deleteProfileHandler = async () => {
        try {
            await deleteProfile();
            navigate("/home");
            customToast({
            title: "Profile deleted",
            description: "You have successfully deleted your profile.",
            status: "success",
            });
            window.location.reload();
        } catch (err) {
            console.error("Error deleting profile:", err);
            customToast({
            title: "Delete error",
            description: `${err.data.message}`,
            status: "error",
            });
        }
    };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>Delete Profile</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'red'} fontWeight='bold'>Delete Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
                <Text color='red.400'>Are you sure you want to delete your profile? This is irreversible.</Text>
            <HStack spacing={4} minW={'full'} justify='center'>
                <Button colorScheme="red" variant="solid" minW={10} onClick={deleteProfileHandler}>YES</Button>
                <Button colorScheme="green" variant="solid" minW={10} onClick={onClose}>No</Button>
            </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteProfileModal;
