export type Patient = {
  id: number
  nome: string
  dataNascimento?: string | null
}

export type CreatePatientRequest = {
  nome: string
  dataNascimento?: string | null
}
