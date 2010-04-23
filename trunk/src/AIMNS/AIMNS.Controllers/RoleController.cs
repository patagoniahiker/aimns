using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web.Mvc;
using System.Collections;
using AIMNS.Model;
using AIMNS.DTO;
using AIMNS.DTO.Mappers;
using System.Web.UI;

namespace AIMNS.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None)]
    public class RoleController:BaseController 
    {

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.RoleManager.GetAll();
            List<RoleDTO> result = new List<RoleDTO>();
            foreach (Role o in list)
            {
                result.Add(RoleDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }
    }
}
