using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AIMNS.DTO
{
    [DataContract]
    public class PropertyAppropriationDTO
    {
        [DataMember]
        public string ast_main_id;
        [DataMember]
        public string ast_id;
        [DataMember]
        public string DepartmentID;
        [DataMember]
        public string DepartmentName;
        [DataMember]
        public string ast_from_user;
        [DataMember]
        public string ast_fit_date;
        [DataMember]
        public string ast_fit_reason;
    }
}
