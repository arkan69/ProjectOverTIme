using API.Base;
using API.Models;
using API.Repositories.Data;
using API.ViewModels;
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

        [HttpGet, Route("Master")]
        //[AllowAnonymous]
        public ActionResult GetMaster(string email)
        {
            try
            {
                var result = _repositories.MasterEmployee(email);
                return result == null
                ? NotFound(new { message = "Data Tidak Ada" })
                : Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [AllowAnonymous]
        [HttpGet("Manager")]
        public ActionResult SplkEmployee(string email)
        {
            try
            {
                var result = _repositories.SplkEmployee(email);
                return result == null
                ? NotFound(new { message = "Data Tidak Ada" })
                : Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("TestUpdate")]
        public ActionResult UpdateForm(SplkUpdateVM update)
        {
            try
            {
                var result = _repositories.UpdateForm(update);
                return result == null
                ? NotFound(new { message = "Data Tidak Ada" })
                : Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
