import { toast } from "react-toastify";
import { useProvider } from "../providers";

export default function ErrorMsg() {
  const { setManualVerification } = useProvider();

  return (
    <div className="font-sans flex space-x-2 items-center">
      <p className="flex-1">Unable to authenticate connect manually</p>
      <button
        className="shrink-0  border border-red-500 text-red-500 px-4 py-2 rounded"
        onClick={() => {
          setManualVerification(true);
          toast.dismiss();
        }}
      >
        Connect
      </button>
    </div>
  );
}
