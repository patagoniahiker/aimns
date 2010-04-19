using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;


namespace AIMNS.Model
{
    [Serializable]
    public class Department 
    {

        #region Property Members

        /// <summary>
        /// 部门编号
        /// </summary>

        public virtual string DepartmentID
        {
            get;
            set;
        }

        /// <summary>
        /// 部门名称
        /// </summary>

        public virtual string DepartmentName
        {
            get;
            set;
        }

        /// <summary>
        /// 创建日期
        /// </summary>

        public virtual DateTime CreateTime
        {
            get;
            set;
        }

        /// <summary>
        /// 创建人
        /// </summary>

        public virtual string Creator
        {
            get;
            set;
        }


        /// <summary>
        /// 从属的公司
        /// </summary>
        public virtual  Company Company
        {
            get;
            set;
        }


        /// <summary>
        /// 父级部门
        /// </summary>
        public virtual Department ParentDepartment
        {
            get;
            set;

        }

        /// <summary>
        /// 子部门列表
        /// </summary>
        public virtual IList DepartmentList
        {
            get;
            set;
        }


        /// <summary>
        /// 部门用户列表
        /// </summary>
        public virtual IList UserList
        {
            get;
            set;
        }

        /// <summary>
        ///部门管理
        /// </summary>
        public virtual User Manager
        {
            get;
            set;
        }

        #endregion

      
    }
}
