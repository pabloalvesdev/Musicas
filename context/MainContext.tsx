import { darkTheme } from "@/constants/theme";
import { getLocalSongs } from "@/services/files";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IMusic } from "../interfaces";

enum ESwitch {
  No,
  Yes,
}

interface IMainContext {
  isDarkMode: number;
  setIsDarkMode: React.Dispatch<React.SetStateAction<number>>;
  primaryColor: string;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
  // dialog: IDialog
  // setDialog: React.Dispatch<React.SetStateAction<IDialog>>
  // alert: IAlert
  // setAlert: React.Dispatch<React.SetStateAction<IAlert>>
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  baseMusics: IMusic[];
  refreshBaseMusics: () => Promise<void>;
}

interface IProps {
  children: any;
}

const MainContext = createContext<IMainContext>({} as IMainContext);

const MainProvider = ({ children }: IProps) => {
  const [primaryColor, setPrimaryColor] = useState<string>(
    darkTheme.primaryColor,
  );

  const [baseMusics, setBaseMusics] = useState<IMusic[]>([] as IMusic[]);

  const [isDarkMode, setIsDarkMode] = useState<number>(ESwitch.Yes);
  // const [dialog, setDialog] = useState<IDialog>({
  //   show: false,
  // });
  // const [alert, setAlert] = useState<IAlert>({
  //   show: false,
  //   text: "",
  //   type: "success",
  // });
  const [load, setLoad] = useState(false);

  // refreshes

  const refreshBaseMusics = useCallback(async () => {
    setLoad(true);
    const response = await getLocalSongs();
    setBaseMusics(response);
    setLoad(false);
  }, []);

  const values = useMemo<IMainContext>(
    () => ({
      isDarkMode,
      setIsDarkMode,
      primaryColor,
      setPrimaryColor,
      load,
      setLoad,
      baseMusics,
      refreshBaseMusics,
    }),
    [
      isDarkMode,
      setIsDarkMode,
      primaryColor,
      setPrimaryColor,
      load,
      setLoad,
      baseMusics,
      refreshBaseMusics,
    ],
  );

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export function useMainContext(): IMainContext {
  return useContext(MainContext);
}

export default MainProvider;
