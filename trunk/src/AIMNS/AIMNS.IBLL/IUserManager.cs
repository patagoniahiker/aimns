using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IBLL
{
    /// <summary>
    /// 用户管理
    /// </summary>
    public interface IUserManager
    {
        /// <summary>
        /// 创建一个用户(返回包含默认值)
        /// </summary>
        /// <returns></returns>
        User NewUser();

        /// <summary>
        /// 保存用户
        /// </summary>
        /// <param name="user">用户实体</param>
        /// <returns></returns>
        User SaveUser(User user);

        /// <summary>
        /// 获取用户
        /// </summary>
        /// <param name="userId">用户ID</param>
        /// <returns></returns>
        User GetUser(string userId);

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="userId">用户ID</param>
        /// <returns></returns>
        void  DeleteUser(string userId);

        /// <summary>
        /// 更新用户
        /// </summary>
        /// <param name="user">用户实体</param>
        /// <returns></returns>
        User UpdateUser(User user);

        /// <summary>
        /// 获取所有的用户
        /// </summary>
        /// <returns></returns>
        IList  GetAll();


        IList GetByCondition(User user);
    }
}
