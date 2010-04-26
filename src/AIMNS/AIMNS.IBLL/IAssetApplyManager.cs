using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

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

        int DoApplyAddInBatch(string deptId, string[] astIds, string reason);
    }
}
