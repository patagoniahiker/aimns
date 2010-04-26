using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using AIMNS.Model;

namespace AIMNS.IBLL
{
    /// <summary>
    /// 资产申请管理
    /// </summary>
    public interface IAssetApplyManager
    {
        IList GetMyAll(string deptId);
        IList GetAssetTypeList();
        IList GetAssetSubtypeList();
        IList GetAplTypeList();
        IList GetAplStatusList();
        IList GetFreeAssetList();
        IList GetDeptAssetList(string deptId);

        int DoApplyAddInBatch(string deptId, string[] astIds, string reason);
        int DoApplyAdd(AssetApply ast);
        int DoApplyRepair(string id, string reason);
        int DoApplyReturn(string id, string reason);
        int DoApplyDestroy(string id, string reason);
    }
}
