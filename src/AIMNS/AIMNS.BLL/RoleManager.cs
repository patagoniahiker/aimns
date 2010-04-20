#region Imports

using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

using AIMNS.IBLL;
using AIMNS.IDAL;
using AIMNS.Model;

#endregion


namespace AIMNS.BLL
{
    public class RoleManager:IRoleManager
    {
        #region Properties

        public IRoleDao RoleDao { get; set; }

        #endregion

        /// <summary>
        /// 创建一个角色(返回包含默认值)
        /// </summary>
        /// <returns></returns>
        public Role NewRole()
        {
            var Role = new Role();

            return Role;
        }

        /// <summary>
        /// 保存角色
        /// </summary>
        /// <param name="Role">角色实体</param>
        /// <returns></returns>
        public Role  SaveRole(Role Role)
        {
            Validate(Role);
            if (GetRole(Role.RoleId) != null)
                throw new  Exception("已经存在的角色");
            return  RoleDao.Save(Role);
        }

        /// <summary>
        /// 获取角色
        /// </summary>
        /// <param name="RoleId">角色ID</param>
        /// <returns></returns>
        public Role GetRole(string RoleId)
        {
            return RoleDao.FindById(RoleId);
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="RoleId">角色ID</param>
        /// <returns></returns>
        public void   DeleteRole(string RoleId)
        {
            var Role = GetRole(RoleId);
            RoleDao.Delete(Role);
        }

        /// <summary>
        /// 更新角色
        /// </summary>
        /// <param name="Role">角色实体</param>
        /// <returns></returns>
        public Role  UpdateRole(Role Role)
        {
            return RoleDao.SaveOrUpdate(Role);
        }



        /// <summary>
        /// 获取所有的角色
        /// </summary>
        /// <returns></returns>
        public  IList GetAll()
        {
            return RoleDao.FindAll();
        }

        private void Validate(Role  Role)
        {
            //TODO throw exception on error.
        }
    }
}
