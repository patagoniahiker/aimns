using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.DTO.Mappers
{
    public class AssetApply_AssetDTOMapper:BaseDTOMapper
    {
        /// <summary>
        /// 从NHibernate Model对象到DTO的映射
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static AssetApply_AssetDTO MapToDTO(AssetApply_Asset model)
        {
            AssetApply_AssetDTO dto = new AssetApply_AssetDTO();

            dto.AssetID = model.AssetID;
            dto.AssetName = model.AssetName;
            dto.AssetModel = model.AssetModel;
            dto.AssetSpec = model.AssetSpec;
            dto.AssetCls = model.AssetCls;
            dto.AssetStatus = model.AssetStatus;
            dto.BelongingDept = model.BelongingDept;
            dto.User = model.User;

            return dto;
        }

        /// <summary>
        /// 从DTO到NHibernate Model对象的映射
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public static AssetApply_Asset MapFromDTO(AssetApply_AssetDTO dto)
        {
            AssetApply_Asset model = new AssetApply_Asset();

            model.AssetID = dto.AssetID;
            model.AssetName = dto.AssetName;
            model.AssetModel = dto.AssetModel;
            model.AssetSpec = dto.AssetSpec;
            model.AssetCls = dto.AssetCls;
            model.AssetStatus = dto.AssetStatus;
            model.BelongingDept = dto.BelongingDept;
            model.User = dto.User;

            return model;
        }
    }
}
