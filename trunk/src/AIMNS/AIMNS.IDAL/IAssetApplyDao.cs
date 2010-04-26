using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using AIMNS.Model;

namespace AIMNS.IDAL
{
    public interface IAssetApplyDao
    {
        IList FindAll();
        IList FindAllByDeptId(string id);
        IList FindAssetsByStatus(string status);
        IList FindAssetsByIds(string[] ids);
        
        int SaveOne(AssetApply asset);
        int SaveSome(IList astList);
    }
}
