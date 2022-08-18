import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Divider,
} from "@chakra-ui/react";

export default function ForgotModal({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>ลืมรหัสผ่าน</Text>
            <Text fontSize="sm">Forgot password</Text>
            <Divider border="1px" mt={3} />
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody textAlign="center">
            <Text>รหัสผ่านใหม่จะถูกส่งไปยังอีเมลที่ระบุไว้</Text>
            <Text fontSize="sm">
              (A new password will be sent to the specified email.)
            </Text>

            <FormControl py={5} px={10}>
              <FormLabel fontWeight="semibold">ชื่อผู้ใช้ (Username)</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Type your username"
                variant="filled"
              />
              <FormLabel fontWeight="semibold" mt={5}>
                อีเมล (E-mail)
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Type your email"
                variant="filled"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              size="sm"
              mr={3}
              fontWeight="bold"
              rounded="full"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
