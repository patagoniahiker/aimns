using System.Collections;
using AIMNS.Model;
namespace AIMNS.IDAL
{
    public interface IDepartmentDao
    {
        Department FindById(string  departmentId);
        void Delete(Department  department);
        Department Save(Department  department);
        Department SaveOrUpdate(Department department);
        IList FindAll();
        IList GetByCondition(Department department);
    }
}
