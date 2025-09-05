using System.ComponentModel.DataAnnotations;

namespace ApiPacientes.DTO
{
    public class CreatePatientRequest
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        public string Nome { get; set; } = default!;

        public string DataNascimento { get; set; }
    }
}
