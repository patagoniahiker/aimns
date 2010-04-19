using System;
using System.Web;
using System.Web.Mvc;

namespace AIMNS.Controllers
{
    public class LoginController : Controller
    {

        public ActionResult Index()
        {
            return View("Login");
        }
    }
}