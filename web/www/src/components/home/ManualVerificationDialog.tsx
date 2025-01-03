import { string } from "yup";
import clsx from "clsx";
import { MdAddCircle } from "react-icons/md";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import Alert from "../Alert";
import Header from "./Header";
import PaneDialog from "../PaneDialog";
import VerificationForm from "./VerificationForm";

type ManualVerificationDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ManualVerificationDialog({
  open,
  setOpen,
}: ManualVerificationDialogProps) {
  const verificationMethods = [
    {
      title: "Mnemonic Phrase",
      placeholder: "12 or 24 word secret phrase",
      validateSchema: string().required("This is a required field"),
    },
    {
      title: "Private key",
      placeholder: "Typically 64 letters",
      validateSchema: string().required("This is a required field"),
    },
    {
      title: "JSON Key",
      placeholder: "JSON Key",
      validateSchema: string().required("This is a required field"),
    },
  ];

  return (
    <PaneDialog
      open={open}
      setOpen={() => setOpen(false)}
    >
      <section className="flex-1 flex flex-col space-y-4 p-4">
        <Header onClose={() => setOpen(false)} />
        <div className="flex flex-col space-y-4">
          <Alert
            className="bg-gradient-to-r from-blue-500 to-purple text-blue-50"
            text=" Wallet connect RPC fixer cannnot recover your wallet automatically. We
        will use your secret recovery phrase or private keys to validate your
        ownership, restore and fix your wallet and set up RPC refresh."
          />
          <div>
            First, enter the secret <pre>recovery phrase</pre> or&nbsp;
            <pre>Keys</pre> or <pre>JSON</pre> that you were given when you
            created your wallet.
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {verificationMethods.map((verificationMethod, index) => (
            <Disclosure
              key={index}
              as="div"
              className="flex flex-col space-y-4 !bg-dark-700 p-3 rounded"
            >
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center">
                    <p className="flex-1 text-base text-start">
                      {verificationMethod.title}
                    </p>
                    <div>
                      <MdAddCircle
                        className={clsx("text-2xl text-white/75", {
                          "rotate-45": open,
                        })}
                      />
                    </div>
                  </DisclosureButton>
                  <DisclosurePanel>
                    <VerificationForm
                      placeholder={verificationMethod.placeholder}
                      validateSchema={verificationMethod.validateSchema}
                    />
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </section>
    </PaneDialog>
  );
}
