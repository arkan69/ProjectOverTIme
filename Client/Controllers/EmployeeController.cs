using API.Models;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Client.Controllers
{
    public class EmployeeController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository repository;
        public EmployeeController(EmployeeRepository repository) : base(repository)
        {
            this.repository = repository;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetMasterEmployee()
        {
            var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
            var result = await repository.GetMasterEmployee(email);
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> SplkEmployee()
        {
            var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
            var result = await repository.SplkEmployee(email);
            return Json(result);
        }
    }
}
