using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web.Mvc;
using Spring.Context.Support;
using AIMNS.DTO;


namespace AIMNS.Controllers
{
   public  class BaseController:Controller
    {
       public AllManagerFactory  ManagerFactory
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
