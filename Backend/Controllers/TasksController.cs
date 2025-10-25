using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        // In-memory storage
        private static List<TaskItem> _tasks = new List<TaskItem>();
        private static int _nextId = 1;

        // GET /api/tasks - Get all tasks
        [HttpGet]
        public ActionResult<List<TaskItem>> GetTasks()
        {
            return Ok(_tasks);
        }

        // POST /api/tasks - Add a new task
        [HttpPost]
        public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
        {
            task.Id = _nextId++;
            _tasks.Add(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        // PUT /api/tasks/{id} - Toggle completion
        [HttpPut("{id}")]
        public ActionResult<TaskItem> UpdateTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return NotFound();

            task.IsCompleted = !task.IsCompleted;
            return Ok(task);
        }

        // DELETE /api/tasks/{id} - Delete a task
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return NotFound();

            _tasks.Remove(task);
            return NoContent();
        }
    }
}
