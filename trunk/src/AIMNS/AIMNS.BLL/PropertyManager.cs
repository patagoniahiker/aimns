using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

using AIMNS.IBLL;
using AIMNS.IDAL;
using AIMNS.Model;

namespace AIMNS.BLL
{
    public class PropertyManager:IPropertyManager 
    {
        public IPropertyAppropriationDao PropertyAppropriationDao { get; set; }
        public IPropertyDao PropertyDao { get; set; }

        /// <summary>
        /// 创建资产
        /// </summary>
        /// <returns></returns>
        public Property NewProperty()
        {
            var property = new Property();
            return property;
        }

        /// <summary>
        /// 保存资产
        /// </summary>
        /// <param name="property">资产实体</param>
        /// <returns></returns>
        public void SaveProperty(Property property,PropertyAppropriation propertyAppropriation)
        {
            PropertyDao.SaveOrUpdate(property);
            PropertyAppropriationDao.Save(propertyAppropriation);
        }

        /// <summary>
        /// 获取资产
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        public Property GetProperty(string propertyId)
        {
            return PropertyDao.FindById(propertyId);
        }

        /// <summary>
        /// 删除资产
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        public void DeleteProperty(string propertyId)
        {
            var property = GetProperty(propertyId);
            PropertyDao.Delete(property);
        }

        /// <summary>
        /// 更新资产
        /// </summary>
        /// <param name="property">资产实体</param>
        /// <returns></returns>
        public void UpdateProperty(Property property)
        {
            PropertyDao.SaveOrUpdate(property);
        }

        /// <summary>
        /// 获取所有的资产
        /// </summary>
        /// <returns></returns>
        public IList GetAll()
        {
            return PropertyDao.FindAll();
        }

        private void Validate(Property property)
        {
            //TODO throw exception on error.
        }

        public IList GetByCondition(Property property)
        {
            return PropertyDao.GetByCondition(property);
        }
    }
}
