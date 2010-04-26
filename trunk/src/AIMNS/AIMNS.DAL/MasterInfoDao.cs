#region Imports
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AIMNS.IDAL;
using AIMNS.Model;
using Spring.Data.NHibernate;
using NHibernate.Engine;
using NHibernate;
using Spring.Data.NHibernate.Support;
#endregion

namespace AIMNS.DAL
{
    public class MasterInfoDao : HibernateDaoSupport, IMasterInfoDao
    {
        public IList FindAll()
        {
            return HibernateTemplate.LoadAll(typeof(MasterInfo));
        }

        public MasterInfo FindById(string id1, string id2)
        {
            MasterInfo mstinfo = new MasterInfo();

            mstinfo.InfoCode = id1;
            mstinfo.SubinfoCode = id2;

            mstinfo = HibernateTemplate.Load(typeof(MasterInfo), 1) as MasterInfo;
            return mstinfo;
        }

        public IList FindByMainId(string id)
        {
            NHibernate.ISession session = HibernateTemplate.SessionFactory.OpenSession();
            NHibernate.IQuery query = session.CreateQuery("from MasterInfo m where m.InfoCode=:infoCode");
            query.SetParameter("infoCode", id);

            return query.List();
        }
    }
}
