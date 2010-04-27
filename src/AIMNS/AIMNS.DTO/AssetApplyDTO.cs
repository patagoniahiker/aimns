using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AIMNS.DTO
{
    /// <summary>
    /// 资产申请的数据传输对象
    /// </summary>
    [DataContract]
    public class AssetApplyDTO
    {
        [DataMember]
        public int AplNo; // 申请No.
        [DataMember]
        public string AplDeptID; // 申请部门ID
        [DataMember]
        public string AplDeptName; // 申请部门名称
        [DataMember]
        public string AplType; // 申请类别代码
        [DataMember]
        public string AplTypeName; // 申请类别名称
        [DataMember]
        public string AssetID; // 申请资产ID
        [DataMember]
        public string AssetName; // 申请资产名称
        [DataMember]
        public string AssetModel; // 资产型号
        [DataMember]
        public string AssetSpec; // 资产规格
        [DataMember]
        public string AssetType; // 资产大类别代码
        [DataMember]
        public string AssetTypeName; // 资产大类别名称
        [DataMember]
        public string AssetSubType; // 资产小类别代码
        [DataMember]
        public string AssetSubTypeName; // 资产小类别名称
        [DataMember]
        public int AplAmount; // 申请数量
        [DataMember]
        public string AplStatusCode; // 申请状态代码
        [DataMember]
        public string AplStatus; // 申请状态
        [DataMember]
        public string AplReason; // 申请理由
        [DataMember]
        public Dictionary<string, string> StatusSet;
        [DataMember]
        public Dictionary<string, string> AplTypeSet;
        [DataMember]
        public Dictionary<string, string> DeptSet;

        //构造方法
        public AssetApplyDTO()
        {
            this.StatusSet = new Dictionary<string, string>();
            this.AplTypeSet = new Dictionary<string, string>();
            this.DeptSet = new Dictionary<string, string>();
        }
    }
}
