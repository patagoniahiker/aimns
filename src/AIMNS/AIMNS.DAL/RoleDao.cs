using System;
using System.Collections;
using System.Collections.Generic;
using NHibernate;
using Spring.Data.NHibernate.Support;

using AIMNS.IDAL;
using AIMNS.Model;
using Spring.Data.NHibernate;
using NHibernate.Engine;

namespace AIMNS.DAL
{
    public class RoleDao : HibernateDaoSupport, IRoleDao
    {
        public Role Save(Role Role)
        {
            HibernateTemplate.Save(Role);
            return Role;
        }
        public Role SaveOrUpdate(Role Role)
        {
            HibernateTemplate.SaveOrUpdate(Role);
            return Role;
        }
        public void Delete(Role Role)
        {
            HibernateTemplate.Delete(Role);
        }
        public Role FindById(string RoleId)
        {
            return HibernateTemplate.Get(typeof(Role), RoleId) as Role;
        }
        public  IList  FindAll()
        {
            return HibernateTemplate.LoadAll(typeof (Role));
        }
    }
}
