using ApiPacientes.Models;
using ApiPacientes.Repositories;
namespace Patients.Api.Repositories;

public class InMemoryPatientRepository : IPatientRepository
{
    private readonly List<Patient> _items = new();
    private int _lastId = 0;
    private readonly object _lock = new();

    public InMemoryPatientRepository()
    {
        _items.AddRange(new[]
        {
            new Patient { Id = NextId(), Nome = "Joana Silveira", DataNascimento = new DateOnly(1990,1,1) },
            new Patient { Id = NextId(), Nome = "Lucas Galvão",  DataNascimento = new DateOnly(1988,5,12) },
            new Patient { Id = NextId(), Nome = "João da Silva",  DataNascimento = new DateOnly(1988,5,12) },
            new Patient { Id = NextId(), Nome = "Rosangela Rodrigues",  DataNascimento = new DateOnly(1988,5,12) },
            new Patient { Id = NextId(), Nome = "Natália Mendes",  DataNascimento = new DateOnly(1988,5,12) }
        });
    }

    public IReadOnlyList<Patient> GetAll()
    {
        lock (_lock)
        {
            return _items.ToList();
        }
    }

    public void Add(Patient patient)
    {
        lock (_lock)
        {
            _items.Add(patient);
        }
    }

    public int NextId()
    {
        lock (_lock)
        {
            _lastId++;
            return _lastId;
        }
    }
}
