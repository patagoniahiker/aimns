using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;
namespace AIMNS.DTO.Mappers
{
    public class DepartmentDTOMapper : BaseDTOMapper
    {
        public static DepartmentDTO MapToDTO(Department model)
        {
            DepartmentDTO  dto = new DepartmentDTO();
            dto.DepartmentID = model.DepartmentID;
            dto.DepartmentName = model.DepartmentName;
            dto.ParentDepartmentId = model.ParentDepartment ==null?null:model.ParentDepartment.DepartmentID;
            dto.ParentDepartmentName = model.ParentDepartment==null?null:model.ParentDepartment.DepartmentName;
            dto.ManagerId = model.Manager==null?null:model.Manager.UserID;
            dto.ManagerName = model.Manager == null ? null : model.Manager.UserName;
            return dto;
        }

        public static Department MapFromDTO(DepartmentDTO dto)
        {
            Department Department = new Department();
            Department.DepartmentID = dto.DepartmentID;
            Department.DepartmentName = dto.DepartmentName;
            Department.Manager = dto.ManagerId  == null ? null : ManagerFactory.UserManager.GetUser (dto.ManagerId );
            Department.ParentDepartment = dto.ParentDepartmentId == null ? null : ManagerFactory.DepartmentManager.GetDepartment(dto.ParentDepartmentId);
            Department.CreateTime = DateTime.Now;
            return Department;
        }
    }
}
