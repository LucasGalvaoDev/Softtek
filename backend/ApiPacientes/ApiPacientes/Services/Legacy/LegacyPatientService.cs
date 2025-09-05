using ApiPacientes.DTO;
using System.Globalization;
using System.Text.Json;

namespace ApiPacientes.Services.Legacy
{
    public class LegacyPatientService : ILegacyPatientService
    {
        private readonly IWebHostEnvironment _env;

        public LegacyPatientService(IWebHostEnvironment env)
        {
            _env = env;
        }

        private sealed class LegacyPatient
        {
            public string codigo { get; set; }
            public string nomeCompleto { get; set; } = default!;
            public string dtNasc { get; set; } = default!;
        }

        public class LegacyValidationException : Exception
        {
            public List<string> Errors { get; }
            public LegacyValidationException(List<string> errors)
                : base("Dados do legado inválidos") => Errors = errors;
        }


        public IEnumerable<PatientDTO> GetFromLegacy()
        {
            var path = Path.Combine(_env.ContentRootPath, "Data", "legacy-pacientes.json");
            if (!File.Exists(path))
                return Enumerable.Empty<PatientDTO>();

            var json = File.ReadAllText(path);
            var legacy = JsonSerializer.Deserialize<List<LegacyPatient>>(json) ?? new();

            var invalid = legacy
            .Where(lp => string.IsNullOrWhiteSpace(lp.codigo)
                      || !int.TryParse(lp.codigo.Trim(), NumberStyles.Integer, CultureInfo.InvariantCulture, out _))
            .Select(lp => $"codigo inválido '{lp.codigo ?? "<vazio>"}' (nome: {lp.nomeCompleto ?? "<sem nome>"})")
            .ToList();

            if (invalid.Count > 0)
            {
                throw new LegacyValidationException(invalid);
            }

            return legacy.Select(lp => new PatientDTO
            {
                Id = Int32.Parse(lp.codigo),
                Nome = lp.nomeCompleto,
                DataNascimento = ParseDate(lp.dtNasc)
            });
        }

        private static DateOnly? ParseDate(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return null;

            input = input.Trim();

            // Cubra os formatos que chegam do legado
            var formats = new[] {
                "yyyy-MM-dd", 
                "dd/MM/yyyy",
                "yyyyMMdd",
                "dd-MM-yyyy"
            };

            if (DateOnly.TryParseExact(input, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out var d))
                return d;

            if (DateOnly.TryParse(input, new CultureInfo("pt-BR"), DateTimeStyles.None, out d))
                return d;

            if (DateOnly.TryParse(input, CultureInfo.InvariantCulture, DateTimeStyles.None, out d))
                return d;

            return null;
        }

    }
}
