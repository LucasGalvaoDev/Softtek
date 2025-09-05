using ApiPacientes.DTO;
using ApiPacientes.Services.Legacy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using static ApiPacientes.Services.Legacy.LegacyPatientService;

namespace ApiPacientes.Controllers
{
    [ApiController]
    [Route("api/legacy")]
    public class LegacyController : ControllerBase
    {
        private readonly ILegacyPatientService _legacy;

        public LegacyController(ILegacyPatientService legacy)
        {
            _legacy = legacy;
        }

        [HttpGet("pacientes")]
        public ActionResult<IEnumerable<PatientDTO>> GetLegacy()
        {
            try
            {
                var result = _legacy.GetFromLegacy();
                return Ok(result);
            }
            catch (LegacyValidationException ex)
            {
                var ms = new ModelStateDictionary();
                foreach (var e in ex.Errors)
                    ms.AddModelError("legacy.codigo", e);

                return ValidationProblem(ms);
            }
        }
    }
}
