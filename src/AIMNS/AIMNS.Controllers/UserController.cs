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
            userid = userid.Trim();
            password = password.Trim();
            var rdto = new ResultDTO();
            User  user  = ManagerFactory.UserManager.GetUser(userid);
            //if ( "1".Equals( user.LoginFlg ))
            //{
            //    rdto.Message = "用户已登录";
            //    rdto.Result = false;
            //    return this.Json(rdto);
            //}

            if (user != null && user.Password.Trim() == password.Trim())
            {
                HttpContext.Session["User"] = userid;
                user.LoginFlg = "1";
                ManagerFactory.UserManager.UpdateUser(user);

                rdto.Result = true;
            }
            else
            {
                rdto.Message = "用户名或密码错误";
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
        public ActionResult DeleteUser(string[] userid)
        {
            
            var rdto = new ResultDTO();
            try
            {
                for (int i = 0; i < userid.Length; i++)
                {
                    ManagerFactory.UserManager.DeleteUser(userid[i]);
                }        
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
            catch(Exception e)
            {
                rdto.Message = "添加失败:"+e.Message ;
                rdto.Result = false;
            }

            return this.Json(rdto);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAllPerPage()
        {
            IList list = ManagerFactory.UserManager.GetAll();
            List<UserDTO> arr = new List<UserDTO>();
            Dictionary<String, Object> result = new Dictionary<String, Object>();
            int sIndex = this.Request["start"]==null?0:int.Parse(this.Request["start"]);
            int pageSize = this.Request["limit"] == null ? list.Count  : int.Parse(this.Request["limit"]);
            for (int i=0;i<pageSize&&(i+sIndex )<list .Count ;i++)
            {
                arr.Add(UserDTOMapper.MapToDTO((User)list[i+sIndex]));
            }
            result.Add("rows", arr);
            result.Add("total", list.Count);
            return this.Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetByConditionPerPage(string UserID,string UserName,
                                            string RoleId,string DepartmentID)
        {
            UserDTO user = new UserDTO();
            user.UserID = UserID;
            user.UserName = UserName;
            user.RoleId = RoleId;
            user.DepartmentID = DepartmentID;
            User condition = UserDTOMapper.MapFromDTO(user);
            IList list = ManagerFactory.UserManager.GetByCondition(condition);

            List<UserDTO> arr = new List<UserDTO>();
            Dictionary<String, Object> result = new Dictionary<String, Object>();
            int sIndex = this.Request["start"] == null ? 0 : int.Parse(this.Request["start"]);
            int pageSize = this.Request["limit"] == null ? list.Count : int.Parse(this.Request["limit"]);
            for (int i = 0; i < pageSize && (i + sIndex) < list.Count; i++)
            {
                arr.Add(UserDTOMapper.MapToDTO((User)list[i + sIndex]));
            }
            result.Add("rows", arr);
            result.Add("total", list.Count);
            return this.Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetMenuRootList()
        {
            string userId = HttpContext.Session["User"].ToString();
            MenuNodeList nodeList = new MenuNodeList(userId);
            IList list = nodeList.GetMenuNodeList();

            IList<MenuRootDTO> result = new List<MenuRootDTO>();
            foreach (MenuNode root in list)
            {
                MenuRootDTO dto = new MenuRootDTO();
                dto.id = root.ID;
                dto.title = root.Name;
                dto.border = false;
                dto.autoScroll = true;
                dto.iconCls = "";
                dto.html = "";

                result.Add(dto);
            }

            return this.Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetMenuNodeList()
        {
            string fucId = Request.Params[0].Trim();
            string userId = HttpContext.Session["User"].ToString();
            MenuNodeList nodeList = new MenuNodeList(userId);
            MenuNode root = nodeList.GetCurrentRootNode(fucId);

            IList<MenuNodeDTO> result = new List<MenuNodeDTO>();
            foreach (MenuNode child in root.Children)
            {
                MenuNodeDTO dto = new MenuNodeDTO();
                dto.id = child.ID;
                dto.text = child.Name;
                dto.url = child.Url;
                dto.leaf = true;
                if (child.Children.Count > 0)
                {
                    dto.leaf = false;
                    dto.childNodes = new List<MenuNodeDTO>();
                    AddToRoot(child, dto.childNodes);
                }

                result.Add(dto);
            }

            return this.Json(result);
        }

        public void AddToRoot(MenuNode parent, List<MenuNodeDTO> dtoList)
        {
            int i = 0;
            foreach (MenuNode child in parent.Children)
            {
                MenuNodeDTO dto = new MenuNodeDTO();
                dto.id = child.ID;
                dto.text = child.Name;
                dto.url = child.Url;
                dto.leaf = true;
                if (child.Children.Count > 0)
                {
                    dto.leaf = false;
                    dto.childNodes = new List<MenuNodeDTO>();
                    AddToRoot(child, dto.childNodes);
                }

                dtoList.Add(dto);
                i++;
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetAllByDepartment(string id)
        {
            Department dep = ManagerFactory.DepartmentManager.GetDepartment(id);
            IList list = dep.UserList;

            IList<UserDTO> result = new List<UserDTO>();

            foreach (User o in list)
            {
                result.Add(UserDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult UpdatePassword(string password)
        {
            string userId = HttpContext.Session["User"].ToString();
            User user = ManagerFactory.UserManager.GetUser(userId);
            user.Password = password;

            var rdto = new ResultDTO();

            try
            {
                ManagerFactory.UserManager.UpdateUser(user);
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
        public ActionResult Logout()
        {
            string userId = HttpContext.Session["User"].ToString();
            User user = ManagerFactory.UserManager.GetUser(userId);
            user.LoginFlg = "0";

            var rdto = new ResultDTO();

            try
            {
                ManagerFactory.UserManager.UpdateUser(user);
                rdto.Result = true;
                HttpContext.Session["User"] = "";
            }
            catch
            {
                rdto.Result = false;
            }

            return this.Json(rdto);
        }
    }

}
