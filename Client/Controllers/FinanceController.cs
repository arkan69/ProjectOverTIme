using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    [Authorize(Roles = "Finance")]
    public class FinanceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
