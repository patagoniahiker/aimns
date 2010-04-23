using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IBLL
{
    public interface IPropertyAppropriationManager
    {
        /// <summary>
        /// 创建资产调拨
        /// </summary>
        /// <returns></returns>
        PropertyAppropriation NewPropertyAppropriation();

        /// <summary>
        /// 保存资产调拨
        /// </summary>
        /// <param name="propertyAppropriation">资产调拨实体</param>
        /// <returns></returns>
        void SavePropertyAppropriation(PropertyAppropriation propertyAppropriation);

        /// <summary>
        /// 获取资产调拨
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        PropertyAppropriation GetPropertyAppropriation(string propertyId);

        /// <summary>
        /// 删除资产调拨
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        void DeletePropertyAppropriation(string propertyId);

        /// <summary>
        /// 更新资产调拨
        /// </summary>
        /// <param name="propertyAppropriation">资产调拨实体</param>
        /// <returns></returns>
        PropertyAppropriation UpdatePropertyAppropriation(PropertyAppropriation propertyAppropriation);

        /// <summary>
        /// 获取所有的资产调拨
        /// </summary>
        /// <returns></returns>
        IList GetAll();

        IList GetByCondition(PropertyAppropriation propertyAppropriation);
    }
}
