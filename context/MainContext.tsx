import { darkTheme } from "@/constants/theme";
import IUserPreferences from "@/interfaces/IUserPreferences";
import { getSavedSongs } from "@/services/files";
import {
  getUserPreferences,
  saveUserPreferences,
} from "@/services/userPreferences";
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
  primaryColor: string;
  // dialog: IDialog
  // setDialog: React.Dispatch<React.SetStateAction<IDialog>>
  // alert: IAlert
  // setAlert: React.Dispatch<React.SetStateAction<IAlert>>
  userPreferences: IUserPreferences;
  updateUserPreferences: (newPrefs: Partial<IUserPreferences>) => void;
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  allMusics: IMusic[];
  refreshAllMusics: () => Promise<void>;
}

interface IProps {
  children: any;
}

const MainContext = createContext<IMainContext>({} as IMainContext);

const MainProvider = ({ children }: IProps) => {
  const [primaryColor, setPrimaryColor] = useState<string>(
    darkTheme.primaryColor,
  );

  const [allMusics, setAllMusics] = useState<IMusic[]>([] as IMusic[]);

  const [isDarkMode, setIsDarkMode] = useState<number>(ESwitch.No);
  const [autoPlay, setAutoPlay] = useState<number>(ESwitch.No);

  const [userPreferences, setUserPreferences] = useState<IUserPreferences>(() =>
    getUserPreferences(),
  );
  // const [dialog, setDialog] = useState<IDialog>({
  //   show: false,
  // });
  // const [alert, setAlert] = useState<IAlert>({
  //   show: false,
  //   text: "",
  //   type: "success",
  // });

  const [load, setLoad] = useState(false);

  const updateUserPreferences = (newPrefs: Partial<IUserPreferences>) => {
    const updated = saveUserPreferences(newPrefs);
    setUserPreferences(updated);

    setIsDarkMode(updated.isDarkMode ? 1 : 0);
    setAutoPlay(updated.isDarkMode ? 1 : 0);
    setPrimaryColor(updated.primaryColor);
  };
  // refreshes
  const refreshAllMusics = useCallback(async () => {
    setLoad(true);
    try {
      const response = await getSavedSongs();
      console.log("📂 Músicas retornadas do SQLite:", response.length);
      setAllMusics(response);
    } catch (error) {
      console.error("❌ Erro ao ler SQLite no Context:", error);
    } finally {
      setLoad(false);
    }
  }, []);

  const values = useMemo<IMainContext>(
    () => ({
      isDarkMode,
      setIsDarkMode,
      primaryColor,
      setPrimaryColor,
      load,
      setLoad,
      allMusics,
      refreshAllMusics,
      userPreferences,
      updateUserPreferences,
    }),
    [
      isDarkMode,
      primaryColor,
      setPrimaryColor,
      load,
      setLoad,
      allMusics,
      refreshAllMusics,
    ],
  );

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export function useMainContext(): IMainContext {
  return useContext(MainContext);
}

export default MainProvider;
