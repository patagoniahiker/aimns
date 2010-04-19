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
    public class DepartmentController : BaseController
    {
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetPageRecords()
        {
            IList list = ManagerFactory.DepartmentManager.GetAll();
            IList<DepartmentDTO> result = new List<DepartmentDTO>();
            int sIndex = int.Parse(this.Request.Params["start"] == null ? "0" : this.Request.Params["start"]);
            int pageSize = int.Parse(this.Request.Params["limit"] == null ? list.Count.ToString()  : this.Request.Params["limit"]);
            for (int i = 0; i < pageSize && (sIndex + i)<list .Count ; i++)
            {
                Department obj = (Department)list[sIndex + i];
                result.Add(DepartmentDTOMapper.MapToDTO(obj));
            }
            //  组装返回结果  
            Dictionary<String, Object> resultMap = new Dictionary<String, Object>();
            //  记录条数  
            resultMap.Add ("total", list.Count);
            //  root  
            resultMap.Add("root", result);
            //  DepartmentID是我记录中的一个字段  
            //resultMap.Add("id", "DepartmentID");
            return this.Json(resultMap);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.DepartmentManager.GetAll();
            IList<DepartmentDTO> result = new List<DepartmentDTO>();
            foreach (Department o in list )
            {
                result.Add(DepartmentDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        public ActionResult GetDepart(string DepartmentID)
        {
            Department dep = ManagerFactory.DepartmentManager.GetDepartment(DepartmentID);
            DepartmentDTO result = DepartmentDTOMapper.MapToDTO(dep);
            return this.Json(result);
        }

        public ActionResult Index()
        {
            return View("DepartManage");
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult AddDepart(DepartmentDTO  Depart)
        {
            var rdto = new ResultDTO();
            Model.Department  dep = DepartmentDTOMapper .MapFromDTO(Depart);

            try
            {
                ManagerFactory.DepartmentManager.SaveDepartment(dep);
                rdto.Message = "添加成功";
                rdto.Result = true;
            }
            catch (Exception ex)
            {
                rdto.Message = "添加失败:" + ex.Message ;
                rdto.Result = false;
            }

            return this.Json(rdto);
        }

        public ActionResult DeleteDepart(string DepartmentID)
        {
            var rdto = new ResultDTO();
            try
            {
                ManagerFactory.DepartmentManager.DeleteDepartment(DepartmentID);
                rdto.Message = "删除成功";
                rdto.Result = true;
            }
            catch 
            {
                rdto.Message = "删除失败";
                rdto.Result = false;
            }
            return this.Json(rdto);
        }

        public ActionResult UpdateDepart(DepartmentDTO Depart)
        {
            var rdto = new ResultDTO();
            Model.Department dep = DepartmentDTOMapper.MapFromDTO(Depart);

            try
            {
                ManagerFactory.DepartmentManager.UpdateDepartment(dep);
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
        public ActionResult GetDepartment(string DepartmentID,string DepartmentName,string ParentDepartmentId)
        {
            IList<DepartmentDTO> result = new List<DepartmentDTO>();
            DepartmentDTO Depart = new DepartmentDTO();
            Depart.DepartmentID = DepartmentID;
            Depart.DepartmentName = DepartmentName;
            Depart.ParentDepartmentId = ParentDepartmentId;
            Model.Department dep = DepartmentDTOMapper.MapFromDTO(Depart);

            IList list= ManagerFactory.DepartmentManager.GetByCondition (dep);
            int sIndex = int.Parse(this.Request.Params["start"] == null ? "0" : this.Request.Params["start"]);
            int pageSize = int.Parse(this.Request.Params["limit"] == null ? list.Count.ToString() : this.Request.Params["limit"]);
            for (int i = 0; i < pageSize && (sIndex + i) < list.Count; i++)
            {
                Department obj = (Department)list[sIndex + i];
                result.Add(DepartmentDTOMapper.MapToDTO(obj));
            }
            //  组装返回结果  
            Dictionary<String, Object> resultMap = new Dictionary<String, Object>();
            //  记录条数  
            resultMap.Add("total", list.Count);
            //  root  
            resultMap.Add("root", result);
            return this.Json(resultMap);
        }
    }
}