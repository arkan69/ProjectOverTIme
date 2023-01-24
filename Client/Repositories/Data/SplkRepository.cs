using Client.Base;
using API.Models;
using Newtonsoft.Json;
using System.Text;
using System.Net;
using Client.Models;

namespace Client.Repositories.Data
{
    public class SplkRepository
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;

        public SplkRepository(Address address)
        {
            this.address = address;
        
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
    }
}
