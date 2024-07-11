import { useFormContext } from 'react-hook-form'

import type { FormValues } from '@/schemas/form-schema'

import { Stepper } from '../stepper'
import { useStepper } from '../stepper/use-stepper'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export const AccountStep = () => {
  const { nextStep } = useStepper()
  const form = useFormContext<FormValues>()

  async function handleNext() {
    const isValid = await form.trigger('accountData')

    if (isValid) {
      nextStep()
    }
  }

  return (
    <div className="space-y-6">
      <Stepper.Header title="Crie sua conta" description="Seus dados de acesso" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register('accountData.email')} />
          {form.formState.errors.accountData?.email?.message && (
            <small className="text-destructive">{form.formState.errors.accountData.email.message}</small>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...form.register('accountData.password')} />
          {form.formState.errors.accountData?.password?.message && (
            <small className="text-destructive">{form.formState.errors.accountData.password.message}</small>
          )}
        </div>
      </div>
      <Stepper.Footer>
        <Stepper.NextButton onClick={handleNext} />
      </Stepper.Footer>
    </div>
  )
}
