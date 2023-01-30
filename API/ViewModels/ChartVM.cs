namespace API.ViewModels
{
    public class ChartVM
    {
        public int[] Series { get; set; }
        //public int[] Labels { get; set; }

        public ChartVM( int[] splktidakambil)
        {
           //Labels = splkambil;
            Series = splktidakambil;
        }
    }
}
