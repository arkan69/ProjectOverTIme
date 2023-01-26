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
    public class DepartmentsController : BaseController<Department, int, DepartmentRepositories>
    {
        private DepartmentRepositories _repositories;
        public DepartmentsController(DepartmentRepositories repositories) : base(repositories)
        {
            _repositories = repositories;
        }
    }
}
