using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AIMNS.Model
{
    [Serializable]
    public class AssetApply_Asset
    {
        // 资产ID
        public virtual string AssetID { get; set; }

        // 资产名称
        public virtual string AssetName { get; set; }

        // 资产型号
        public virtual string AssetModel { get; set; }
        
        // 资产规格
        public virtual string AssetSpec { get; set; }
        
        // 资产状态
        public virtual string AssetStatus { get; set; }

        // 资产区分
        public virtual string AssetCls { get; set; }

        public virtual string AssetType { get; set; }

        public virtual string AssetSubtype { get; set; }

        //所属部门
        public virtual string BelongingDept { get; set; }

        //使用者
        public virtual string User { get; set; }
    }
}
