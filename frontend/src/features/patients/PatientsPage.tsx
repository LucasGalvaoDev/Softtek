import { FormEvent, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import ThemeToggle from "../../components/ThemeToggle";
import Modal from "../../components/Modal";
import AppHeader from "../../components/AppHeader";
import {
  useGetPatientsQuery,
  useAddPatientMutation,
  type Patient,
  type CreatePatient,
} from "./patientsApi";

/** Formata "yyyy-MM-dd" -> "dd/MM/yyyy" sem problemas de timezone */
function formatDateBR(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

/** Extrai ProblemDetails de erros do RTK Query */
function useFieldErrors(error: unknown) {
  return useMemo(() => {
    const fallback: Record<string, string[]> = {};
    const data: any = (error as any)?.data;
    if (data?.errors && typeof data.errors === "object") return data.errors as Record<string, string[]>;
    if (data?.detail) return { general: [String(data.detail)] };
    return fallback;
  }, [error]);
}

export default function PatientsPage() {
  // Busca com debounce
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data: patients, isLoading } = useGetPatientsQuery(debounced || undefined);

  // Modal de cadastro
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreatePatient>({ nome: "", dataNascimento: "" });
  const [addPatient, addState] = useAddPatientMutation();
  const fieldErrors = useFieldErrors(addState.error);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await addPatient(form).unwrap();
      setOpen(false);
      setForm({ nome: "", dataNascimento: "" });
      await Swal.fire({
        title: "Sucesso",
        text: "Paciente cadastrado com sucesso.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#1f4f8b",
      });
    } catch (err: any) {
      const detail = (err?.data?.detail || "Falha ao cadastrar.").toString();
      await Swal.fire({
        title: "Erro",
        text: detail,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#1f4f8b",
      });
    }
  }

  const showErr = (f: string) =>
    fieldErrors[f]?.map((m, i) => (
      <div key={i} style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>{m}</div>
    ));

  return (
    <div className="container">
      <AppHeader 
      title="Pacientes"
      logoSrc="/src/assets/softtek-logo.png"
      onNew={() => setOpen(true)}
      />

      <section className="card">
        <div className="search">
          <input
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar por nome"
          />
        </div>

        <div className="list">
          {isLoading && <div className="list-item"><span>Carregando...</span></div>}
          {!isLoading && (patients ?? []).map((p: Patient) => (
            <div key={p.id} className="list-item">
              <div>
                <div className="item-name">{p.nome}</div>
                <div className="item-sub">Aniversário: {formatDateBR(p.dataNascimento)}</div>
              </div>
              <span className="badge">ID {String(p.id).slice(0, 6)}</span>
            </div>
          ))}
          {!isLoading && (!patients || patients.length === 0) && (
            <div className="list-item">
              <div className="item-sub">Nenhum paciente encontrado.</div>
            </div>
          )}
        </div>
      </section>

      {/* Modal de cadastro */}
      <Modal open={open} onClose={() => setOpen(false)} title="Cadastrar paciente">
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <label>Nome</label>
              <input
                className="input"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Fulano da Silva"
                required
              />
              {showErr("nome")}
            </div>
            <div>
              <label>Data de nascimento</label>
              <input
                className="input"
                type="date"
                value={form.dataNascimento}
                onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                required
              />
              {showErr("dataNascimento")}
            </div>
          </div>

          {showErr("general")}

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={() => setOpen(false)}>Cancelar</button>
            <button type="submit" className="primary-btn" disabled={addState.isLoading}>
              {addState.isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
