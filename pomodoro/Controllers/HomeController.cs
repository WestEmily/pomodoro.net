using Microsoft.AspNetCore.Mvc;
using pomodoro.Data;
using pomodoro.Models.DTO;
using pomodoro.Models;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace pomodoro.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var affirmations = await _context.Affirmations.ToListAsync();

            return View(affirmations);
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public ActionResult SetTimer(string timerType)
        {
            int duration = timerType switch
            {
                //"pomodoro" => 25 * 60,  // 25 minutes in seconds
                //"short" => 5 * 60, // 5 minutes in seconds
                //"long" => 15 * 60, // 15 minutes in seconds
                //_ => 25 * 60  // Default to Pomodoro

                // Test Amounts
                "pomodoro" => 5,  // 25 minutes in seconds
                "short" => 3, // 5 minutes in seconds
                "long" => 4, // 15 minutes in seconds
                _ => 25 * 60  // Default to Pomodoro
            };

            // Return a success response (could include the new duration)
            return Json(new { success = true, duration });
        }
    }
}
