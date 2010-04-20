using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

namespace AIMNS.Model
{
    [Serializable]
    class Fuc
    {
        #region Property Members

        /// <summary>
        /// 功能ID
        /// </summary>
        public virtual string FucID
        {
            get;
            set;
        }

        /// <summary>
        /// 功能名
        /// </summary>
        public virtual string FucName
        {
            get;
            set;
        }

        #endregion
    }
}
