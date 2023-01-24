using API.Models;

namespace Client.Models
{
    public class SplkVM
    {
        public int Id { get; set; }
        public string NIK { get; set; }
        public OvertimeType OvertimeType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public byte[] ProofOvertime { get; set; }
        public int JmlJam { get; set; }
        public double UpahLembur { get; set; }
        public DateTime TglSelesai { get; set; }
    }
}
