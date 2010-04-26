using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web.Mvc;
using System.Collections;
using AIMNS.Model;
using AIMNS.DTO;
using AIMNS.DTO.Mappers;
using System.Web.UI;

namespace AIMNS.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None)]
    public class ExcelController:BaseController 
    {

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        [ValidateInput(false)]
        public void Excel()
        {
            if (Request["ExportContent"] != "")
            {
                string tmpFileName = "export.xls";
                string tmpContent = Request["ExportContent"];//获取传递上来的文件内容
                if (Request["ExportFile"] != "")
                {
                    tmpFileName = Request["ExportFile"];//获取传递上来的文件名
                    tmpFileName = System.Web.HttpUtility.UrlEncode(Request.ContentEncoding.GetBytes(tmpFileName));//处理中文文件名的情况                    
                }
                Response.Write("<script>document.close();</script>");
                Response.Clear();
                Response.Buffer = true;
                Response.ContentType = "application/vnd.ms-excel";
                Response.AddHeader("Content-Disposition", "attachment;filename=\"" + tmpFileName + "\"");
                Response.Charset = "";
                System.IO.StringWriter tmpSW = new System.IO.StringWriter();
                System.Web.UI.HtmlTextWriter tmpHTW = new System.Web.UI.HtmlTextWriter(tmpSW);
                tmpHTW.WriteLine(tmpContent);
                Response.Write(tmpSW.ToString());
                Response.End();
            }
        }
    }
}
