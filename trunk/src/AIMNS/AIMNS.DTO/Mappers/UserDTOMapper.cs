using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.DTO.Mappers
{
    public class UserDTOMapper:BaseDTOMapper
    {
        public static UserDTO MapToDTO(User  model )
        {
            UserDTO dto = new UserDTO();
            dto.UserID = model.UserID;
            dto.UserName = model.UserName;
            dto.DepartmentID = model.Department == null ? "" : model.Department.DepartmentID;
            dto.DepartmentName = model.Department == null ? "" : model.Department.DepartmentName;
            dto.RoleId = model.Role == null ? "" : model.Role.RoleId;
            dto.RoleName = model.Role == null ? "" : model.Role.RoleName;
            return dto;
        }
        public static User MapFromDTO(UserDTO dto)
        {
            User user = new User();
            user.UserID = dto.UserID;
            user.UserName = dto.UserName;
            user.Department = dto.DepartmentID == null? null:ManagerFactory.DepartmentManager.GetDepartment(dto.DepartmentID);
            user.Role = dto.RoleId == null ? null : ManagerFactory.RoleManager.GetRole(dto.RoleId);
            return user;
        }
    }
}
 