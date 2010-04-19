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
    public class UserController:BaseController
    {
        public ActionResult Index()
        {
            return View("UserManage");
        }

        public ActionResult GroupManage()
        {
            return View();
        }

        public ActionResult RoleManage()
        {
            return View();
        }

        public ActionResult DepartmentManage()
        {
            return View();
        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Login(string userid, string password)
        {
            var rdto = new ResultDTO();
            User  user  = ManagerFactory.UserManager.GetUser(userid);
            if (user != null && user.Password.Trim() == password.Trim())
            {
                rdto.Message = "登陆成功";
                rdto.Result = true;
            }
            else
            {
                rdto.Message = "登陆失败";
                rdto.Result = false;
            }
            return this.Json(rdto);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60,VaryByParam = "*")]
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.UserManager.GetAll();

            IList<UserDTO> result = new List<UserDTO>();

            foreach (User o in list)
            {
                result.Add(UserDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteUser(string userid)
        {
            
            var rdto = new ResultDTO();
            try
            {
                ManagerFactory.UserManager.DeleteUser(userid);
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


        public ActionResult GetUser(string userid)
        {
            var rdto = new ResultDTO();
            User user = ManagerFactory.UserManager.GetUser(userid);
            UserDTO  dto = UserDTOMapper.MapToDTO(user);

            if (user != null)
            {
                rdto.Message = "获取用户数据成功";
                rdto.Result = true;
                rdto.Data = dto;
            }
            else
            {
                rdto.Message = "获取用户数据失败";
                rdto.Result = false;
            }
            return this.Json(rdto);
        }



        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult UpdateUser(UserDTO User)
        {
            var rdto = new ResultDTO();
            Model.User u = UserDTOMapper.MapFromDTO(User);

              try
              {
                ManagerFactory.UserManager.UpdateUser(u);
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
        public ActionResult AddUser(UserDTO User)
        {
            var rdto = new ResultDTO();
            Model.User u = UserDTOMapper.MapFromDTO(User);

            try
            {
                ManagerFactory.UserManager.SaveUser(u);
                rdto.Message = "添加成功";
                rdto.Result = true;
            }
            catch
            {
                rdto.Message = "添加失败";
                rdto.Result = false;
            }

            return this.Json(rdto);
        }
    }

}
