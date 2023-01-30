using API.Contexts;
using API.Handler;
using API.Models;
using API.ViewModels;
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

        public int Register(RegisterVM registerVM)
        {
            var result = 0;
            //registerVM.NIK = GenerateNIK();
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                //input employee
                Employee employee = new Employee()
                {
                    NIK = registerVM.NIK,
                    FirstName = registerVM.FirstName,
                    LastName = registerVM.LastName,
                    Phone = registerVM.Phone,
                    Gender = registerVM.Gender,
                    BirthDate = registerVM.BirthDate,
                    Salary = registerVM.Salary,
                    ManagerId = registerVM.ManagerId,
                    DepartmentId = registerVM.DepartmnetID,
                };
                _employees.Add(employee);
                result = _context.SaveChanges();

                //input account
                Account account = new Account()
                {
                    NIK = employee.NIK,
                    Email = registerVM.Email,
                    Password = Hashing.HashPassword(registerVM.Password),
                };
                _account.Add(account);
                result = _context.SaveChanges();

                //Accont Role
                AccountRole accountRole = new AccountRole()
                {
                    AccountNIK = account.NIK,
                    RoleId = 4
                };
                _context.AccountRoles.Add(accountRole);
                _context.SaveChanges();


                transaction.Commit();
            }
            catch
            {
                result = 0;
                transaction.Rollback();
            }
            return result;
        }

        public int Login(LoginVM loginVM)
        {
            var result = (from a in _context.Accounts
                          select new LoginVM
                          {
                              Email = a.Email,
                              Password = a.Password,
                          }).SingleOrDefault(c => c.Email == loginVM.Email);
            if (result == null)
            {
                return 0; //Email Already Exist
            }
            if (!Hashing.ValidatePassword(loginVM.Password, result.Password))
            {
                return 1; //Wrong Password
            }
            return 2; //Email and Password is match
        }

        public int CheckRegister(RegisterVM register)
        {
            var result = _account.Select(a => new RegisterVM
            {
                Email = a.Email
            }).Where(e => e.Email == register.Email);

            var result1 = _employees.Select(b => new RegisterVM
            {
                Phone = b.Phone
            }).Where(p => p.Phone == register.Phone);

            if (result.Count() > 0)
            {
                return 2;
            }
            else if (result1.Count() > 0)
            {
                return 3;
            }
            return 1;
        }

        public int CheckAccount(LoginVM loginVM)
        {
            var result = (from a in _context.Accounts
                          select new LoginVM
                          {
                              Email = a.Email,
                              Password = a.Password,
                          }).SingleOrDefault(c => c.Email == loginVM.Email);

            if (result == null)
            {
                return 0;//Incorret Email.
            }
            if (Hashing.ValidatePassword(loginVM.Password, result.Password) != true)
            {
                return 1;//Incorrect pasword
            }
            return 2;
        }

        public List<string> UserRoles(string email)
        {
            //{"Employee","Manager","Admin"}
            //List<string> result = new List<string>();

            List<string> result = (from em in _employees
                                   join a in _account on em.NIK equals a.NIK
                                   join ar in _context.AccountRoles on a.NIK equals ar.AccountNIK
                                   join r in _context.Roles on ar.RoleId equals r.Id
                                   where a.Email == email
                                   select r.Name).ToList();


            return result;
        }
    }
}
