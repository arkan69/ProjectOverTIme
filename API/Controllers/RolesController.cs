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
    public class RolesController : BaseController<Role, int, RoleRepositories>
    {
        private RoleRepositories _repo;
        public RolesController(RoleRepositories repositories) : base(repositories)
        {
            _repo= repositories;
        }
    }
}
