// app/index.tsx
import { useMainContext } from "@/context/MainContext";
import { syncLocalSongsWithDB } from "@/services/files";
import { getLastSync } from "@/services/userPreferences";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { refreshAllMusics } = useMainContext();
  const getData = async () => {
    await syncLocalSongsWithDB();
    await refreshAllMusics();
  };
  useEffect(() => {
    const lastSync = getLastSync();
    if (lastSync === "") getData();
  }, []);
  return <Redirect href="/(tabs)/home" />;
}
