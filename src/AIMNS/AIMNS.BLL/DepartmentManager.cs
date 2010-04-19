#region Imports

using System;
using System.Collections;
using System.Security.Cryptography;
using System.Text;

using AIMNS.IBLL;
using AIMNS.IDAL;
using AIMNS.Model;

#endregion

namespace AIMNS.BLL
{
    public class DepartmentManager:IDepartmentManager
    {
        #region Properties

        public IDepartmentDao DepartmentDao { get; set; }

        #endregion

        public Department SaveDepartment(Department Department)
        {
            Department Depart = GetDepartment(Department.DepartmentID);
            if (Depart != null)
            {
                throw new Exception("该部门号的部门已存在，请重新指定部门号。");
            }
            return DepartmentDao.Save(Department);
        }

        public void DeleteDepartment(string comapnyID)
        {
            Department Department = GetDepartment(comapnyID);
            if (Department != null)
            {
                DepartmentDao.Delete(Department);
            }
            else
            {
                throw new Exception("不存在的公司");
            }
        }

        public Department UpdateDepartment(Department Department)
        {
            return DepartmentDao.SaveOrUpdate(Department);
        }

        public Department GetDepartment(string DepartmentID)
        {
            return DepartmentDao.FindById(DepartmentID);
        }

        public Department NewDepartment()
        {
            return new Department();
        }


        public IList GetAll()
        {
            return DepartmentDao.FindAll();
        }

        public IList GetByCondition(Department dept)
        {
            return DepartmentDao.GetByCondition(dept);
        }

    }
}
