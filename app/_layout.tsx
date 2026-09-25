import { Slot } from "expo-router";
import { useState } from "react";
import { LogBox } from "react-native";
import MainProvider from "../context/MainContext";

// // Impede o app de ocultar a splash até que tudo esteja pronto
// SplashScreen.preventAutoHideAsync().catch(() => {})

LogBox.ignoreLogs(["Text"]);

// function AuthRedirect() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const pathname = usePathname()
//   const [at, setAt] = useState<string | null>(null)
//   const [it, setIt] = useState(0)

//   const needWizard = useMemo(async () => {
//     const creditCardsResponse = await CreditCardService.all()
//     const accountsResponse = await AccountService.all()
//     const savingsResponse = await SavingService.all()
//     const fixedsResponse = await TransactionService.getFixed()

//     const hasCreditCards =
//       creditCardsResponse.Status === 'SUCCESS' &&
//       creditCardsResponse.Data.length > 0 // tem cartao de credito?
//     const hasAccounts =
//       accountsResponse.Status === 'SUCCESS' && accountsResponse.Data.length > 0 // tem conta?
//     const hasSavings =
//       savingsResponse.Status === 'SUCCESS' && savingsResponse.Data.length > 0 // tem algum investimento?
//     const hasFixeds =
//       fixedsResponse.Status === 'SUCCESS' && fixedsResponse.Data.length > 0 // tem alguma conta fixa?

//     return !hasCreditCards && !hasAccounts && !hasSavings && !hasFixeds
//   }, [])

//   const getToken = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken')
//       const chaves = await AsyncStorage.getAllKeys()
//       // console.log(`Chaves do storage: ${chaves.join(",")}`)
//       // if (__DEV__) {
//       //   router.replace('/test')
//       //   return
//       // }

//       if (accessToken) {
//         router.replace('/(tabs)/home')
//         // const wizard = await needWizard
//         // if (wizard) router.replace('/wizard/wellcome')
//         // else router.replace('/(tabs)/home')
//       } else {
//         console.log('Sem token, redirecionando para /login')
//         router.replace('/auth/wellcome')
//       }
//     } catch (err) {
//       console.error('Erro ao acessar AsyncStorage:', err)
//     }
//   }

//   useEffect(() => {
//     if (it < 2) getToken()

//     // router.replace("/(tabs)/home");
//     // if (at === null && !pathname.startsWith("/auth")) {
//     //   router.replace("/auth/wellcome");
//     // }
//     // if (at && pathname === "/") {
//     //   router.replace("/(tabs)/home");
//     // }
//   }, [it])

//   return null
// }

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Carrega as fontes uma vez no início
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await Font.loadAsync({
  //         "Inter-Regular": require("@/assets/fonts/Inter_18pt-Regular.ttf"),
  //         "Inter-Bold": require("@/assets/fonts/Inter_18pt-Bold.ttf"),
  //         "Inter-Italic": require("@/assets/fonts/Inter_18pt-Italic.ttf"),
  //         "Inter-BoldItalic": require("@/assets/fonts/Inter_18pt-BoldItalic.ttf"),
  //       });
  //     } catch (e) {
  //       console.warn("Erro ao carregar fontes:", e);
  //     } finally {
  //       setFontsLoaded(true);
  //       await SplashScreen.hideAsync();
  //     }
  //   }

  //   prepare();
  // }, []);

  // if (!fontsLoaded) return null;

  return (
    <MainProvider>
      {/* <Alert />
        <Dialog /> */}
      {/* <AuthRedirect /> */}
      <Slot />
    </MainProvider>
  );
}
