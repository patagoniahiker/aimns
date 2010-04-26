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
            string deptId = "00000003";//这里只是暂时这样写，将来要改为从session中读取当前用户所在部门ID
            int val = ManagerFactory.AssetApplyManager.DoApplyAddInBatch(deptId, assetIds, reason);

            ResultDTO rdto = new ResultDTO();
            try
            {
                ManagerFactory.AssetApplyManager.DoApplyAddInBatch(deptId, assetIds, reason);
                rdto.Result = true;
                rdto.Message = "申请成功";
            }
            catch
            {
                rdto.Result = false;
                rdto.Message = "申请失败";
            }
            return this.Json(rdto);
        }

        /// <summary>
        /// 申请用户在表单中所填写的资产
        /// </summary>
        /// <param name="astName"></param>
        /// <param name="astModel"></param>
        /// <param name="astSpec"></param>
        /// <param name="aplAmount"></param>
        /// <param name="reason"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ApplyAdd(string astName, string astModel, string astSpec, string aplAmount, string reason)
        {
            string deptId = "00000003";

            AssetApply astApply = new AssetApply();

            astApply.AplDeptID = deptId;
            astApply.AssetName = astName;
            astApply.AssetModel = astModel;
            astApply.AssetSpec = astSpec;
            astApply.AplAmount = Int32.Parse(aplAmount);
            astApply.AplReason = reason;

            ResultDTO rdto = new ResultDTO();
            try
            {
                ManagerFactory.AssetApplyManager.DoApplyAdd(astApply);
                rdto.Result = true;
                rdto.Message = "申请成功";
            }
            catch
            {
                rdto.Result = false;
                rdto.Message = "申请失败";
            }
            return this.Json(rdto);
        }

        /// <summary>
        /// 申请报修
        /// </summary>
        /// <param name="astId">报修资产ID号</param>
        /// <param name="reason">报修原因</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ApplyRepair(string assetId, string reason)
        {
            ResultDTO rdto = new ResultDTO();
            try
            {
                ManagerFactory.AssetApplyManager.DoApplyRepair(assetId, reason);
                rdto.Result = true;
                rdto.Message = "申请报修成功";
            }
            catch
            {
                rdto.Result = false;
                rdto.Message = "申请失败";
            }
            return this.Json(rdto);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ApplyReturn(string assetId, string reason)
        {
            ResultDTO rdto = new ResultDTO();
            try
            {
                ManagerFactory.AssetApplyManager.DoApplyReturn(assetId, reason);
                rdto.Result = true;
                rdto.Message = "申请退还成功";
            }
            catch
            {
                rdto.Result = false;
                rdto.Message = "申请失败";
            }
            return this.Json(rdto);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ApplyDestroy(string assetId, string reason)
        {
            ResultDTO rdto = new ResultDTO();
            try
            {
                ManagerFactory.AssetApplyManager.DoApplyDestroy(assetId, reason);
                rdto.Result = true;
                rdto.Message = "申请报废成功";
            }
            catch
            {
                rdto.Result = false;
                rdto.Message = "申请失败";
            }
            return this.Json(rdto);
        }

        /// <summary>
        /// 获取本部门的所有资产列表
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetDeptAssets()
        {
            string deptId = "00000003";
            IList list = ManagerFactory.AssetApplyManager.GetDeptAssetList(deptId);

            IList<AssetApply_AssetDTO> result = new List<AssetApply_AssetDTO>();

            foreach (AssetApply_Asset o in list)
            {
                result.Add(AssetApply_AssetDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }

    }

}
