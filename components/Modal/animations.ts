import { useCallback, useMemo } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const useLocalAnimations = () => {
  const animDuration = 200
  const positions = {
    modal: {
      unmounted: 0,
      mounted: 1,
    },
  }
  const scale = useSharedValue(positions.modal.unmounted)

  const mount = useCallback(() => {
    //puxa o modal pra cima
    scale.value = withTiming(positions.modal.mounted, {
      duration: animDuration,
      easing: Easing.ease,
    })
  }, [positions.modal.mounted, scale])

  const unmount = useCallback(() => {
    //puxa o modal pra baixo
    // positionY.value = withTiming(positions.modal.unmounted, {
    //     duration: animDuration,
    //     easing: Easing.ease
    // });
    scale.value = withTiming(1.5, { duration: 200 }, isFinished => {
      if (isFinished) {
        // Depois: solta com mola forte pra frente
        scale.value = withTiming(positions.modal.unmounted, {
          duration: animDuration,
          easing: Easing.ease,
        })
      }
    })
  }, [positions.modal.unmounted, scale])

  const animatedModalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  }, [])

  return useMemo(
    () => ({
      mount,
      unmount,
      animatedModalStyle,
    }),
    [mount, unmount, animatedModalStyle],
  )
}

export default useLocalAnimations
