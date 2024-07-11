import { createContext, useCallback, useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useStepper } from './use-stepper'

interface StepperContextProps {
  previousStep: () => void
  nextStep: () => void
}

export const StepperContext = createContext<StepperContextProps>({} as StepperContextProps)

interface StepperProps {
  initialStep?: number
  steps: {
    label: string
    content: React.ReactNode
  }[]
}

const Stepper = ({ initialStep = 0, steps }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps])

  return (
    <StepperContext.Provider value={{ previousStep, nextStep }}>
      <div>
        <ul className="space-x-6">
          {steps.map((step, idx) => (
            <li
              key={step.label}
              className={cn(
                'inline-block rounded-md px-2 py-1 text-xs',
                idx === currentStep && 'bg-primary text-primary-foreground'
              )}
            >{`${String(idx + 1).padStart(2, '0')}. ${step.label}`}</li>
          ))}
        </ul>
        <div className="mt-10">{steps[currentStep].content}</div>
      </div>
    </StepperContext.Provider>
  )
}

interface HeaderProps {
  title: string
  description: string
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <span className="text-muted-foreground">{description}</span>
    </header>
  )
}

interface FooterProps {
  children: React.ReactNode
}

const Footer = ({ children }: FooterProps) => {
  return <footer className="mt-6 flex w-full justify-end gap-4">{children}</footer>
}

interface NextButtonProps extends ButtonProps {}

const NextButton = ({ onClick }: NextButtonProps) => {
  const { nextStep } = useStepper()

  return (
    <Button size="sm" type="button" onClick={onClick ?? nextStep}>
      Próximo
    </Button>
  )
}

interface PreviousButtonProps extends ButtonProps {}
const PreviousButton = ({ onClick }: PreviousButtonProps) => {
  const { previousStep } = useStepper()

  return (
    <Button size="sm" variant="secondary" type="button" onClick={onClick ?? previousStep}>
      Anterior
    </Button>
  )
}

Stepper.Header = Header
Stepper.Footer = Footer
Stepper.NextButton = NextButton
Stepper.PreviousButton = PreviousButton

export { Stepper }
