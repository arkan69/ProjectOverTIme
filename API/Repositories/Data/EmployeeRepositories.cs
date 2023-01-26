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
            record.Status = update.Status;
            record.UpahLembur = 3 * 2000;
            _context.SaveChanges();

            return 0;
        }
    }
}
