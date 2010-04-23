using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AIMNS.Web.Views.Shared
{
    public partial class Site : System.Web.Mvc.ViewMasterPage
    {
        public void Page_Load(object sender, System.EventArgs e)
        {
            if( Session["User"].Equals( string.Empty ))
            {
                if( !Request.Path.Equals( "/Login.mvc" ))
                {
                    Response.Redirect( "~/Login.mvc" );
                }
            }
        }
    }
}
