import { createContext, useContext,useState } from "react";

type Context = {
  manualVerification: boolean;
  setManualVerification: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = createContext<Partial<Context>>({});


export default function Provider({
  children,
}: React.PropsWithChildren) {
  const [manualVerification, setManualVerification] = useState(false);

  return (
    <Context.Provider
      value={{  manualVerification, setManualVerification }}
    >
      {children}
    </Context.Provider>
  );
}

export const useProvider = () => useContext(Context) as Context;
