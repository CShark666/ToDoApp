using Microsoft.EntityFrameworkCore;

namespace ToDoApp.Api
{
    public class ToDoContext(DbContextOptions<ToDoContext> options) : DbContext(options)
    {
        public DbSet<ToDo> ToDos => Set<ToDo>();
    }
}