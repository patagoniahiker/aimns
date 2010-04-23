using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace AIMNS.Model
{
    [Serializable]
    public class Property
    {
        #region Property Members

        /// <summary>
        /// 资产ID
        /// </summary>

        public virtual string ast_id
        {
            get;
            set;
        }

        /// <summary>
        /// 资产名称
        /// </summary>

        public virtual string ast_name
        {
            get;
            set;
        }

        /// <summary>
        /// 资产型号
        /// </summary>

        public virtual string ast_model
        {
            get;
            set;
        }

        /// <summary>
        /// 资产规格
        /// </summary>

        public virtual string ast_std
        {
            get;
            set;
        }

        /// <summary>
        /// 资产计量单位
        /// </summary>

        public virtual string ast_unit
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
        /// 使用人
        /// </summary>

        public virtual string ast_user
        {
            get;
            set;
        }

        /// <summary>
        /// 资产大类别
        /// </summary>

        public virtual string ast_class1
        {
            get;
            set;
        }

        /// <summary>
        /// 资产小类别
        /// </summary>

        public virtual string ast_class2
        {
            get;
            set;
        }

        /// <summary>
        /// 资产状态
        /// </summary>

        public virtual string ast_state
        {
            get;
            set;
        }

        /// <summary>
        /// 资产区分
        /// </summary>

        public virtual string ast_diff
        {
            get;
            set;
        }


        /// <summary>
        /// 父资产ID
        /// </summary>
        public virtual string ast_fa_id
        {
            get;
            set;
        }

        /// <summary>
        /// 资产购入日期ID
        /// </summary>

        public virtual DateTime ast_buy_date
        {
            get;
            set;
        }

        /// <summary>
        /// 资产供应商
        /// </summary>

        public virtual string ast_supplier
        {
            get;
            set;
        }

        #endregion
    }
}
