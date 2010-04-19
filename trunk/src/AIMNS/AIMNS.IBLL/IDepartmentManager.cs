using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IBLL
{
    /// <summary>
    /// 部门管理
    /// </summary>
    public interface IDepartmentManager
    {
        /// <summary>
        /// 创建一个部门(返回包含默认值)
        /// </summary>
        /// <returns></returns>
        Department NewDepartment();

        /// <summary>
        /// 保存部门
        /// </summary>
        /// <param name="Department">部门实体</param>
        /// <returns></returns>
        Department SaveDepartment(Department Department);


        /// <summary>
        /// 获取部门
        /// </summary>
        /// <param name="DepartmentId">部门ID</param>
        /// <returns></returns>
        Department GetDepartment(string DepartmentId);


        /// <summary>
        /// 删除部门
        /// </summary>
        /// <param name="DepartmentId">部门ID</param>
        /// <returns></returns>
        void DeleteDepartment(string DepartmentId);


        /// <summary>
        /// 更新部门
        /// </summary>
        /// <param name="Department">部门实体</param>
        /// <returns></returns>
        Department UpdateDepartment(Department Department);


        /// <summary>
        /// 获取所有的部门
        /// </summary>
        /// <returns></returns>
        IList  GetAll();

        IList  GetByCondition(Department Department);
    }
}
