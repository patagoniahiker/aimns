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
        /// 用户编号
        /// </summary>
        /// 
        public virtual System.String UserID
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
        /// 用户名称
        /// </summary>
        public virtual System.String UserName
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
        /// 角色
        /// </summary>
        public virtual Role Role
        {
            get;
            set;
        }

        ///<summary>
        ///用户登录标识
        ///</summary>
        public virtual String LoginFlg
        {
            get;
            set;
        }

    }
}
