﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AIMNS.IBLL;


namespace AIMNS.DTO
{
    public sealed class AllManagerFactory
    {
        public IUserManager UserManager { get; set; }
        public ICompanyManager CompanyManager { get; set; }
        public IDepartmentManager DepartmentManager { get; set; }
        public IAssetApplyManager AssetApplyManager { get; set; }
        public IAssetAcceptManager AssetAcceptManager { get; set; }
        public IPropertyAppropriationManager PropertyAppropriationManager { get; set; }
        public IRoleManager RoleManager { get; set; }
        public IPropertyManager PropertyManager { get; set; }
    }
}
