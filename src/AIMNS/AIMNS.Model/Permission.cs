using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

namespace AIMNS.Model
{
    [Serializable]
    public class Permission
    {
        #region Property Members

        /// <summary>
        /// 功能ID
        /// </summary>
        public virtual string FucID
        {
            get;
            set;
        }

        /// <summary>
        /// 角色ID
        /// </summary>
        public virtual string RoleID
        {
            get;
            set;
        }

        /// <summary>
        /// 权限标识
        /// </summary>
        public virtual string PerFlg
        {
            get;
            set;
        }


        #endregion
    }
}
