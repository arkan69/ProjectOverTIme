using API.Contexts;
using API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class GeneralRepository<Entity, T> : IRepository<Entity,T> where Entity : class
    {
        private MyContext _context;
        public GeneralRepository(MyContext context) 
        { 
            _context= context;
        }

        public int Delete(T id)
        {
            var data = _context.Set<Entity>().Find(id);
            // pengondisian dimulai dari yang palign salah ke yang paling benar
            if (data == null)
            {
                return 0;
            }
            _context.Set<Entity>().Remove(data);
            var result = _context.SaveChanges();
            return result;
        }

        public IEnumerable<Entity> Get()
        {
            return _context.Set<Entity>().ToList();
        }

        public Entity Get(T id)
        {
            return _context.Set<Entity>().Find(id);
        }

        public int Insert(Entity entity)
        {
            _context.Set<Entity>().Add(entity);
            var result = _context.SaveChanges();
            return result;
        }

        public int Update(Entity entity)
        {
            _context.Set<Entity>().Entry(entity).State = EntityState.Modified;
            var result = _context.SaveChanges();
            return result;
        }
    }
}
