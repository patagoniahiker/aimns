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
    public class PropertyDao:HibernateDaoSupport ,IPropertyDao 
    {
        public Property Save(Property property)
        {
           HibernateTemplate.Save(property);
           return property;
        }
        public Property SaveOrUpdate(Property property)
        {
            HibernateTemplate.SaveOrUpdate(property);
            return property;
        }
        public void Update(Property property)
        {
            string queryStr = "update Property  set Department = ? and ast_user = ? where ast_id = ?";
            IQuery que = HibernateTemplate.SessionFactory.OpenSession().CreateQuery(queryStr);
            que.SetParameter(0, property.Department.DepartmentID);
            que.SetParameter(1, property.ast_user);
            que.SetParameter(2, property.ast_id);
            que.ExecuteUpdate();
        }
        public void Delete(Property property)
        {
            HibernateTemplate.Delete(property);
        }
        public Property FindById(string propertyId)
        {
            return HibernateTemplate.Get(typeof(Property), propertyId) as Property;
        }
        public IList FindAll()
        {
            return HibernateTemplate.LoadAll(typeof(Property));
        }
        public IList GetByCondition(Property property)
        {
            ArrayList param = new ArrayList();
            string queryStr = "from Property t where 1=1";
            if (property.ast_id != "")
            {
                queryStr += " and t.ast_id=?";
                param.Add(property.ast_id);
            }
            if (property.ast_name != "")
            {
                queryStr += " and t.ast_name like ?";
                param.Add("%" + property.ast_name + "%");
            }
            if (property.ast_model != "")
            {
                queryStr += " and t.ast_model = ?";
                param.Add(property.ast_model);
            }
            if (property.ast_std != "")
            {
                queryStr += " and t.ast_std = ?";
                param.Add(property.ast_std);
            }
            if (property.Department != null)
            {
                queryStr += " and t.Department = ?";
                param.Add(property.Department.DepartmentID);
            }
            //if (propertyAppropriation.ast_fit_date  != null)
            //{
            //    queryStr += " and t.ast_fit_date=?";
            //    param.Add(propertyAppropriation.ast_fit_date );
            //}
            return HibernateTemplate.Find(queryStr, param.ToArray());
        }
    }
}
