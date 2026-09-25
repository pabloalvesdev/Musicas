import { useMemo } from "react";
import { darkTheme, lightTheme } from "../constants/theme";
import { useMainContext } from "../context/MainContext";

const useTheme = () => {
  const { isDarkMode } = useMainContext();
  const customTheme = useMemo(
    () => (isDarkMode === 1 ? darkTheme : lightTheme),
    [isDarkMode],
  );

  return { customTheme: customTheme };
};

export default useTheme;
