import createStore from './create-store'
import initialState from './initial-state'
import getAppliedEffects from './tools/get-applied-effects'
import effectsFromModifiers from './tools/effects-from-modifiers'

const configureStore = (image, settings) => {
  const {effects} = settings
  const appliedEffects = getAppliedEffects(effects)
  const appliedEffectsFromModifiers = effectsFromModifiers(image.cdnUrlModifiers, effects)

  return createStore({
    ...initialState,
    ...{image},
    ...{
      appliedEffects: {
        ...appliedEffects,
        ...appliedEffectsFromModifiers.effects,
      },
    },
    ...{otherModifiers: appliedEffectsFromModifiers.otherModifiers},
  })
}

export default configureStore