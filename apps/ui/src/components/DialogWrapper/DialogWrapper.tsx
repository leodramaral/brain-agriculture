import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseTrigger,
  DialogBody,
  DialogFooter,
  Button,
} from '@chakra-ui/react';

interface DialogWrapperProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  body: React.ReactNode;
  title?: string;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({
  isModalOpen,
  setIsModalOpen,
  body,
  title = 'Cadastrar Novo Produtor',
}) => {
  return (
    <DialogRoot
      open={isModalOpen}
      onOpenChange={e => setIsModalOpen(e.open)}
    >
      <DialogBackdrop
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="1400"
      />
      <DialogContent
        maxW="min(90vw, 600px)"
        maxH="90vh"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="1500"
        shadow="2xl"
        borderRadius="lg"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody
          maxH="calc(90vh - 120px)"
          overflowY="auto"
          px={6}
          py={4}
        >
          {body}
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
