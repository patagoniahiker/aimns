using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using AIMNS.Model;

namespace AIMNS.IDAL
{
    public interface IAssetAcceptDao
    {
        IList FindAll();
        IList FindAllStatus();
        AssetApply FindById(int id);
        int Update(AssetApply o);
    }
}
