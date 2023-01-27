using API.Models;
using Client.Base;
using Client.Models;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net;
using System.Text;

namespace Client.Controllers
{
    public class EmployeeController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly EmployeeRepository repository;
        public EmployeeController(EmployeeRepository repository) : base(repository)
        {
            this.repository = repository;
        }
        public IActionResult Index()
        {
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
                        OvertimeType = 0,
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        Description = "Cobacoba",
                        Status = 0,
                        JmlJam = 1,
                        UpahLembur = 1000,
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
    }
}
