#region Imports
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Spring.Data.NHibernate.Support;

using AIMNS.IDAL;
using AIMNS.Model;
using Spring.Data.NHibernate;
using NHibernate.Engine;
#endregion

namespace AIMNS.DAL
{
    class AssetApplyDao : HibernateDaoSupport, IAssetApplyDao
    {
        public IList FindAll()
        {
            return HibernateTemplate.LoadAll(typeof(AssetApply));
        }

        public IList FindAllByDeptId(string id)
        {
            // 检索本部的申请（已关闭ID=0004的除外）
            NHibernate.ISession session = HibernateTemplate.SessionFactory.OpenSession();
            NHibernate.IQuery query = session.CreateQuery("from AssetApply aa where aa.AplDeptID=:deptId and aa.AplStatus != '0004'");

            query.SetParameter("deptId", id);
            return query.List();
        }

        public IList FindAssetsByStatus(string status)
        {
            // 检索指定状态下的资产
            NHibernate.ISession session = HibernateTemplate.SessionFactory.OpenSession();
            NHibernate.IQuery query = session.CreateQuery("from AssetApply_Asset ast where ast.AssetStatus=:status");

            query.SetParameter("status", status);
            return query.List();
        }

        public IList FindAssetsByIds(string[] ids)
        {
            // 检索指定ID集合对应的资产集合
            IList list = new ArrayList();
            AssetApply_Asset asset = null;

            for (int i = 0; i < ids.Length; i++)
            {
                asset = HibernateTemplate.Load(typeof(AssetApply_Asset), ids[i]) as AssetApply_Asset;
                list.Add(asset);
            }
            return list;
        }

        public int SaveOne(AssetApply asset)
        {
            try
            {
                HibernateTemplate.Save(asset);
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public int SaveSome(IList astList)
        {
            int retVal = 0;

            foreach (AssetApply o in astList)
            {
                retVal += SaveOne(o);
            }
            return retVal;
        }

    }
}
