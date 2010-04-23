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
    public class PropertyController:BaseController 
    {
        public ActionResult Index()
        {
            return View("Property");
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.PropertyManager.GetAll();

            IList<PropertyDTO> result = new List<PropertyDTO>();

            foreach (Property o in list)
            {
                result.Add(PropertyDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }
        public ActionResult GetProperty(string propertyId)
        {
            var rdto = new ResultDTO();
            Property property = ManagerFactory.PropertyManager.GetProperty(propertyId);
            PropertyDTO dto = PropertyDTOMapper.MapToDTO(property);

            if (property != null)
            {
                rdto.Message = "获取资产数据成功";
                rdto.Result = true;
                rdto.Data = dto;
            }
            else
            {
                rdto.Message = "获取资产数据失败";
                rdto.Result = false;
            }
            return this.Json(rdto);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult UpdateProperty(string ast_id, string DepartmentID,string ast_user,
                                            string ast_fit_reason)
        {
            var rdto = new ResultDTO();

            PropertyAppropriationDTO propertyAppropriation = new PropertyAppropriationDTO();
            propertyAppropriation.ast_id = ast_id;

            Property p = ManagerFactory.PropertyManager.GetProperty(ast_id);

            if (p.Department == null)
            {
                propertyAppropriation.DepartmentID = "99999999";
            }
            else
            {
                propertyAppropriation.DepartmentID = p.Department.DepartmentID;
            }
            if (p.ast_user == null)
            {
                propertyAppropriation.ast_from_user = "无人使用";
            }else
            {
                propertyAppropriation.ast_from_user  = p.ast_user ;
            }
            propertyAppropriation.ast_fit_reason = ast_fit_reason;
            propertyAppropriation.ast_fit_date = DateTime.Now.ToString();

            p.ast_user = ast_user;
            p.Department = ManagerFactory.DepartmentManager .GetDepartment(DepartmentID);

            Model.PropertyAppropriation proApp = PropertyAppropriationDTOMapper.MapFromDTO(propertyAppropriation);
            proApp.ast_fit_date = DateTime.Now;
            try
            {
                ManagerFactory.PropertyManager.SaveProperty(p,proApp);
                rdto.Message = "更新成功";
                rdto.Result = true;
            }
            catch
            {
                rdto.Message = "更新失败";
                rdto.Result = false;
            }

            return this.Json(rdto);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAllPerPage()
        {
            IList list = ManagerFactory.PropertyManager.GetAll();

            List<PropertyDTO> arr = new List<PropertyDTO>();
            Dictionary<String, Object> result = new Dictionary<String, Object>();
            int sIndex = this.Request["start"] == null ? 0 : int.Parse(this.Request["start"]);
            int pageSize = this.Request["limit"] == null ? list.Count : int.Parse(this.Request["limit"]);
            for (int i = 0; i < pageSize && (i + sIndex) < list.Count; i++)
            {
                arr.Add(PropertyDTOMapper.MapToDTO((Property)list[i + sIndex]));
            }
            result.Add("rows", arr);
            result.Add("total", list.Count);
            return this.Json(result);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetByConditionPerPage(string ast_id, string ast_name,string ast_model,
                                            string ast_std, string DepartmentID)
        {
            PropertyDTO property = new PropertyDTO();
            property.ast_id = ast_id;
            property.ast_name = ast_name;
            property.ast_model = ast_model;
            property.ast_std = ast_std;
            property.DepartmentID = DepartmentID;
            Property condition = PropertyDTOMapper.MapFromDTO(property);
            IList list = ManagerFactory.PropertyManager.GetByCondition(condition);

            List<PropertyDTO> arr = new List<PropertyDTO>();
            Dictionary<String, Object> result = new Dictionary<String, Object>();
            int sIndex = this.Request["start"] == null ? 0 : int.Parse(this.Request["start"]);
            int pageSize = this.Request["limit"] == null ? list.Count : int.Parse(this.Request["limit"]);
            for (int i = 0; i < pageSize && (i + sIndex) < list.Count; i++)
            {
                arr.Add(PropertyDTOMapper.MapToDTO((Property)list[i + sIndex]));
            }
            result.Add("rows", arr);
            result.Add("total", list.Count);
            return this.Json(result);
        }
    }
}
