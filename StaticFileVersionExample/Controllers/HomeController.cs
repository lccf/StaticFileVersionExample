using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace StaticFileVersionExample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult QueryString()
        {
            return View();
        }

        public ActionResult FileName()
        {
            string path = Server.MapPath("~/Content/server-manifest.json");
            string content = System.IO.File.ReadAllText(path);
            JObject manifest = JObject.Parse(content);
            ViewBag.manifest = manifest;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}