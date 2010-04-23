using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AIMNS.DTO
{
    [DataContract]
    public class PropertyDTO
    {
        [DataMember]
        public string ast_id;
        [DataMember]
        public string ast_name;
        [DataMember]
        public string ast_model;
        [DataMember]
        public string ast_std;
        [DataMember]
        public string DepartmentID;
        [DataMember]
        public string DepartmentName;
        [DataMember]
        public string ast_user;
        [DataMember]
        public string ast_class1;
        [DataMember]
        public string ast_class2;
        [DataMember]
        public string ast_state;
        [DataMember]
        public string ast_diff;
        [DataMember]
        public string ast_fa_id;
        [DataMember]
        public string ast_buy_date;
        [DataMember]
        public string ast_supplier;
    }
}
