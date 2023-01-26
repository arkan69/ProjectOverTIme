using Client.Base;
using API.Models;
using Newtonsoft.Json;
using System.Text;
using System.Net;
using Client.Models;

namespace Client.Repositories.Data
{
    public class SplkRepository : GeneralRepository<SPLK, int>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;

        public SplkRepository(Address address, string request = "Splks/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
            
        }

        public HttpStatusCode Splk(SplkVM entity)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(address.link + "Splks", content).Result;
            return result.StatusCode;
        }

        public async Task<List<SPLK>> GetAllSplk()
        {
            List<SPLK> entities = new List<SPLK>();

            using (var response = await httpClient.GetAsync(address.link + "Splks/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<SPLK>>(apiResponse);
            }

            return entities;
        }
    }
}
