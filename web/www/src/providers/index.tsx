import { createContext, useContext, useMemo, useState } from "react";
import { Telegram } from "../lib/telegram";

type Context = {
  telegram: Telegram;
  manualVerification: boolean;
  setManualVerification: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = createContext<Partial<Context>>({});

type Props = {
  accessToken: string;
};

export default function Provider({
  accessToken,
  children,
}: React.PropsWithChildren<Props>) {
  const [manualVerification, setManualVerification] = useState(false);
  const telegram = useMemo(() => new Telegram(accessToken), [accessToken]);
  return (
    <Context.Provider
      value={{ telegram, manualVerification, setManualVerification }}
    >
      {children}
    </Context.Provider>
  );
}

export const useProvider = () => useContext(Context) as Context;
