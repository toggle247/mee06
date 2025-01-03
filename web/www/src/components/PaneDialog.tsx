import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

type PaneDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaneDialog({
  open,
  setOpen,
  children,
}: React.PropsWithChildren<PaneDialogProps>) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogBackdrop className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center p-4 md:justify-center z-20">
        <DialogPanel className="m-auto max-w-sm flex flex-col bg-dark-900 rounded-md overflow-y-scroll md:max-w-sm">
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
