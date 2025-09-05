namespace ApiPacientes.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateOnly DataNascimento { get; set; }
    }
}
