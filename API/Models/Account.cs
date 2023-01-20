using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("tb_m_accounts")]
    public class Account
    {
        [Key, Column("nik", TypeName = "nchar(5)")]
        public string NIK { get; set; }

        [Required, Column("email")]
        public string Email { get; set; }

        [Required, Column("password")]
        public string Password { get; set; }
    }
}
