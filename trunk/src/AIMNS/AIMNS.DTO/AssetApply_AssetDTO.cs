using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AIMNS.DTO
{
    /// <summary>
    /// 用于资产申请时的资产DTO
    /// </summary>
    [DataContract]
    public class AssetApply_AssetDTO
    {
        [DataMember]
        public string AssetID; // 资产ID

        [DataMember]
        public string AssetName; // 资产名称

        [DataMember]
        public string AssetModel; // 资产型号

        [DataMember]
        public string AssetSpec; // 资产规格

        [DataMember]
        public string AssetStatus; // 资产状态

        [DataMember]
        public string AssetCls; // 资产区分
    }
}
