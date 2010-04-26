using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AIMNS.DTO
{
    [DataContract]
    public class MasterInfoDTO
    {
        [DataMember]
        public string InfoCode;
        [DataMember]
        public string SubinfoCode;
        [DataMember]
        public string SubinfoName;
    }
}
