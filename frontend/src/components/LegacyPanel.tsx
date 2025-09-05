import React, { useState } from 'react'
import { useLazyGetLegacyPatientsQuery } from '../features/patients/patientsApi'

export default function LegacyPanel() {
  const [open, setOpen] = useState(false)
  const [trigger, { data, isFetching, isUninitialized, error }] = useLazyGetLegacyPatientsQuery()

  function toggle() {
    const next = !open
    setOpen(next)
    if (next && isUninitialized) trigger()
  }

  return (
    <div className="card">
      <button onClick={toggle}>
        {open ? 'Ocultar pacientes (legado)' : 'Mostrar pacientes (legado)'}
      </button>

      {open && (
        <div style={{ marginTop: 12 }}>
          {isFetching && <p>Carregando...</p>}
          {error && <p className="error">Erro ao carregar do legado.</p>}
          {!isFetching && data && (
            <ul className="list">
              {data.map(d => (
                <li key={d.id}>
                  <strong>{d.nome}</strong>
                  {d.dataNascimento && (
                    <span className="muted"> — {new Date(d.dataNascimento).toLocaleDateString()}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
