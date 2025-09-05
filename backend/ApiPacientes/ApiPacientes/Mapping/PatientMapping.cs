using ApiPacientes.DTO;
using ApiPacientes.Models;

namespace ApiPacientes.Mapping
{
    public static class PatientMapping
    {
        public static PatientDTO ToDto(this Patient model) => new()
        {
            Id = model.Id,
            Nome = model.Nome,
            DataNascimento = model.DataNascimento
        };

        public static Patient ToModel(this CreatePatientRequest req, int id) => new()
        {
            Id = id,
            Nome = req.Nome.Trim(),
            DataNascimento = DateOnly.Parse(req.DataNascimento)
        };
    }
}
