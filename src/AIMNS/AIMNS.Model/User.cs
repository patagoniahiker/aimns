using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

namespace AIMNS.Model
{


    [Serializable]
    public class User  
    {
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
        public virtual System.String Creator
        {
            get;
            set;
        }



        /// <summary>
        /// Email地址
        /// </summary>
        public virtual System.String Email
        {
            get;
            set;
        }

        /// <summary>
        /// 用户编号
        /// </summary>
        /// 
        public virtual System.String UserID
        {
            get;
            set;
        }

        /// <summary>
        /// 导入日期
        /// </summary>
        public virtual DateTime? ImportTime
        {
            get;
            set;
        }


        /// <summary>
        /// 手机号码
        /// </summary>
        public virtual System.String Mobile
        {
            get;
            set;
        }

        /// <summary>
        /// 用户密码
        /// </summary>
        public virtual System.String Password
        {
            get;
            set;
        }

        /// <summary>
        /// 电话号码
        /// </summary>
        public virtual System.String Telephone
        {
            get;
            set;
        }

        /// <summary>
        /// 用户名称
        /// </summary>
        public virtual System.String UserName
        {
            get;
            set;
        }

        /// <summary>
        /// 生效日期
        /// </summary>
        public virtual DateTime? ValidFrom
        {
            get;
            set;
        }


        /// <summary>
        /// 失效日期
        /// </summary>
        public virtual DateTime? ValidTo
        {
            get;
            set;
        }
 

        /// <summary>
        /// 所属公司
        /// </summary>
        public virtual Company Company
        {
            get;
            set;
        }


        /// <summary>
        /// 所属部门
        /// </summary>
        public virtual Department Department
        {
            get;
            set;
        }


        /// <summary>
        /// 直接主管
        /// </summary>
        public virtual User Manager
        {
            get;
            set;
        }

    }
}
