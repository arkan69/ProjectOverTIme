using API.Models;
using Client.Base;
using Client.Models;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;

namespace Client.Controllers
{
    public class SplkController : Controller
    {
        private readonly SplkRepository repository;
        private readonly Address address;
        private readonly HttpClient httpClient;
        public SplkController(SplkRepository repository, Address address) 
        {
            this.repository = repository;
            this.address = address;


            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
        }

        public IActionResult Index() 
        {
            var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
            
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SplkForm(SplkViewModel entity)
        {
            using (var memoryStream = new MemoryStream())
            {
                await entity.File.CopyToAsync(memoryStream);

                // Upload the file if less than 2 MB
                if (memoryStream.Length < 2097152)
                {
                    //create a AppFile mdoel and save the image into database.
                    var file = new SPLK()
                    {
                        NIK = entity.NIK,
                        OvertimeType = entity.OvertimeType,
                        StartDate = DateTime.Parse(entity.StartDate),
                        EndDate = DateTime.Parse(entity.EndDate),
                        Description = entity.Description,
                        Status = entity.Status,
                        JmlJam = entity.JmlJam,
                        UpahLembur = 0,
                        TglSelesai = DateTime.Now,
                        ProofOvertime = memoryStream.ToArray()
                    };
                    Console.WriteLine(file);
                    StringContent content = new StringContent(JsonConvert.SerializeObject(file), Encoding.UTF8, "application/json");
                    var result = httpClient.PostAsync(address.link + "Splks", content).Result;
                    //var result = repository.Splk(file);
                    return Json(result);

                }
            }

            return Json("{}");
        }

        [HttpGet]
        public async Task<JsonResult> GetAllSplk()
        {
            var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
            var result = await repository.GetAllSplk();
            return Json(result);
        }
    }
}
