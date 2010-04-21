using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;


namespace AIMNS.DTO
{
    [DataContract]
   public   class RoleDTO
    {
        [DataMember] public string RoleId;
        [DataMember] public string RoleName;

    }
}
