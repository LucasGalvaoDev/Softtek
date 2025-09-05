using ApiPacientes.Models;

namespace ApiPacientes.Repositories
{
    public interface IPatientRepository
    {
        IReadOnlyList<Patient> GetAll();
        void Add(Patient patient);
        int NextId();
    }
}
