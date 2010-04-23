using System.Collections;
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
            ArrayList param = new ArrayList();
            string queryStr = "from Department t where 1=1";
            if (depart.DepartmentID != "")
            {
                queryStr += " and t.DepartmentID=?";
                param.Add(depart.DepartmentID);
            }
            if (depart.DepartmentName != "")
            {
                queryStr += " and t.DepartmentName like ?";
                param.Add("%" + depart.DepartmentName + "%");
            }
            if (depart.ParentDepartment != null)
            {
                queryStr += " and t.ParentDepartment=?";
                param.Add(depart.ParentDepartment.DepartmentID);
            }
            return HibernateTemplate.Find(queryStr, param.ToArray());
        }

        public IList FindAll()
        {
            return HibernateTemplate.LoadAll(typeof (Department));
        }
    }
}
