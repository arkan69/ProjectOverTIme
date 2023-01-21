using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : BaseController<Role, int, RoleRepositories>
    {
        private RoleRepositories _repo;
        public RolesController(RoleRepositories repositories) : base(repositories)
        {
            _repo= repositories;
        }
    }
}
