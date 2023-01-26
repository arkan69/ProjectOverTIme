using API.Contexts;
using API.Models;

namespace API.Repositories.Data
{
    public class AccountRoleRepositories : GeneralRepository<AccountRole, int>
    {
        public AccountRoleRepositories(MyContext context) : base(context)
        {
        }
    }
}
