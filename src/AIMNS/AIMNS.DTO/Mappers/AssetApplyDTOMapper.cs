using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;
using AIMNS.IBLL;

namespace AIMNS.DTO.Mappers
{
    /// <summary>
    /// 资产申请的DTO映射类
    /// 实现Hibernate实体类与DTO之间的转换
    /// </summary>
    public class AssetApplyDTOMapper:BaseDTOMapper
    {
        /// <summary>
        /// Convert Model to DTO
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static AssetApplyDTO MapToDTO(AssetApply model)
        {
            AssetApplyDTO dto = new AssetApplyDTO();

            IList statusList = ManagerFactory.AssetApplyManager.GetAplStatusList();
            foreach (MasterInfo s in statusList)
            {
                dto.StatusSet.Add(s.SubinfoCode, s.SubinfoName);
            }

            IList typeList = ManagerFactory.AssetApplyManager.GetAplTypeList();
            foreach (MasterInfo t in typeList)
            {
                dto.AplTypeSet.Add(t.SubinfoCode, t.SubinfoName);
            }

            IList deptList = ManagerFactory.AssetApplyManager.GetDeptList();
            foreach (Department d in deptList)
            {
                dto.DeptSet.Add(d.DepartmentID, d.DepartmentName);
            }

            dto.AplNo = model.AplNo;
            dto.AplDeptID = model.AplDeptID;
            dto.AplDeptName = dto.DeptSet[dto.AplDeptID];
            dto.AplType = model.AplType;
            dto.AplTypeName = dto.AplTypeSet[dto.AplType];
            dto.AssetID = model.AssetID;
            dto.AssetName = model.AssetName;
            dto.AssetModel = model.AssetModel;
            dto.AssetSpec = model.AssetSpec;
            dto.AssetType = model.AssetType;
            dto.AssetTypeName = model.AssetType;
            dto.AssetSubType = model.AssetSubType;
            dto.AssetSubTypeName = model.AssetSubType;
            dto.AplAmount = model.AplAmount;
            dto.AplStatusCode = model.AplStatus;
            dto.AplStatus = dto.StatusSet[dto.AplStatusCode];
            dto.AplReason = model.AplReason;

            return dto;
        }

        /// <summary>
        /// Convert DTO to Model
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public static AssetApply MapFromDTO(AssetApplyDTO dto)
        {
            AssetApply model = new AssetApply();

            model.AplNo = dto.AplNo;
            model.AplDeptID = dto.AplDeptID;
            model.AplType = dto.AplType;
            model.AssetID = dto.AssetID;
            model.AssetName = dto.AssetName;
            model.AssetModel = dto.AssetModel;
            model.AssetSpec = dto.AssetSpec;
            model.AssetType = dto.AssetType;
            model.AssetSubType = dto.AssetSubType;
            model.AplAmount = dto.AplAmount;
            model.AplStatus = dto.AplStatus;
            model.AplReason = dto.AplReason;

            return model;
        }
    }
}
