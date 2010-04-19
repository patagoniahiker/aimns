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
        [DataMember] public string ManagerID;
        [DataMember] public string ManagerName;
        [DataMember] public string DepartmentID;
        [DataMember] public string DepartmentName;
        [DataMember] public string CompanyID;
        [DataMember] public string CompanyName;
        [DataMember] public DateTime? ValidFrom;
        [DataMember] public DateTime? ValidTo;
        [DataMember] public string Telephone;
        [DataMember]  public string Mobile;
        [DataMember] public string Email;

    }
}
