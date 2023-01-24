using API.Models;
using Client.Models;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class SplkController : Controller
    {
        private readonly SplkRepository repository;
        public SplkController(SplkRepository repository) 
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
                //if (memoryStream.Length < 2097152)
                //{
                    //create a AppFile mdoel and save the image into database.
                    var file = new SplkVM()
                    {
                        NIK = entity.NIK,
                        OvertimeType = entity.OvertimeType,
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        Description = "Cobacoba",
                        Status = 0,
                        ProofOvertime = memoryStream.ToArray()
                    };
                    Console.WriteLine(file);
                    var result = repository.Splk(file);
                    return Json(result);

                //}   
            }

            //return Json("{}");
        }
    }
}
