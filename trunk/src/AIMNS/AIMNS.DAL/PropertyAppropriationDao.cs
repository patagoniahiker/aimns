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
    public class PropertyAppropriationDao : HibernateDaoSupport,IPropertyAppropriationDao 
    {
        public void Save(PropertyAppropriation propertyAppropriation)
        {
            HibernateTemplate.Save(propertyAppropriation);
        }
        public PropertyAppropriation SaveOrUpdate(PropertyAppropriation propertyAppropriation)
        {
            HibernateTemplate.SaveOrUpdate(propertyAppropriation);
            return propertyAppropriation;
        }
        public void Delete(PropertyAppropriation propertyAppropriation)
        {
            HibernateTemplate.Delete(propertyAppropriation);
        }
        public PropertyAppropriation FindById(string propertyId)
        {
            return HibernateTemplate.Get(typeof(PropertyAppropriation), propertyId) as PropertyAppropriation;
        }
        public IList FindAll()
        {
            return HibernateTemplate.LoadAll(typeof(PropertyAppropriation));
        }
        public IList GetByCondition(PropertyAppropriation propertyAppropriation)
        {
            ArrayList param = new ArrayList();
            string queryStr = "from PropertyAppropriation t where 1=1";
            if (propertyAppropriation.ast_id != "")
            {
                queryStr += " and t.ast_id=?";
                param.Add(propertyAppropriation.ast_id);
            }
            if (propertyAppropriation.Department != null)
            {
                queryStr += " and t.Department = ?";
                param.Add(propertyAppropriation.Department.DepartmentID);
            }
            if (propertyAppropriation.ast_from_user != "")
            {
                queryStr += " and t.ast_from_user like ?";
                param.Add("%" + propertyAppropriation.ast_from_user  + "%");
            }
            if (propertyAppropriation.ast_fit_date != propertyAppropriation.ast_fit_default_date )
            {
                DateTime dtTemp = propertyAppropriation.ast_fit_date.AddDays(1);
                queryStr += " and t.ast_fit_date >= ? and t.ast_fit_date < ?";
                param.Add(propertyAppropriation.ast_fit_date);
                param.Add(dtTemp);
            }
            return HibernateTemplate.Find(queryStr, param.ToArray());
        }
    }
}
