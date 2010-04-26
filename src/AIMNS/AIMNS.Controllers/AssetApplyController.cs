using System;
using System.Collections;
using System.Collections.Generic;

using System.Web.Mvc;
using AIMNS.DTO;
using AIMNS.Model;
using AIMNS.DTO.Mappers;
using System.Web.UI;

namespace AIMNS.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None)]
    public class AssetApplyController:BaseController
    {
        public ActionResult Index()
        {
            return View("AstApplyManage");
        }

        /// <summary>
        /// 获取本部所有的申请信息
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetMyAll()
        {
            //string deptId = this.Request["deptId"].ToString();
            string deptId = "00000003";
            IList list = ManagerFactory.AssetApplyManager.GetMyAll(deptId);

            IList<AssetApplyDTO> result = new List<AssetApplyDTO>();

            foreach (AssetApply o in list)
            {
                result.Add(AssetApplyDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        /// <summary>
        /// 获取资产大类列表
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAssetTypes()
        {
            IList list = ManagerFactory.AssetApplyManager.GetAssetTypeList();
            
            IList<MasterInfoDTO> result = new List<MasterInfoDTO>();

            foreach (MasterInfo o in list)
            {
                result.Add(MasterInfoDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        /// <summary>
        /// 获取资产小分类列表
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAssetSubtypes()
        {
            IList list = ManagerFactory.AssetApplyManager.GetAssetSubtypeList();

            IList<MasterInfoDTO> result = new List<MasterInfoDTO>();

            foreach (MasterInfo o in list)
            {
                result.Add(MasterInfoDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        /// <summary>
        /// 获取所有空闲资产(暂不包含附属资产)
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetFreeAssets()
        {
            IList list = ManagerFactory.AssetApplyManager.GetFreeAssetList();

            IList<AssetApply_AssetDTO> result = new List<AssetApply_AssetDTO>();

            foreach (AssetApply_Asset o in list)
            {
                result.Add(AssetApply_AssetDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

        /// <summary>
        /// 申请用户选中的资产项目
        /// </summary>
        /// <param name="assetIds">选中的资产ID</param>
        /// <param name="reason">申请理由</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ApplyAddBatch(string[] assetIds, string reason)
        {
            string deptId = "00000003";
            int val = ManagerFactory.AssetApplyManager.DoApplyAddInBatch(deptId, assetIds, reason);

            ResultDTO rdto = new ResultDTO();
            if (val >= 0)
            {
                rdto.Result = true;
                rdto.Message = "申请成功";
            }
            else
            {
                rdto.Result = false;
                rdto.Message = "申请失败";
            }
            return this.Json(rdto);
        }

    }

}
