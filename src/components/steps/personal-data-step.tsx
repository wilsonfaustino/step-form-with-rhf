import { useFormContext } from 'react-hook-form'

import type { FormValues } from '@/schemas/form-schema'

import { Stepper } from '../stepper'
import { useStepper } from '../stepper/use-stepper'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export const PersonalDataStep = () => {
  const form = useFormContext<FormValues>()
  const { nextStep } = useStepper()

  async function handleNext() {
    const isValid = await form.trigger('personalData')

    if (isValid) {
      nextStep()
    }
  }

  return (
    <div className="space-y-6">
      <Stepper.Header title="Dados Pessoais" description="Conte-me mais sobre você" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstname">Primeiro nome</Label>
          <Input id="firstname" {...form.register('personalData.firstname')} />
          {form.formState.errors.personalData?.firstname && (
            <small className="text-destructive">{form.formState.errors.personalData.firstname.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastname">Sobrenome</Label>
          <Input id="lastname" {...form.register('personalData.lastname')} />
          {form.formState.errors.personalData?.lastname && (
            <small className="text-destructive">{form.formState.errors.personalData.lastname.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="document">CPF</Label>
          <Input id="document" {...form.register('personalData.document')} />
          {form.formState.errors.personalData?.document && (
            <small className="text-destructive">{form.formState.errors.personalData.document.message}</small>
          )}
        </div>
      </div>
      <Stepper.Footer>
        <Stepper.PreviousButton />
        <Stepper.NextButton onClick={handleNext} />
      </Stepper.Footer>
    </div>
  )
}
