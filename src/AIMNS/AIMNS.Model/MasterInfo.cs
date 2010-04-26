using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AIMNS.Model
{
    [Serializable]
    public class MasterInfo
    {
        /// <summary>
        /// 信息主码
        /// </summary>
        public virtual string InfoCode
        {
            get;
            set;
        }

        /// <summary>
        /// 子信息代码
        /// </summary>
        public virtual string SubinfoCode
        {
            get;
            set;
        }

        /// <summary>
        /// 子信息名称
        /// </summary>
        public virtual string SubinfoName
        {
            get;
            set;
        }

        public override bool Equals(object obj)
        {
            if (obj == this)
            {
                return true;
            }

            MasterInfo mstInfo = (MasterInfo)obj;
            if (mstInfo.InfoCode == this.InfoCode && mstInfo.SubinfoCode == this.SubinfoCode)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public override int GetHashCode()
        {
            string s = this.InfoCode + this.SubinfoCode;
            return s.GetHashCode();
        }
    }
}
