using API.Contexts;
using API.Models;
using API.ViewModels;
using System.Collections;
using System.Linq;

namespace API.Repositories.Data
{
    public class EmployeeRepositories : GeneralRepository<Employee, string>
    {
        private readonly MyContext _context;
        public EmployeeRepositories(MyContext context) : base(context)
        {
            _context = context;
        }
        public IEnumerable<SPLK> GetFinance()
        {
            var result = _context.Splk.Where(x => x.Status == Status.Approved || x.Status == Status.Done).ToList();
            return result;
        }
        public IEnumerable MasterEmployee(string email)
        {
            return _context.Accounts
                .Join(_context.Employees, a => a.NIK, e => e.NIK,
                (a, e) => new { a, e })
                .Join(_context.Splk, ae => ae.e.NIK, s => s.NIK,
                (ae, s) => new
                {
                    //ManagerId = ae.e.ManagerId,
                    //FullName = (ae.e.FirstName + " " + ae.e.LastName),
                    Id = s.Id,
                    nik = s.NIK,
                    overtimeType = s.OvertimeType,
                    startDate = s.StartDate,
                    endDate = s.EndDate,
                    description = s.Description,
                    status = s.Status,
                    proofOvertime = s.ProofOvertime,
                    jmlJam = s.JmlJam,
                    upahLembur = s.UpahLembur,
                    Email = ae.a.Email
                }).Where(ea => ea.Email == email);
        }

        public IEnumerable SplkEmployee(string email)
        {
            return _context.Accounts
                .Join(_context.Employees, a => a.NIK, e => e.ManagerId,
                (a, e) => new { a, e })
                .Join(_context.Splk, ae => ae.e.NIK, s => s.NIK,
                (ae, s) => new
                {
                    Id = s.Id,
                    nik = s.NIK,
                    overtimeType = s.OvertimeType,
                    startDate = s.StartDate,
                    endDate = s.EndDate,
                    description = s.Description,
                    status = s.Status,
                    proofOvertime = s.ProofOvertime,
                    jmlJam = s.JmlJam,
                    upahLembur = s.UpahLembur,
                    Email = ae.a.Email
                }).Where(ea => ea.Email == email);
        }

        public int UpdateForm(SplkUpdateVM update)
        {
            var record = _context.Splk.Find(update.Id);
            var record1 = _context.Employees.Find(update.NIK);
            record.Status = update.Status;

            if (update.Status.ToString() == "Refuse")
            {
                _context.SaveChanges();
                return 1;
            }
            if (update.Status.ToString() == "Approved")
            {
                if (record.OvertimeType == 0)
                {
                    if (record.JmlJam == 1)
                    {
                        record.UpahLembur = record.JmlJam * 1.5 * 0.005780347 * record1.Salary;
                    }
                    else
                    {
                        record.UpahLembur = record.JmlJam * 2 * 0.005780347 * record1.Salary;
                    }
                }
                else if (record.OvertimeType != 0)
                {
                    if (record.JmlJam < 9)
                    {
                        record.UpahLembur = record.JmlJam * 2 * 0.005780347 * record1.Salary;
                    }
                    else if (record.JmlJam == 9)
                    {
                        record.UpahLembur = record.JmlJam * 3 * 0.005780347 * record1.Salary;
                    }
                    else if (record.JmlJam <= 10)
                    {
                        record.UpahLembur = record.JmlJam * 4 * 0.005780347 * record1.Salary;
                    }
                }
                _context.SaveChanges();
            }
            if (update.Status.ToString() == "Done")
            {
                _context.SaveChanges();
                return 2;
            }

            return 0;
        }

        public Account GetNIK(string email)
        {
            var account = _context.Accounts.Where(e => e.Email == email).FirstOrDefault();
            return account;
        }

        public List<SPLK> GetChart(string NIK)
        {
            var currentMonth = DateTime.Now.Month;
            var result = _context.Splk.Where(x => x.NIK == NIK && x.StartDate.Month == currentMonth && x.Status == Status.Approved).ToList();
            return result;
        }

        public IEnumerable TotalemployeeSPLK(string email)
        {
            //string[] getLabels = context.Universities.Select(u => u.Name).OrderBy(u => u).ToArray();
            var result = _context.Accounts
                .Join(_context.Employees, a => a.NIK, e => e.ManagerId,
                (a, e) => new { a, e })
                .Join(_context.Splk, ae => ae.e.NIK, s => s.NIK,
                (ae, s) => new
                {
                   
                    nik = s.NIK,
                     ae.a.Email
                }).Where(ea => ea.Email == email).Distinct().ToList();

            return result;
        }
    }
}
