using API.Models;
using API.ViewModels;
using Client.Base;
using Client.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Client.Repositories.Data
{
    public class EmployeeRepository : GeneralRepository<Employee, string>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;


        public EmployeeRepository(Address address, string request = "Employees/") : base(address, request)
        {
            this.address = address;
            this.request = request;

            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };

        }

        public async Task<List<SPLK>> GetMasterEmployee(string email)
        {
            List<SPLK> entities = new List<SPLK>();

            using (var response = await httpClient.GetAsync(address.link + request + "Master?email=" + email))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<SPLK>>(apiResponse);
            }

            return entities;
        }

        public async Task<List<SPLK>> SplkEmployee(string email)
        {
            List<SPLK> entities = new List<SPLK>();

            using (var response = await httpClient.GetAsync(address.link + request + "Manager?email=" + email))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<SPLK>>(apiResponse);
            }

            return entities;
        }

        public async Task<List<SPLK>> SplkFinance()
        {
            List<SPLK> entities = new List<SPLK>();

            using (var response = await httpClient.GetAsync(address.link + request + "GetFinance"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<SPLK>>(apiResponse);
            }

            return entities;
        }

        public async Task<Account> GetNIK(string email)
        {
            Account entities = new Account();

            using (var response = await httpClient.GetAsync(address.link + request + "GetNIK?email=" + email))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<Account>(apiResponse);
            }

            return entities;
        }

        public HttpStatusCode UpdateSplk(SplkUpdateVM entity)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(address.link + request + "TestUpdate", content).Result;
            return result.StatusCode;
        }

    }
}
