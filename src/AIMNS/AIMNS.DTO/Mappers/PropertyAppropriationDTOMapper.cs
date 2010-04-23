using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.DTO.Mappers
{
    public class PropertyAppropriationDTOMapper:BaseDTOMapper 
    {
        public static PropertyAppropriationDTO MapToDTO(PropertyAppropriation model)
        {
            PropertyAppropriationDTO dto = new PropertyAppropriationDTO();
            dto.ast_main_id = model.ast_main_id;
            dto.ast_id = model.ast_id;
            dto.DepartmentID = model.Department == null ? "" : model.Department.DepartmentID;
            dto.DepartmentName = model.Department == null ? "" : model.Department.DepartmentName;
            dto.ast_from_user = model.ast_from_user;
            dto.ast_fit_date = model.ast_fit_date.ToString("yyyy/MM/dd");
            dto.ast_fit_reason = model.ast_fit_reason;
            return dto;
        }
        public static PropertyAppropriation MapFromDTO(PropertyAppropriationDTO dto)
        {
            PropertyAppropriation propertyAppropriation = new PropertyAppropriation();
            propertyAppropriation.ast_main_id = dto.ast_main_id;
            propertyAppropriation.ast_id  = dto.ast_id ;
            propertyAppropriation.Department = dto.DepartmentID == null ? null : ManagerFactory.DepartmentManager.GetDepartment(dto.DepartmentID);
            propertyAppropriation.ast_from_user = dto.ast_from_user;
            if (dto.ast_fit_date != "")
            {
                propertyAppropriation.ast_fit_date = DateTime.Parse(dto.ast_fit_date);
            }
            propertyAppropriation.ast_fit_reason = dto.ast_fit_reason;
            return propertyAppropriation;
        }
    }
}
