import React from 'react'
import type { Patient } from '../types'

type Props = {
  data?: Patient[]
  loading?: boolean
  error?: unknown
}

export default function PatientList({ data, loading, error }: Props) {
  return (
    <div className="card">
      <h3>Pacientes</h3>
      {loading && <p>Carregando...</p>}
      {error && <p className="error">Erro ao buscar pacientes.</p>}
      {!loading && !error && (
        <ul className="list">
          {data?.length
            ? data.map((p) => (
                <li key={p.id}>
                  <strong>{p.nome}</strong>
                  {p.dataNascimento && (
                    <span className="muted"> — {new Date(p.dataNascimento).toLocaleDateString()}</span>
                  )}
                </li>
              ))
            : <li className="muted">Nenhum paciente encontrado.</li>}
        </ul>
      )}
    </div>
  )
}
