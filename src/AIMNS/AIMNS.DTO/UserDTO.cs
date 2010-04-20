using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;


namespace AIMNS.DTO
{
    [DataContract]
   public   class UserDTO
    {
        [DataMember] public string UserID;
        [DataMember] public string UserName;
        [DataMember] public string DepartmentID;
        [DataMember] public string DepartmentName;
        [DataMember] public string RoleId;
        [DataMember] public string RoleName;

    }
}
