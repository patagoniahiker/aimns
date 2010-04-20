using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IDAL
{
    public interface IRoleDao
    {
        Role FindById(string RoleId);
        void Delete(Role Role);
        Role Save(Role Role);
        Role SaveOrUpdate(Role Role);
        IList  FindAll();
        
    }
}
