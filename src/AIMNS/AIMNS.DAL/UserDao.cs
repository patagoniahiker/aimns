using System;
using System.Collections;
using System.Collections.Generic;
using NHibernate;
using Spring.Data.NHibernate.Support;

using AIMNS.IDAL;
using AIMNS.Model;
using Spring.Data.NHibernate;
using NHibernate.Engine;
using NHibernate.SqlCommand;
using NHibernate.SqlTypes;
using System.Data;
using NHibernate.Driver;

namespace AIMNS.DAL
{
    public class UserDao : HibernateDaoSupport, IUserDao
    {
        public User Save(User user)
        {
            HibernateTemplate.Save(user);
            return user;
        }
        public User SaveOrUpdate(User user)
        {
            HibernateTemplate.SaveOrUpdate(user);
            return user;
        }
        public void Delete(User user)
        {
            HibernateTemplate.Delete(user);
        }
        public User FindById(string userId)
        {
            return HibernateTemplate.Get(typeof(User), userId) as User;
        }
        public  IList  FindAll()
        {
            return HibernateTemplate.LoadAll(typeof (User));
        }

        public IList GetByCondition(User user)
        {
            ArrayList param = new ArrayList();
            string queryStr =  "from User t where 1=1";
            if (user.UserID != "")
            {
                queryStr += " and t.UserID=?";
                param.Add(user.UserID);
            }
            if (user.UserName != "")
            {
                queryStr += " and t.UserName like ?";
                param.Add("%"+user.UserName+"%");
            }
            if (user.Role != null)
            {
                queryStr += " and t.Role=?";
                param.Add(user.Role.RoleId);
            }
            if (user.Department != null)
            {
                queryStr += " and t.Department=?";
                param.Add(user.Department.DepartmentID);
            }
            return HibernateTemplate.Find(queryStr ,param .ToArray () );
        }

        public IList GetPermissionList(string userId)
        {
            IList result = new ArrayList();

            string query = "select per.fuc_id, fuc.fuc_name, fuc.fuc_url ";
            query += "from D_USER usr left join D_PERMISSION per on usr.usr_role = per.role_id ";
            query += "inner join D_FUNCTION fuc on per.fuc_id = fuc.fuc_id where usr.usr_id = '";
            query += userId;
            query += "' order by per.fuc_id";

            result = DBHelper.executeSQL(query);
            return result;
        }
    }
}
