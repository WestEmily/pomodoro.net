﻿using Microsoft.AspNetCore.Mvc;

namespace pomodoro.Controllers
{
    public class TimerController : Controller
    {
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
