import React, { useState } from 'react'
import { useGetPatientsQuery } from './features/patients/patientsApi'
import PatientSearch from './components/PatientSearch'
import PatientForm from './components/PatientForm'
import PatientList from './components/PatientList'
import LegacyPanel from './components/LegacyPanel'
import { useDebounce } from './hooks/useDebounce'
import './styles.css'

export default function App() {
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search, 400)

  const { data, isFetching, error } = useGetPatientsQuery(
    debounced && debounced.trim().length ? debounced : undefined
  )

  return (
    <div className="container">
      <h1>Pacientes</h1>

      <div className="grid">
        <div>
          <PatientSearch value={search} onChange={setSearch} />
          <PatientList data={data} loading={isFetching} error={error} />
        </div>

        <div>
          <PatientForm />
          <LegacyPanel />
        </div>
      </div>

      <footer className="muted">RTK Query • Vite • React 18</footer>
    </div>
  )
}
