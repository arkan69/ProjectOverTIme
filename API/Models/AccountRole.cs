using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    [Table("tb_r_accounts_roles")]
    public class AccountRole
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Required, Column("account_nik", TypeName = "nchar(5)")]
        public string AccountNIK { get; set; }

        [Required, Column("role_id")]
        public int RoleId { get; set; }
    }
}
