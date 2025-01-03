import { MdClose } from "react-icons/md";

import IcWalletConnnect from "../../assets/ic_wallet_connect.svg";

type HeaderProps = {
  onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
  return (
    <header className="flex items-center space-x-4">
      <button
        className="bg-dark p-2 rounded-full"
        onClick={onClose}
      >
        <MdClose />
      </button>
      <div className="flex-1 flex items-center justify-center space-x-2">
        <img
          src={IcWalletConnnect}
          width={24}
          height={24}
          alt="wallet connect"
        />
      </div>
    </header>
  );
}
