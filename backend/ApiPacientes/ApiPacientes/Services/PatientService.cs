using ApiPacientes.DTO;
using ApiPacientes.Mapping;
using ApiPacientes.Repositories;
using System.Globalization;

namespace ApiPacientes.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _repo;

        public PatientService(IPatientRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<PatientDTO> Get(string? nome)
        {
            var allPatients = _repo.GetAll();

            if (string.IsNullOrWhiteSpace(nome))
                return allPatients.Select(x => x.ToDto());

            return allPatients
                .Where(p => p.Nome.Contains(nome, StringComparison.OrdinalIgnoreCase))
            .Select(x => x.ToDto());
        }

        public PatientDTO Create(CreatePatientRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Nome))
            {
                throw new ArgumentException("Nome é obrigatório.");
            }

            var idPatient = _repo.NextId();
            var model = request.ToModel(idPatient);

            _repo.Add(model);
            return model.ToDto();
        }
    }

}
