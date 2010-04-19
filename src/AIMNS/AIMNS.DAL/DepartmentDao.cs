﻿using System.Collections;
using Spring.Data.NHibernate.Support;


using AIMNS.IDAL;
using AIMNS.Model;
 
namespace AIMNS.DAL
{
    public class DepartmentDao : HibernateDaoSupport,IDepartmentDao
    {

        public Department Save(Department department)
        {
            HibernateTemplate.Save(department);
            return department;
        }

        public Department SaveOrUpdate(Department department)
        {
            HibernateTemplate.SaveOrUpdate(department);
            return department;
        }

        public void Delete(Department department)
        {
            HibernateTemplate.Delete(department);
        }

        public Department FindById(string departmentId)
        {
            return HibernateTemplate.Get(typeof(Department), departmentId) as Department;
        }

        public IList GetByCondition(Department depart)
        {
            IList ls = HibernateTemplate.Find("from Department t where t.DepartmentID=? "// +
               // "and t.DepartmentName like %?% and t.ParentDepartmentId = ?"
                ,depart.DepartmentID ) ;
            return ls;
        }

        public IList FindAll()
        {
            return HibernateTemplate.LoadAll(typeof (Department));
        }
    }
}
