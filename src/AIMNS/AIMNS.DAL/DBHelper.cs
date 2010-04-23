using System;
using System.Collections;
using System.Collections.Generic;
using NHibernate;
using Spring.Data.NHibernate.Support;

using AIMNS.IDAL;
using AIMNS.Model;
using Spring.Data.NHibernate;
using NHibernate.Engine;

using System.Data;
using NHibernate.Cfg;
using NHibernate.SqlCommand;

namespace AIMNS.DAL
{
    public class DBHelper
    {
        public static IList executeSQL(string sql)
        {
            IList result = new ArrayList();

            ISessionFactoryImplementor sf;
            IDbCommand cmd;
            IDbConnection conn;

            try
            {
                Configuration cfg = new Configuration();
                cfg.Configure();
                sf = (ISessionFactoryImplementor)cfg.BuildSessionFactory();

                SqlString queryString = new NHibernate.SqlCommand.SqlString(sql);

                NHibernate.SqlTypes.SqlType[] Types = new NHibernate.SqlTypes.SqlType[] { };

                cmd = sf.ConnectionProvider.Driver.GenerateCommand(CommandType.Text, queryString, Types);

                cmd.CommandText = sql;

                conn = sf.OpenConnection();
            }
            catch (HibernateException ex)
            {
                throw new HibernateException("Fatal error occured, Can not connect the database!", ex);
            }

            try
            {
                cmd.Connection = conn;

                IDataReader rs = cmd.ExecuteReader();

                while (rs.Read())
                {
                    Array subList = new object[rs.FieldCount];
                    for (int i = 0; i < rs.FieldCount; i++)
                    {
                        subList.SetValue(rs.GetValue(i), i);
                    }
                    result.Add(subList);
                }
            }
            catch (HibernateException ex)
            {
                throw new HibernateException(ex);
            }
            finally
            {
                sf.CloseConnection(conn);
            }
            return result;
        }

    }
}
