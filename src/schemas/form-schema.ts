import { z } from 'zod'

const accountDataSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

const personalDataSchema = z.object({
  firstname: z.string().min(1, 'Nome é obrigatório'),
  lastname: z.string().min(1, 'Sobrenome é obrigatório'),
  document: z.string().length(11, 'CPF inválido'),
})

const addressDataSchema = z.object({
  state: z.string().min(1, 'Estado é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  address: z.string().min(1, 'Endereço é obrigatório'),
})

export const formSchema = z.object({
  accountData: accountDataSchema,
  personalData: personalDataSchema,
  addressData: addressDataSchema,
})

export type FormValues = z.infer<typeof formSchema>
