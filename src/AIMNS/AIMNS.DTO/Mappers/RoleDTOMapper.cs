using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AIMNS.Model;

namespace AIMNS.DTO.Mappers
{
    public class RoleDTOMapper:BaseDTOMapper
    {
        public static RoleDTO MapToDTO(Role  model )
        {
            RoleDTO dto = new RoleDTO();
            dto.RoleId = model.RoleId;
            dto.RoleName = model.RoleName;
            return dto;
        }
        public static Role MapFromDTO(RoleDTO dto)
        {
            Role Role = new Role();
            Role.RoleId = dto.RoleId;
            Role.RoleName = dto.RoleName;
            return Role;
        }
    }
}
 