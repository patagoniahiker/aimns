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
   public  class CompanyManager:ICompanyManager
    {
       #region Properties

       public ICompanyDao CompanyDao { get; set; }

       #endregion

        public  Company  SaveCompany(Company company)
        {
            return CompanyDao.Save(company);
        }

        public void  DeleteCompany(string   comapnyID)
        {
            Company company = GetCompany(comapnyID);
            if (company != null)
            {
                 CompanyDao.Delete(company);
            }
            else
            {
                throw new  Exception("不存在的公司");
            }
        }

        public  Company UpdateCompany(Company company)
        {
            return CompanyDao.SaveOrUpdate(company);
        }

        public Company GetCompany(string  companyID)
        {
            return CompanyDao.FindById(companyID);
        }

        public Company NewCompany()
        {
            return new Company();
        }
 
    }
}
