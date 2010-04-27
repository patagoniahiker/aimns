using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.IBLL
{
    public interface IAssetAcceptManager
    {
        IList GetAllApplication();
        IList GetAvailableStatusList();

        AssetApply GetApplication(string aplNo);
    }
}
