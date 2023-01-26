using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Employee")]
    public class EmployeesController : BaseController<Employee, string, EmployeeRepositories>
    {
        private EmployeeRepositories _repositories;
        public EmployeesController(EmployeeRepositories repositories) : base(repositories)
        {
            _repositories = repositories;
        }
    }
}
