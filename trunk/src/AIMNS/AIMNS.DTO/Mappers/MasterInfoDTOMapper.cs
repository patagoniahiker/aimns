using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.DTO.Mappers
{
    public class MasterInfoDTOMapper:BaseDTOMapper
    {
        /// <summary>
        /// Map NHibernate model to DTO
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static MasterInfoDTO MapToDTO(MasterInfo model)
        {
            MasterInfoDTO dto = new MasterInfoDTO();

            dto.InfoCode = model.InfoCode;
            dto.SubinfoCode = model.SubinfoCode;
            dto.SubinfoName = model.SubinfoName;

            return dto;
        }

        /// <summary>
        /// Map DTO to NHibernate model
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public static MasterInfo MapFromDTO(MasterInfoDTO dto)
        {
            MasterInfo model = new MasterInfo();

            model.InfoCode = dto.InfoCode;
            model.SubinfoCode = dto.SubinfoCode;
            model.SubinfoName = dto.SubinfoName;

            return model;
        }
    }
}
