using System.Collections;
using AIMNS.Model;

namespace AIMNS.IDAL
{
    public interface ICompanyDao
    {
        Company FindById(string  companyId);
        void Delete(Company  company);
        Company Save(Company company);
        Company SaveOrUpdate(Company  company);

    }
}
