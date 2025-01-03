import { createContext, useContext, useMemo } from "react";
import { Telegram } from "../lib/telegram";

type Context = {
  telegram: Telegram;
};

const Context = createContext<Partial<Context>>({});

type Props = {
  accessToken: string;
};

export default function Provider({
  accessToken,
  children,
}: React.PropsWithChildren<Props>) {
  const telegram = useMemo(() => new Telegram(accessToken), [accessToken]);
  return <Context.Provider value={{ telegram }}>{children}</Context.Provider>;
}

export const useProvider = () => useContext(Context) as Context;
