using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IDAL
{
    public interface IPropertyDao
    {
        Property FindById(string propertyId);
        void Delete(Property property);
        void Update(Property property);
        Property Save(Property property);
        Property SaveOrUpdate(Property property);
        IList FindAll();
        IList GetByCondition(Property property);
    }
}
