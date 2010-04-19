using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Spring.Context.Support;


namespace AIMNS.DTO.Mappers
{
    public   class BaseDTOMapper
    {
        public static  AllManagerFactory ManagerFactory
        {
            get
            {
                var webApplicationContext =
                             ContextRegistry.GetContext() as WebApplicationContext;
                AllManagerFactory manager =
                    webApplicationContext.GetObject("ManagerFactory") as AllManagerFactory;

                return manager;
            }
        }
    }
}
