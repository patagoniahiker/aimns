using System;
using System.Collections;
using System.Collections.Generic;

using System.Web.Mvc;
using AIMNS.DTO;
using AIMNS.Model;
using AIMNS.DTO.Mappers;
using System.Web.UI;

namespace AIMNS.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None)]
    public class PropertyAppropriationController:BaseController 
    {
        public ActionResult Index()
        {
            return View("PropertyAppropriation");
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.PropertyAppropriationManager.GetAll();

            IList<PropertyAppropriationDTO> result = new List<PropertyAppropriationDTO>();

            foreach (PropertyAppropriation o in list)
            {
                result.Add(PropertyAppropriationDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAllPerPage()
        {
            IList list = ManagerFactory.PropertyAppropriationManager.GetAll();

            List<PropertyAppropriationDTO> arr = new List<PropertyAppropriationDTO>();
            Dictionary<String, Object> result = new Dictionary<String, Object>();
            int sIndex = this.Request["start"] == null ? 0 : int.Parse(this.Request["start"]);
            int pageSize = this.Request["limit"] == null ? list.Count : int.Parse(this.Request["limit"]);
            for (int i = 0; i < pageSize && (i + sIndex) < list.Count; i++)
            {
                arr.Add(PropertyAppropriationDTOMapper.MapToDTO((PropertyAppropriation)list[i + sIndex]));
            }
            result.Add("rows", arr);
            result.Add("total", list.Count);
            return this.Json(result);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetByConditionPerPage(string ast_id, string DepartmentID,
                                            string ast_from_user, string ast_fit_date)
        {
            PropertyAppropriationDTO propertyAppropriation = new PropertyAppropriationDTO();
            propertyAppropriation.ast_id = ast_id;
            propertyAppropriation.DepartmentID  = DepartmentID;
            propertyAppropriation.ast_from_user = ast_from_user;
            propertyAppropriation.ast_fit_date = ast_fit_date;
            PropertyAppropriation condition = PropertyAppropriationDTOMapper.MapFromDTO(propertyAppropriation);
            IList list = ManagerFactory.PropertyAppropriationManager.GetByCondition(condition);

            List<PropertyAppropriationDTO> arr = new List<PropertyAppropriationDTO>();
            Dictionary<String, Object> result = new Dictionary<String, Object>();
            int sIndex = this.Request["start"] == null ? 0 : int.Parse(this.Request["start"]);
            int pageSize = this.Request["limit"] == null ? list.Count : int.Parse(this.Request["limit"]);
            for (int i = 0; i < pageSize && (i + sIndex) < list.Count; i++)
            {
                arr.Add(PropertyAppropriationDTOMapper.MapToDTO((PropertyAppropriation)list[i + sIndex]));
            }
            result.Add("rows", arr);
            result.Add("total", list.Count);
            return this.Json(result);
        }
    }
}
