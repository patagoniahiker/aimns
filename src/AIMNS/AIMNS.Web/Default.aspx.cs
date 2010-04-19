using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace AIMNS.Web
{
    public partial class _Default : Page
    {
        public void Page_Load(object sender, System.EventArgs e)
        {
            Response.Redirect("~/Login.mvc");
        }
    }
}
