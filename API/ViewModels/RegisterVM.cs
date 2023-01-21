using API.Models;

namespace API.ViewModels
{
    public class RegisterVM
    {
        public string NIK { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public int Salary { get; set; }
        public Gender Gender { get; set; }
        public string ManagerId { get; set; }
        public int DepartmnetID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
