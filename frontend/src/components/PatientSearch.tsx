import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function PatientSearch({ value, onChange }: Props) {
  return (
    <div className="card">
      <label htmlFor="search">Buscar por nome</label>
      <input
        id="search"
        type="text"
        placeholder="Digite um nome..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
