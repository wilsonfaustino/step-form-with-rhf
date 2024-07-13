import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Stepper } from '@/components/stepper'
import { AccountStep } from '@/components/steps/account-step'
import { AddressStep } from '@/components/steps/address-step'
import { PersonalDataStep } from '@/components/steps/personal-data-step'

import type { FormValues } from './schemas/form-schema'
import { formSchema } from './schemas/form-schema'

export const App = () => {
  const form = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountData: {
        email: '',
        password: '',
      },
      personalData: {
        firstname: '',
        lastname: '',
        document: '',
      },
      addressData: {
        state: '',
        city: '',
        address: '',
      },
    },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(values)
  })

  console.log(form.formState.errors)

  return (
    <div className="flex min-h-screen justify-center pt-40">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Stepper
            steps={[
              { label: 'Conta', content: <AccountStep /> },
              { label: 'Dados Pessoais', content: <PersonalDataStep /> },
              { label: 'Endereço', content: <AddressStep /> },
            ]}
          />
        </form>
      </FormProvider>
    </div>
  )
}
