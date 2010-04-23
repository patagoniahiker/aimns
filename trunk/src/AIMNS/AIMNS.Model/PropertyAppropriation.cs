using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace AIMNS.Model
{
    [Serializable]
    public class PropertyAppropriation
    {
        #region Property Members

        /// <summary>
        /// 调拨ID
        /// </summary>

        public virtual string ast_main_id
        {
            get;
            set;
        }

        /// <summary>
        /// 资产ID
        /// </summary>

        public virtual string ast_id
        {
            get;
            set;
        }

        /// <summary>
        /// 资产原部门
        /// </summary>

        public virtual Department Department
        {
            get;
            set;
        }

        /// <summary>
        /// 资产原使用人
        /// </summary>

        public virtual string ast_from_user
        {
            get;
            set;
        }

        /// <summary>
        /// 资产调拨日期
        /// </summary>

        public virtual DateTime ast_fit_date
        {
            get;
            set;
        }

        /// <summary>
        /// 资产调拨默认日期
        /// </summary>

        public virtual DateTime ast_fit_default_date
        {
            get;
            set;
        }


        /// <summary>
        /// 资产调拨原因
        /// </summary>
        public virtual string ast_fit_reason
        {
            get;
            set;
        }

        #endregion
    }
}
