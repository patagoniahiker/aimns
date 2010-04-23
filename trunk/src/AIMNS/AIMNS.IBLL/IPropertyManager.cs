using System.Collections;
using System.Collections.Generic;
using AIMNS.Model;

namespace AIMNS.IBLL
{
    public interface IPropertyManager
    {
        /// <summary>
        /// 创建资产
        /// </summary>
        /// <returns></returns>
        Property NewProperty();

        /// <summary>
        /// 保存资产
        /// </summary>
        /// <param name="propertyAppropriation">资产实体</param>
        /// <returns></returns>
        void SaveProperty(Property property,PropertyAppropriation propertyAppropriation);

        /// <summary>
        /// 获取资产
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        Property GetProperty(string propertyId);

        /// <summary>
        /// 删除资产
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        void DeleteProperty(string propertyId);

        /// <summary>
        /// 更新资产
        /// </summary>
        /// <param name="propertyAppropriation">资产实体</param>
        /// <returns></returns>
        void UpdateProperty(Property property);

        /// <summary>
        /// 获取所有的资产
        /// </summary>
        /// <returns></returns>
        IList GetAll();

        IList GetByCondition(Property property);
    }
}
