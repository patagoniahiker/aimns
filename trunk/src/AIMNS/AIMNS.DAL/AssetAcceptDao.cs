#region Imports
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AIMNS.IDAL;
using AIMNS.Model;
using Spring.Data.NHibernate.Support;
using Spring.Data.NHibernate;
using NHibernate.Engine;
#endregion

namespace AIMNS.DAL
{
    public class AssetAcceptDao : HibernateDaoSupport, IAssetAcceptDao
    {
        public IList FindAll()
        {
            NHibernate.ISession session = HibernateTemplate.SessionFactory.OpenSession();
            NHibernate.IQuery query = session.CreateQuery("from AssetApply a where a.AplStatus != '0004'");

            return query.List();
        }

        public int Update(AssetApply o)
        {
            try
            {
                HibernateTemplate.SaveOrUpdate(o);
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public AssetApply FindById(int id)
        {
            return HibernateTemplate.Load(typeof(AssetApply), id) as AssetApply;
        }

        public IList FindAllStatus()
        {
            NHibernate.ISession session = HibernateTemplate.SessionFactory.OpenSession();
            NHibernate.IQuery query = session.CreateQuery("from MasterInfo mi where mi.InfoCode=? and mi.SubinfoCode!=?");

            query.SetParameter(0, "06");
            query.SetParameter(1, "0004");

            return query.List();
        }
    }
}
