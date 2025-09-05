using ApiPacientes.DTO;

namespace ApiPacientes.Services
{
    public interface IPatientService
    {
        IEnumerable<PatientDTO> Get(string? nome);
        PatientDTO Create(CreatePatientRequest request);
    }

}
