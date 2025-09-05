import React, { useState } from 'react'
import { useAddPatientMutation } from '../features/patients/patientsApi'

export default function PatientForm() {
  const [nome, setNome] = useState('')
  const [dataNascimento, setDataNascimento] = useState<string>('')
  const [addPatient, { isLoading, error }] = useAddPatientMutation()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) return

    try {
      await addPatient({
        nome: nome.trim(),
        dataNascimento: dataNascimento || null
      }).unwrap()

      setNome('')
      setDataNascimento('')
    } catch {
      // erro já tratado via `error`
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Cadastrar Paciente</h3>

      <label htmlFor="nome">Nome *</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label htmlFor="dob">Data de nascimento</label>
      <input
        id="dob"
        type="date"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
      />

      <button type="submit" disabled={isLoading || !nome.trim()}>
        {isLoading ? 'Salvando...' : 'Salvar'}
      </button>

      {error && <p className="error">Erro ao salvar. Verifique os dados.</p>}
    </form>
  )
}
