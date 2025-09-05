using ApiPacientes.DTO;
using ApiPacientes.Models;
using ApiPacientes.Repositories;
using ApiPacientes.Services;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace ApiPacientes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacientesController : ControllerBase
    {
        private readonly IPatientService _service;

        public PacientesController(IPatientService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PatientDTO>> Get([FromQuery] string? nome)
        {
            var result = _service.Get(nome);
            return Ok(result);
        }

        [ProducesResponseType(typeof(PatientDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [HttpPost]
        public ActionResult<PatientDTO> Create([FromBody] CreatePatientRequest request)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (!DateOnly.TryParseExact(request.DataNascimento, "yyyy-MM-dd",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out var dob))
            {
                ModelState.AddModelError("dataNascimento", "Data inválida. Use yyyy-MM-dd (ex.: 1990-01-31).");
                return ValidationProblem(ModelState);
            }

            var result = _service.Create(request);
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }
    }
}
