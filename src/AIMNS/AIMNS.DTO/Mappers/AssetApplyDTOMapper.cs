using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.DTO.Mappers
{
    /// <summary>
    /// 资产申请的DTO映射类
    /// 实现Hibernate实体类与DTO之间的转换
    /// </summary>
    public class AssetApplyDTOMapper:BaseDTOMapper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static AssetApplyDTO MapToDTO(AssetApply model)
        {
            AssetApplyDTO dto = new AssetApplyDTO();

            dto.AplNo = model.AplNo;
            dto.AplDeptID = model.AplDeptID;
            dto.AplType = model.AplType;
            dto.AplTypeName = model.AplType;
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
            dto.AplStatus = model.AplStatus;
            dto.AplReason = model.AplReason;

            return dto;
        }
    }
}
