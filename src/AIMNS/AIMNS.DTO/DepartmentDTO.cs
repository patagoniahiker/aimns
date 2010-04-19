using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AIMNS.DTO
{
    [DataContract]
    public class DepartmentDTO
    {
        [DataMember] 
        public string DepartmentID;
        [DataMember] 
        public string DepartmentName;
        [DataMember]
        public string ParentDepartmentId;
        [DataMember]
        public string ParentDepartmentName;
        [DataMember]
        public string ManagerId;
        [DataMember]
        public string ManagerName;
    }
}