using API.Base;
using API.Models;
using API.Repositories.Data;
using API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Employee")]
    public class AccountsController : BaseController<Account, string, AccountRepositories>
    {
        private AccountRepositories _accrepositories;
        private IConfiguration _confi;
        public AccountsController(AccountRepositories repositories, IConfiguration confi) : base(repositories)
        {
            _accrepositories = repositories;
            _confi = confi;
        }

        [AllowAnonymous]
        [HttpPost, Route("Register")]
        public ActionResult GetRegis(RegisterVM registerVM)
        {
            var check = _accrepositories.CheckRegister(registerVM);
            if (check == 2)
            {
                return Ok(new { statusCode = 204, message = "Email Already Exist!!" });
            }
            else if (check == 3)
            {
                return Ok(new { statusCode = 204, message = "Phone Number Already Exist" });
            }
            try
            {
                var result = _accrepositories.Register(registerVM);
                return result == 0
                    ? Ok(new { statusCode = 200, message = "Data Input Wrong! Input Valid Data" })
                    : Ok(new { statusCode = 200, message = "Data Created!", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { statusCode = 500, message = "Something Wrong!! " + ex.InnerException });
            }
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public ActionResult Login(LoginVM login)
        {
            var exist = _accrepositories.CheckAccount(login);
            if (exist == 0)
            {
                return NotFound(new { statusCode = 404, message = "Email Didn't Exist" });
            }
            try
            {
                var result = _accrepositories.Login(login);
                switch (result)
                {
                    case 0:
                        return Ok(new { statusCode = 200, message = "Account Not Found" });
                    case 1:
                        return Ok(new { statusCode = 200, message = "Password Incorrect" });
                    default:
                        //creat method to get user role when the user log in
                        var roles = _accrepositories.UserRoles(login.Email);

                        var claims = new List<Claim>()
                        {
                            new Claim("email", login.Email),
                            //new Claim(ClaimTypes.Email, login.Email),
                        };

                        foreach (var item in roles)
                        {
                            claims.Add(new Claim(ClaimTypes.Role, item));
                            //claims.Add(new Claim("roles",item));
                        }

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_confi["JWT:Key"]));
                        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            _confi["JWT:Issuer"],
                            _confi["JWT:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(5),
                            signingCredentials: signIn
                            );
                        var generateToken = new JwtSecurityTokenHandler().WriteToken(token);
                        claims.Add(new Claim("Token Security", generateToken.ToString()));

                        return Ok(new { statusCode = 200, message = "Login Success!", data = generateToken });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { statusCode = 500, message = "Something Wrong!! " + ex.Message });
            }
        }
    }
}
