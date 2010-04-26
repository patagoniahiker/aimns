using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using AIMNS.Model;

namespace AIMNS.IDAL
{
    public interface IMasterInfoDao
    {
        IList FindAll();
        MasterInfo FindById(string id1, string id2);
        IList FindByMainId(string id);
    }
}
