using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IDAL
{
    public interface IPropertyAppropriationDao
    {
        PropertyAppropriation FindById(string propertyId);
        void Delete(PropertyAppropriation propertyAppropriation);
        void Save(PropertyAppropriation propertyAppropriation);
        PropertyAppropriation SaveOrUpdate(PropertyAppropriation propertyAppropriation);
        IList FindAll();
        IList GetByCondition(PropertyAppropriation propertyAppropriation);
    }
}
