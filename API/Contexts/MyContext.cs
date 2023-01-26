using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Contexts
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {

        }

        // Introduces the Model to the Database that eventually becomes an Entity
        public DbSet<Account> Accounts { get; set; }
        public DbSet<AccountRole> AccountRoles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<SPLK> Splk { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Unique Constraint
            // FAQ : Kenapa gk pake anotasi? gk bisa dan ribet :))
            modelBuilder.Entity<Employee>().HasAlternateKey(e => e.Phone);
            modelBuilder.Entity<Account>().HasAlternateKey(a => a.Email);

            // Configure PK as FK 
            // FAQ : Kenapa gk pake anotasi? Karena Data Anotation gk support kalau ada PK sebagai FK juga
            // One Employee to One Account
            modelBuilder.Entity<Employee>()
                .HasOne(a => a.Account)
                .WithOne(e => e.Employee)
                .HasForeignKey<Account>(a => a.NIK);
        }
    }
}
