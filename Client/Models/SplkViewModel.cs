using API.Models;

namespace Client.Models

{
    public class SplkViewModel
    {
        public int Id { get; set; }
        public string NIK { get; set; }
        public OvertimeType OvertimeType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public IFormFile File { get; set; }
        public int JmlJam { get; set; }
        public double UpahLembur { get; set; }
        public DateTime TglSelesai { get; set; }
    }

    //public class FileViewModel
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //    public IFormFile File { get; set; }
    //    public List<IFormFile> Files { get; set; }
    //}
}
