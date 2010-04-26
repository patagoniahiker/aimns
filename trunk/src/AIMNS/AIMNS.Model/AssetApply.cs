using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AIMNS.Model
{
    [Serializable]
    public class AssetApply
    {
        /// <summary>
        /// 申请No.
        /// </summary>
        public virtual int AplNo
        {
            get;
            set;
        }

        /// <summary>
        /// 申请人部门ID
        /// </summary>
        public virtual String AplDeptID
        {
            get;
            set;
        }

        /// <summary>
        /// 申请类别
        /// </summary>
        public virtual String AplType
        {
            get;
            set;
        }

        /// <summary>
        /// 申请资产ID
        /// </summary>
        public virtual String AssetID
        {
            get;
            set;
        }

        /// <summary>
        /// 申请资产名称
        /// </summary>
        public virtual String AssetName
        {
            get;
            set;
        }

        /// <summary>
        /// 申请资产型号
        /// </summary>
        public virtual String AssetModel
        {
            get;
            set;
        }

        /// <summary>
        /// 申请资产规格
        /// </summary>
        public virtual String AssetSpec
        {
            get;
            set;
        }

        /// <summary>
        /// 资产类别1(资产大类别)
        /// </summary>
        public virtual String AssetType
        {
            get;
            set;
        }

        /// <summary>
        /// 资产类别2(资产小类别)
        /// </summary>
        public virtual String AssetSubType
        {
            get;
            set;
        }

        /// <summary>
        /// 申请资产数量
        /// </summary>
        public virtual int AplAmount
        {
            get;
            set;
        }

        /// <summary>
        /// 申请状态
        /// </summary>
        public virtual String AplStatus
        {
            get;
            set;
        }

        /// <summary>
        /// 申请理由
        /// </summary>
        public virtual String AplReason
        {
            get;
            set;
        }
    }
}
