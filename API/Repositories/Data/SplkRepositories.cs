using API.Contexts;
using API.Models;

namespace API.Repositories.Data
{
    public class SplkRepositories : GeneralRepository<SPLK, int>
    {
        public SplkRepositories(MyContext context) : base(context)
        {
        }
    }
}
