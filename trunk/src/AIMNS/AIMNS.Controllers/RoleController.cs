using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web.Mvc;
using System.Collections;
using AIMNS.Model;

namespace AIMNS.Controllers
{
    public class RoleController:BaseController 
    {
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.RoleManager.GetAll();
            List<Role> result = new List<Role>();
            foreach (Role o in list)
            {
                result.Add(o);
            }
            return this.Json(result);
        }
    }
}
