using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace AIMNS.Model
{
    [Serializable]
    public class Role
    {
        public virtual String RoleId
        {
            get;
            set;
        }

        public virtual String RoleName
        {
            get;
            set;
        }

    }
}
