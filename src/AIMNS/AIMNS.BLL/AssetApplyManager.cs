using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AIMNS.IBLL;
using AIMNS.IDAL;
using AIMNS.Model;

namespace AIMNS.BLL
{
    public class AssetApplyManager:IAssetApplyManager
    {
        public IAssetApplyDao AssetApplyDao { get; set; }
        public IMasterInfoDao MasterInfoDao { get; set; }
        public IDepartmentDao DepartDao { get; set; }

        /// <summary>
        /// 获取指定部门的所有申请(已关闭的除外)
        /// </summary>
        /// <param name="deptId"></param>
        /// <returns></returns>
        public IList GetMyAll(string deptId)
        {
            return AssetApplyDao.FindAllByDeptId(deptId);
        }

        /// <summary>
        /// 获取资产大类别列表
        /// </summary>
        /// <returns></returns>
        public IList GetAssetTypeList()
        {
            // 信息代码=01
            string infoId = "01";
            return MasterInfoDao.FindByMainId(infoId);
        }

        /// <summary>
        /// 获取资产小类别列表
        /// </summary>
        /// <returns></returns>
        public IList GetAssetSubtypeList()
        {
            // 信息代码=02
            string infoId = "02";
            return MasterInfoDao.FindByMainId(infoId);
        }

        /// <summary>
        /// 获取申请类别列表
        /// </summary>
        /// <returns></returns>
        public IList GetAplTypeList()
        {
            // 信息代码=05
            string infoId = "05";
            return MasterInfoDao.FindByMainId(infoId);
        }

        /// <summary>
        /// 获取申请状态列表
        /// </summary>
        /// <returns></returns>
        public IList GetAplStatusList()
        {
            // 信息代码=06
            string infoId = "06";
            return MasterInfoDao.FindByMainId(infoId);
        }

        /// <summary>
        /// 获取空闲资产列表
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public IList GetFreeAssetList()
        {
            // 空闲资产状态码=0001
            string status = "0001";
            return AssetApplyDao.FindAssetsByStatus(status);
        }

        /// <summary>
        /// 根据条件检索资产
        /// </summary>
        /// <param name="condition">带有条件的资产对象</param>
        /// <returns>资产列表</returns>
        public IList GetAssetListByCondition(AssetApply_Asset condition)
        {
            return AssetApplyDao.FindAssetsByCondition(condition);
        }

        /// <summary>
        /// 为指定部门申请指定的资产
        /// </summary>
        /// <param name="deptId">部门ID</param>
        /// <param name="astIds">申请的资产ID</param>
        /// <param name="reason">申请原因</param>
        /// <returns></returns>
        public int DoApplyAddInBatch(string deptId, string[] astIds, string reason)
        {
            IList list = AssetApplyDao.FindAssetsByIds(astIds);
            IList listForSave = new ArrayList();

            foreach (AssetApply_Asset o in list)
            {
                AssetApply asset = new AssetApply();

                asset.AplDeptID = deptId;
                asset.AplType = "0001"; //申请类型置为新增
                asset.AssetID = o.AssetID;
                asset.AssetName = o.AssetName;
                asset.AssetModel = o.AssetModel;
                asset.AssetSpec = o.AssetSpec;
                asset.AssetType = o.AssetType;
                asset.AssetSubType = o.AssetSubtype;
                asset.AplAmount = 1;
                asset.AplReason = reason;
                asset.AplStatus = "0001";//申请状态置为已申请

                listForSave.Add(asset);
            }

            return AssetApplyDao.SaveSome(listForSave);
        }

        /// <summary>
        /// 资产新增申请处理
        /// </summary>
        /// <param name="ast">要进行申请的资产对象</param>
        /// <returns></returns>
        public int DoApplyAdd(AssetApply ast)
        {
            ast.AplType = "0001";//申请类型=新增
            ast.AplStatus = "0001";//申请状态=已申请

            return AssetApplyDao.SaveOne(ast);
        }

        /// <summary>
        /// 获取部门资产列表
        /// </summary>
        /// <param name="deptId"></param>
        /// <returns></returns>
        public IList GetDeptAssetList(string deptId)
        {
            return AssetApplyDao.FindAssetsByDeptId(deptId);
        }

        public int DoApplyRepair(string id, string reason)
        {
            AssetApply_Asset ast = AssetApplyDao.FindAssetById(id);

            AssetApply target = new AssetApply();
            target.AssetID = ast.AssetID;
            target.AssetName = ast.AssetName;
            target.AssetModel = ast.AssetModel;
            target.AssetSpec = ast.AssetSpec;
            target.AssetType = ast.AssetType;
            target.AssetSubType = ast.AssetSubtype;
            target.AplDeptID = ast.BelongingDept;
            target.AplAmount = 1;
            target.AplType = "0003"; //申请报修
            target.AplStatus = "0001"; //已申请
            target.AplReason = reason;

            return AssetApplyDao.SaveOne(target);
        }

        public int DoApplyReturn(string id, string reason)
        {
            AssetApply_Asset ast = AssetApplyDao.FindAssetById(id);

            AssetApply target = new AssetApply();
            target.AssetID = ast.AssetID;
            target.AssetName = ast.AssetName;
            target.AssetModel = ast.AssetModel;
            target.AssetSpec = ast.AssetSpec;
            target.AssetType = ast.AssetType;
            target.AssetSubType = ast.AssetSubtype;
            target.AplDeptID = ast.BelongingDept;
            target.AplAmount = 1;
            target.AplType = "0002"; //申请退还
            target.AplStatus = "0001"; //已申请
            target.AplReason = reason;

            return AssetApplyDao.SaveOne(target);
        }

        public int DoApplyDestroy(string id, string reason)
        {
            AssetApply_Asset ast = AssetApplyDao.FindAssetById(id);

            AssetApply target = new AssetApply();
            target.AssetID = ast.AssetID;
            target.AssetName = ast.AssetName;
            target.AssetModel = ast.AssetModel;
            target.AssetSpec = ast.AssetSpec;
            target.AssetType = ast.AssetType;
            target.AssetSubType = ast.AssetSubtype;
            target.AplDeptID = ast.BelongingDept;
            target.AplAmount = 1;
            target.AplType = "0004"; //申请报废
            target.AplStatus = "0001"; //已申请
            target.AplReason = reason;

            return AssetApplyDao.SaveOne(target);
        }

        public string GetUsersDeptId(string userId)
        {
            return AssetApplyDao.GetDeptIdByUserId(userId);
        }

        public IList GetDeptList()
        {
            return DepartDao.FindAll();
        }
    }
}
