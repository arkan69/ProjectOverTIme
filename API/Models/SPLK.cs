using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace API.Models
{
    public class SPLK
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Required, Column("lembur_id")]
        public int LemburID { get; set; }

        [Required, Column("start_date")]
        public DateTime StartDate { get; set; }

        [Required, Column("end_date")]
        public DateTime EndDate { get; set; }

        [Required, Column("description")]
        public string Description { get; set; }

        [Required, Column("status")]
        public Status Status { get; set; }

        [Required, Column("bukti")]
        public Blob Bukti { get; set; }

        [Column("jml_jam")]
        public int JmlJam { get; set; }

        [Column("upah_lembur")]
        public double UpahLembur { get; set; }

        [Column("tgl_selesai")]
        public DateTime TglSelesai { get; set; }

    }
    public enum Status
    {
        Pending,
        Refuse,
        Approved,
        Done
    }
}
