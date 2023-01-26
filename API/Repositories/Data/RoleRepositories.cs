using API.Contexts;
using API.Models;

namespace API.Repositories.Data
{
    public class RoleRepositories : GeneralRepository<Role, int>
    {
        public RoleRepositories(MyContext context) : base(context)
        {
        }
    }
}
