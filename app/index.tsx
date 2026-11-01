// app/index.tsx
import { useMainContext } from "@/context/MainContext";
import { syncLocalSongsWithDB } from "@/services/files";
import {
  getLastSync,
  getUserPreferences,
  saveLastSync,
} from "@/services/userPreferences";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { refreshAllMusics, setLoad } = useMainContext();

  const getData = async () => {
    setLoad(true);
    await syncLocalSongsWithDB();
    saveLastSync();
    await refreshAllMusics();
    setLoad(false);
  };
  const getStorage = () => {
    console.log("aa", getUserPreferences());
  };
  useEffect(() => {
    getStorage();
    const lastSync = getLastSync();
    if (lastSync === "") getData();
  }, []);
  return <Redirect href="/(tabs)/home" />;
}
