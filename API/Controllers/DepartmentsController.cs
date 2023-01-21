using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : BaseController<Department, int, DepartmentRepositories>
    {
        private DepartmentRepositories _repositories;
        public DepartmentsController(DepartmentRepositories repositories) : base(repositories)
        {
            _repositories = repositories;
        }
    }
}
