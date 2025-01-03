import QRCode from "qrcode-svg";
import { useMemo } from "react";

import SVG from "../SVG";
import Header from "./Header";
import PaneDialog from "../PaneDialog";

type ProcessingVerificationDialogProps = {
  content: string;
} & React.ComponentProps<typeof PaneDialog>;

export default function ProcessingVerificationDialog({
  content,
  open,
  setOpen,
}: ProcessingVerificationDialogProps) {
  const qrCode = useMemo(
    () =>
      new QRCode({
        content,
        color: "white",
        background: "transparent",
      }),
    []
  );

  return (
    <PaneDialog
      open={open}
      setOpen={setOpen}
    >
      <section className="flex-1 flex flex-col px-2 py-4">
        <Header onClose={() => setOpen(false)} />
        <div className="flex-1 flex flex-col items-center">
          <SVG content={qrCode.svg()} />
          <div>
            <p className="text-xs text-center text-white/75">
              Chat admin&nbsp;
              <span className="text-blue">
                personal for Authentication code
              </span>
              &nbsp; or proceed to scan code on your mobile device wallet
              connect.
            </p>
          </div>
        </div>
      </section>
    </PaneDialog>
  );
}
