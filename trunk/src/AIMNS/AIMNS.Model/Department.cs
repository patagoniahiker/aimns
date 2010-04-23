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
        /// 父级部门
        /// </summary>
        public virtual Department ParentDepartment
        {
            get;
            set;

        }     

        #endregion
     
    }
}
