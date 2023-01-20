using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Text.Json.Serialization;

namespace API.Models
{
    [Table("tb_m_splk")]
    public class SPLK
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Required, Column("lembur_id")]
        public OvertimeType OvertimeType { get; set; }

        [Required, Column("start_date")]
        public DateTime StartDate { get; set; }

        [Required, Column("end_date")]
        public DateTime EndDate { get; set; }

        [Required, Column("description")]
        public string Description { get; set; }

        [Required, Column("status")]
        public Status Status { get; set; }

        [Column("proof_overtime")]
        public byte[] ProofOvertime { get; set; }

        [Column("hours_of_ot")]
        public int JmlJam { get; set; }

        [Column("salary_ot")]
        public double UpahLembur { get; set; }

        [Column("end_date_approval")]
        public DateTime TglSelesai { get; set; }

        //RELATION
        [JsonIgnore]
        public Employee? Employees { get; set; }

    }
    public enum Status
    {
        Pending,
        Refuse,
        Approved,
        Done
    }
    public enum OvertimeType
    {
        Weekdays,
        Weekend
    }
}
