using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using api.Models; // Ensure this matches the namespace of your models
using api.Data;
namespace api.Controllers // Adjust the namespace according to your project structure
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatatuController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatatuController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Matatu
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Matatu>>> GetMatatus()
        {
            return await _context.Matatus.Include(m => m.Street).Include(m => m.RouteObj).ToListAsync();
        }

        // GET: api/Matatu/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Matatu>> GetMatatu(int id)
        {
            var matatu = await _context.Matatus.Include(m => m.Street).Include(m => m.RouteObj).FirstOrDefaultAsync(m => m.Id == id);

            if (matatu == null)
            {
                return NotFound();
            }

            return matatu;
        }

        // PUT: api/Matatu/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatatu(int id, Matatu matatu)
        {
            if (id!= matatu.Id)
            {
                return BadRequest();
            }

            _context.Entry(matatu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatatuExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Matatu
        [HttpPost]
        public async Task<ActionResult<Matatu>> PostMatatu(Matatu matatu)
        {
            _context.Matatus.Add(matatu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatatu", new { id = matatu.Id }, matatu);
        }

        // DELETE: api/Matatu/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatatu(int id)
        {
            var matatu = await _context.Matatus.FindAsync(id);
            if (matatu == null)
            {
                return NotFound();
            }

            _context.Matatus.Remove(matatu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MatatuExists(int id)
        {
            return _context.Matatus.Any(e => e.Id == id);
        }
    }
}
