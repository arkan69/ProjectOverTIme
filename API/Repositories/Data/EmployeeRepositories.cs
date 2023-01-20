using API.Contexts;
using API.Models;

namespace API.Repositories.Data
{
    public class EmployeeRepositories : GeneralRepository<Employee, string>
    {
        public EmployeeRepositories(MyContext context) : base(context)
        {
        }
    }
}
