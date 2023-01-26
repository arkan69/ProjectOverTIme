using API.Contexts;
using API.Models;

namespace API.Repositories.Data
{
    public class DepartmentRepositories : GeneralRepository<Department, int>
    {
        public DepartmentRepositories(MyContext context) : base(context)
        {
        }
    }
}
