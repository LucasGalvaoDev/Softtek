namespace ApiPacientes.DTO
{
    public class PatientDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateOnly? DataNascimento { get; set; }
    }
}
