using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : BaseController<Account, string, AccountRepositories>
    {
        private AccountRepositories _accrepositories;
        private IConfiguration _confi;
        public AccountsController(AccountRepositories repositories, IConfiguration confi) : base(repositories)
        {
            _accrepositories = repositories;
            _confi = confi;
        }
    }
}
