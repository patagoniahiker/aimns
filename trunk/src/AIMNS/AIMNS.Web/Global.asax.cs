using System;
using System.Globalization;
using System.IO;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Xml.Serialization;
using System.Text;
 

 
using MvcContrib.ControllerFactories;
using MvcContrib.Services;
using MvcContrib.Spring;
using Spring.Context.Support;
 
using Spring.Objects.Factory;
using Spring.Threading;
using AIMNS.DTO;

using AIMNS.Controllers;
using AIMNS.Model;

namespace AIMNS.Web
{
    public class Global : HttpApplication
    {
        public  void RegisterRoutes(RouteCollection routes)
        {
            // Note: Change the URL to "{controller}.mvc/{action}/{id}" to enable
            //       automatic support on IIS6 and IIS7 classic mode

            RouteTable.Routes.Add(new Route("{controller}.mvc/{action}", new MvcRouteHandler())
            {
                Defaults = new RouteValueDictionary(new { action = "Index"}),
            });

            RouteTable.Routes.Add(new Route("Default.aspx", new MvcRouteHandler())
            {
                Defaults = new RouteValueDictionary(new { controller = "Home", action = "Index", id = "" }),
            });
        }

        protected void Application_Start()
        {
            RegisterRoutes(RouteTable.Routes);
            //log4net配置信息
            log4net.Config.XmlConfigurator.Configure();//.DOMConfigurator.Configure();


            ModelBinders.Binders[typeof(UserDTO)] = new JsonBinder<UserDTO>();
            ModelBinders.Binders[typeof(DepartmentDTO)] = new JsonBinder<DepartmentDTO>();
            ModelBinders.Binders[typeof(PropertyAppropriationDTO)] = new JsonBinder<PropertyAppropriationDTO>();
            ModelBinders.Binders[typeof(Role)] = new JsonBinder<Role>();
            ModelBinders.Binders[typeof(RoleDTO)] = new JsonBinder<RoleDTO>();
            ModelBinders.Binders[typeof(PropertyDTO)] = new JsonBinder<PropertyDTO>();
        }

        public override void Init()
        {
            base.Init();
            ConfigureIoC();
        }

        private void ConfigureIoC()
        {
            var webApplicationContext =
                ContextRegistry.GetContext() as WebApplicationContext;
            DependencyResolver.InitializeWith(
                new SpringDependencyResolver(webApplicationContext.ObjectFactory));
            ControllerBuilder.Current.SetControllerFactory(typeof(IoCControllerFactory));
        }
 
        protected void Application_Error(object sender, EventArgs e)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger("Logger");

            if (Server.GetLastError() != null)
            {
                Exception ex = Server.GetLastError().GetBaseException();
                StringBuilder sb = new StringBuilder();
                sb.Append(ex.Message);
                sb.Append("\r\nSOURCE: " + ex.Source);
                sb.Append("\r\nFORM: " + Request.Form.ToString());
                sb.Append("\r\nQUERYSTRING: " + Request.QueryString.ToString());
                sb.Append("\r\n引发当前异常的原因: " + ex.TargetSite);
                sb.Append("\r\n堆栈跟踪: " + ex.StackTrace);
                logger.Error(sb.ToString());
                Server.ClearError();
            }
        }

 
    }
}