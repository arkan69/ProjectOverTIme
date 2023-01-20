using API.Contexts;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data
{
    public class AccountRepositories : GeneralRepository<Account, string>
    {
        private MyContext _context;
        private DbSet<Account> _account;
        private DbSet<Employee> _employees;
        public AccountRepositories(MyContext context) : base(context)
        {
            _context = context;
            _account = context.Set<Account>();
            _employees = context.Set<Employee>();
        }
    }
}
