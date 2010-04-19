using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

namespace AIMNS.Model
{

    [Serializable]
    public class Company 
    {
        #region Property Members


        /// <summary>
        /// 编号
        /// </summary>
        public virtual string CompanyID
        {
            get;
            set;
        }
        /// <summary>
        /// 全称（本地化名称）
        /// </summary>
        public virtual string FullName
        {
            get;
            set;
        }
        /// <summary>
        /// 负责人
        /// </summary>

        public virtual string Principal
        {
            get;
            set;
        }
        /// <summary>
        /// 联系人
        /// </summary>
        public virtual string Linkman
        {
            get;
            set;
        }
        /// <summary>
        /// 资产
        /// </summary>
        public virtual decimal RegistryAsset
        {
            get;
            set;
        }
        /// <summary>
        /// 员工人数
        /// </summary>
        public virtual int Employees
        {
            get;
            set;
        }

        /// <summary>
        /// 国家
        /// </summary>
        public virtual string Country
        {
            get;
            set;

        }

        /// <summary>
        /// 地区(华东区、华南区)
        /// </summary>
        public virtual string Region
        {
            get;
            set;
        }

        /// <summary>
        /// 省份
        /// </summary>
        public virtual string Province
        {
            get;
            set;
        }


        /// <summary>
        /// 联系电话
        /// </summary>
        public virtual string Telephone
        {
            get;
            set;
        }
        /// <summary>
        /// 传真号码
        /// </summary>
        public virtual string Fax
        {
            get;
            set;
        }
        /// <summary>
        /// 电子邮件信箱
        /// </summary>
        public virtual string Email
        {
            get;
            set;
        }
        /// <summary>
        /// 备注
        /// </summary>
        public virtual string Remark
        {
            get;
            set;
        }
        /// <summary>
        /// 建立日期
        /// </summary>
        public virtual DateTime? CreateTime
        {
            get;
            set;
        }
        /// <summary>   
        /// 建立者
        /// </summary>

        public virtual string Creator
        {
            get;
            set;
        }

        /// <summary>
        /// 公司用户列表
        /// </summary>
        public virtual IList UserList
        {
            get;
            set;
        }


        public virtual IList DepartmentList
        {
            get;
            set;
        }
        #endregion
    }

}
