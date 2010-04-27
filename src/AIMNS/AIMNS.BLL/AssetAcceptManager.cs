#region Imports
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AIMNS.IBLL;
using AIMNS.IDAL;
using AIMNS.Model;
#endregion

namespace AIMNS.BLL
{
    public class AssetAcceptManager:IAssetAcceptManager
    {
        public IAssetAcceptDao AssetAcceptDao { get; set; }

        public IList GetAllApplication()
        {
            return AssetAcceptDao.FindAll();
        }

        public AssetApply GetApplication(string aplNo)
        {
            return AssetAcceptDao.FindById(Int32.Parse(aplNo));
        }

        public IList GetAvailableStatusList()
        {
            return AssetAcceptDao.FindAllStatus();
        }
    }
}
