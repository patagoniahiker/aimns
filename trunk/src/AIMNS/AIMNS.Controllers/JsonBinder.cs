using System;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace AIMNS.Controllers
{
    /// <summary>
    /// JsonBinder Serializer to convert a JSON Stream from Clientside to a serialized C# Object of based type passed.
    /// </summary>
    public class JsonBinder<T> : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var param = new DataContractJsonSerializer(typeof(T))
                .ReadObject(controllerContext.HttpContext.Request.InputStream);
            return  param;
        }
    }
}
