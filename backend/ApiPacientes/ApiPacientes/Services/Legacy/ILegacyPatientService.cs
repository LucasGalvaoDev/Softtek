using ApiPacientes.DTO;

namespace ApiPacientes.Services.Legacy
{
    public interface ILegacyPatientService
    {
        IEnumerable<PatientDTO> GetFromLegacy();
    }
}
