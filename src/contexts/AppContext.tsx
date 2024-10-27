"use client";



import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext<{
  user: any | null;
  isSwapPage: boolean;
  setUser: (user: any | null) => void;
  setIsSwapPaged: (isSwap: boolean) => void;

}>({
  user: null,
  isSwapPage: false,
  setUser: () => {},
  setIsSwapPaged: () => {},

});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

const AppProvider = ({
  children,
  initialAccessToken = "",
  user: userProp,
}: {
  children: React.ReactNode;
  initialAccessToken?: string;
  user?: any | null;
}) => {
  const [user, setUser] = useState<any | null>(userProp);
  const [isSwapPage, setIsSwapPaged] = useState<boolean>(false);

//   useState(() => {
//     if (typeof window !== "undefined") {
//       clientAccessToken.value = initialAccessToken;
//     }
//   });

  return (
    <AppContext.Provider value={{ user,isSwapPage, setUser, setIsSwapPaged }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
