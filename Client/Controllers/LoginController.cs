using API.Models;
using API.ViewModels;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class LoginController : BaseController<Account, LoginRepository, int>
    {
        private readonly LoginRepository repository;
        public LoginController(LoginRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Auth(LoginVM login)
        {
            var jwtToken = await repository.Auth(login);
            var token = jwtToken.IdToken;

            if (token == null)
            {
                return RedirectToAction("index");
                //return RedirectToAction("Index", "Employee");
            }

            HttpContext.Session.SetString("JWToken", token);


            return RedirectToAction("Index", "Home"); //?
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult RecoverPassword()
        {
            return View();
        }
        public IActionResult ForgotPassword()
        {
            return View();
        }
        public IActionResult OTP()
        {
            return View();
        }
    }
}
