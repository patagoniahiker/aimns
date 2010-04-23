using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.DTO.Mappers
{
    public class PropertyDTOMapper:BaseDTOMapper 
    {
        public static PropertyDTO MapToDTO(Property model)
        {
            PropertyDTO dto = new PropertyDTO();
            dto.ast_id = model.ast_id;
            dto.ast_name = model.ast_name;
            dto.ast_model = model.ast_model;
            dto.ast_std = model.ast_std;
            dto.DepartmentID = model.Department == null ? "" : model.Department.DepartmentID;
            dto.DepartmentName = model.Department == null ? "" : model.Department.DepartmentName;
            dto.ast_user = model.ast_user;
            dto.ast_class1 = model.ast_class1;
            dto.ast_class2 = model.ast_class2;
            dto.ast_state = model.ast_state;
            dto.ast_diff = model.ast_diff;
            dto.ast_fa_id = model.ast_fa_id;
            dto.ast_buy_date = model.ast_buy_date.ToString();
            dto.ast_supplier = model.ast_supplier;
            return dto;
        }
        public static Property MapFromDTO(PropertyDTO dto)
        {
            Property property = new Property();
            property.ast_id = dto.ast_id;
            property.ast_name = dto.ast_name;
            property.ast_model = dto.ast_model;
            property.ast_std = dto.ast_std;
            property.Department = dto.DepartmentID == null ? null : ManagerFactory.DepartmentManager.GetDepartment(dto.DepartmentID);
            property.ast_user = dto.ast_user;
            property.ast_class1 = dto.ast_class1;
            property.ast_class2 = dto.ast_class2;
            property.ast_state = dto.ast_state;
            property.ast_diff = dto.ast_diff;
            property.ast_fa_id = dto.ast_fa_id;
            //property.ast_buy_date = DateTime.Parse(dto.ast_buy_date);
            property.ast_supplier = dto.ast_supplier;
            return property; 
        }
    }
}
