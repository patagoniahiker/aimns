using AIMNS.Model;

namespace AIMNS.IBLL
{
    /// <summary>
    /// 公司管理
    /// </summary>
    public interface ICompanyManager
    {
        /// <summary>
        /// 创建一个公司(返回包含默认值)
        /// </summary>
        /// <returns></returns>
        Company NewCompany();

        /// <summary>
        /// 保存公司
        /// </summary>
        /// <param name="Company">公司实体</param>
        /// <returns></returns>
        Company SaveCompany(Company Company);


        /// <summary>
        /// 获取公司
        /// </summary>
        /// <param name="CompanyId">公司ID</param>
        /// <returns></returns>
        Company GetCompany(string CompanyId);


        /// <summary>
        /// 删除公司
        /// </summary>
        /// <param name="CompanyId">公司ID</param>
        /// <returns></returns>
        void DeleteCompany(string CompanyId);


        /// <summary>
        /// 更新公司
        /// </summary>
        /// <param name="Company">公司实体</param>
        /// <returns></returns>
        Company UpdateCompany(Company Company);
    }
}
