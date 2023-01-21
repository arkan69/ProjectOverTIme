using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employee, string, EmployeeRepositories>
    {
        private EmployeeRepositories _repositories;
        public EmployeesController(EmployeeRepositories repositories) : base(repositories)
        {
            _repositories = repositories;
        }
    }
}
