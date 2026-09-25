import { useMemo } from "react"
import { Dimensions } from "react-native";
import { useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get('window');
const useLocalAnimations = () => {
    const keyboard = useAnimatedKeyboard();
    const translateX = useSharedValue(0);
    
    const puxar = (index: number) => {
        translateX.value = withTiming(-index * width, { duration: 300 });
    }
    
    
    const animatedButtonStyle = useAnimatedStyle(() => ({ marginBottom: keyboard.height.value }));
    const animatedStepStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));

    return useMemo(()=>({
        animatedButtonStyle,
        animatedStepStyle,
        puxar
    }), [animatedButtonStyle, animatedStepStyle, puxar])
}

export default useLocalAnimations;