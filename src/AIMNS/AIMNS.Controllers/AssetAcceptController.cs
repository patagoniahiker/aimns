#region Imports
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web.Mvc;
using AIMNS.DTO;
using AIMNS.Model;
using AIMNS.DTO.Mappers;
using System.Web.UI;
#endregion

namespace AIMNS.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None)]
    public class AssetAcceptController:BaseController
    {
        public ActionResult Index()
        {
            return View("AstAcceptManage");
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.AssetAcceptManager.GetAllApplication();

            IList<AssetApplyDTO> result = new List<AssetApplyDTO>();

            foreach (AssetApply o in list)
            {
                result.Add(AssetApplyDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAplStatusDs()
        {
            IList list = ManagerFactory.AssetAcceptManager.GetAvailableStatusList();
            IList<MasterInfoDTO> result = new List<MasterInfoDTO>();

            foreach (MasterInfo o in list)
            {
                result.Add(MasterInfoDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetAssetApply(string aplNo)
        {
            AssetApply apl = ManagerFactory.AssetAcceptManager.GetApplication(aplNo);
            AssetApplyDTO dto = AssetApplyDTOMapper.MapToDTO(apl);

            ResultDTO rdto = new ResultDTO();
            if (dto != null)
            {
                rdto.Result = true;
                rdto.Data = dto;
                rdto.Message = "获取申请信息成功";
            }
            else
            {
                rdto.Result = false;
                rdto.Message = "获取申请信息失败";
            }
            return this.Json(rdto);
        }
    }
}
