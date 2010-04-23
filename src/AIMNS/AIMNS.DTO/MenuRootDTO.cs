using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;


namespace AIMNS.DTO
{
   [DataContract]
   public class MenuRootDTO
    {
        [DataMember] public string id;
        [DataMember] public string title;
        [DataMember] public bool border;
        [DataMember] public bool autoScroll;
        [DataMember] public string iconCls;
        [DataMember] public string html;

    }
}
