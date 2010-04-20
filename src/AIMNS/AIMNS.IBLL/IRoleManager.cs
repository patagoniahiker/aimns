using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IBLL
{
    /// <summary>
    /// 角色管理
    /// </summary>
    public interface IRoleManager
    {
        /// <summary>
        /// 创建一个角色(返回包含默认值)
        /// </summary>
        /// <returns></returns>
        Role NewRole();

        /// <summary>
        /// 保存角色
        /// </summary>
        /// <param name="Role">角色实体</param>
        /// <returns></returns>
        Role SaveRole(Role Role);

        /// <summary>
        /// 获取角色
        /// </summary>
        /// <param name="RoleId">角色ID</param>
        /// <returns></returns>
        Role GetRole(string RoleId);

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="RoleId">角色ID</param>
        /// <returns></returns>
        void  DeleteRole(string RoleId);

        /// <summary>
        /// 更新角色
        /// </summary>
        /// <param name="Role">角色实体</param>
        /// <returns></returns>
        Role UpdateRole(Role Role);

        /// <summary>
        /// 获取所有的角色
        /// </summary>
        /// <returns></returns>
        IList  GetAll();
    }
}
