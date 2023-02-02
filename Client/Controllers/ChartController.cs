using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    [Authorize(Roles = "Manager")]
    public class ChartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


    }
}
