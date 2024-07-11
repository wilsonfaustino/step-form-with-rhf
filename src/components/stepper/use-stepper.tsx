import { useContext } from 'react'

import { StepperContext } from '.'

export const useStepper = () => {
  const { previousStep, nextStep } = useContext(StepperContext)

  return {
    previousStep,
    nextStep,
  }
}
