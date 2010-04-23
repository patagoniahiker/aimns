using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;


namespace AIMNS.DTO
{
   [DataContract]
   public class MenuNodeDTO
    {
        [DataMember] public string text;
        [DataMember] public string id;
        [DataMember] public string url;
        [DataMember] public bool leaf;
        [DataMember] public List<MenuNodeDTO> childNodes;

    }
}