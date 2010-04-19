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
            dto.ManagerID = model.Manager == null ? "" : model.Manager.UserID;
            dto.ManagerName = model.Manager == null ? "" : model.Manager.UserName;
            dto.Mobile = model.Mobile;
            dto.Telephone = model.Telephone;
            dto.ValidFrom = model.ValidFrom;
            dto.ValidTo = model.ValidTo;
            dto.CompanyID = model.Company == null ? "" : model.Company.CompanyID;
            dto.CompanyName = model.Company == null ? "" : model.Company.FullName;
            dto.DepartmentID = model.Department == null ? "" : model.Department.DepartmentID;
            dto.DepartmentName = model.Department == null ? "" : model.Department.DepartmentName;
            dto.Email = model.Email;
            return dto;
        }
        public static User MapFromDTO(UserDTO dto)
        {
            User user = new User();
            user.UserID = dto.UserID;
            user.UserName = dto.UserName;
            user.Manager = dto.ManagerID == null?null:ManagerFactory.UserManager.GetUser(dto.ManagerID);
            user.Mobile = dto.Mobile;
            user.Telephone = dto.Telephone;
            user.ValidFrom = dto.ValidFrom;
            user.ValidTo = dto.ValidTo;
            user.Company = dto.CompanyID == null?null:ManagerFactory.CompanyManager.GetCompany(dto.CompanyID);
            user.Department = dto.DepartmentID == null? null:ManagerFactory.DepartmentManager.GetDepartment(dto.DepartmentID);
            user.Email = dto.Email;
            user.CreateTime = DateTime.Now;
            return user;
        }
    }
}
 