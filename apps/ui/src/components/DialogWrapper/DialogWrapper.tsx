import { DialogRoot, DialogBackdrop, DialogContent, DialogHeader, DialogTitle, DialogCloseTrigger, DialogBody, DialogFooter, Button } from "@chakra-ui/react"

interface DialogWrapperProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    body: React.ReactNode;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({ isModalOpen, setIsModalOpen, body }) => {
    return (
      <DialogRoot open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e.open)}>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Produtor</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
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
