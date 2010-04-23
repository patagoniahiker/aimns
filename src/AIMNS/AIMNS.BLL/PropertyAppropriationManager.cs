using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

using AIMNS.IBLL;
using AIMNS.IDAL;
using AIMNS.Model;

namespace AIMNS.BLL
{
    public class PropertyAppropriationManager:IPropertyAppropriationManager 
    {

        public IPropertyAppropriationDao PropertyAppropriationDao { get; set; }

        /// <summary>
        /// 创建资产调拨
        /// </summary>
        /// <returns></returns>
        public PropertyAppropriation NewPropertyAppropriation()
        {
            var propertyAppropriation = new PropertyAppropriation();
            return propertyAppropriation;
        }

        /// <summary>
        /// 保存资产调拨
        /// </summary>
        /// <param name="propertyAppropriation">资产调拨实体</param>
        /// <returns></returns>
        public void SavePropertyAppropriation(PropertyAppropriation propertyAppropriation)
        {
            PropertyAppropriationDao.Save(propertyAppropriation);
        }

        /// <summary>
        /// 获取资产调拨
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        public PropertyAppropriation GetPropertyAppropriation(string propertyId)
        {
            return PropertyAppropriationDao.FindById(propertyId);
        }

        /// <summary>
        /// 删除资产调拨
        /// </summary>
        /// <param name="propertyId">资产ID</param>
        /// <returns></returns>
        public void DeletePropertyAppropriation(string propertyId)
        {
            var propertyAppropriation = GetPropertyAppropriation(propertyId);
            PropertyAppropriationDao.Delete(propertyAppropriation);
        }

        /// <summary>
        /// 更新资产调拨
        /// </summary>
        /// <param name="propertyAppropriation">资产调拨实体</param>
        /// <returns></returns>
        public PropertyAppropriation UpdatePropertyAppropriation(PropertyAppropriation propertyAppropriation)
        {
            return PropertyAppropriationDao.SaveOrUpdate(propertyAppropriation);
        }



        /// <summary>
        /// 获取所有的资产调拨
        /// </summary>
        /// <returns></returns>
        public IList GetAll()
        {
            return PropertyAppropriationDao.FindAll();
        }

        private void Validate(PropertyAppropriation propertyAppropriation)
        {
            //TODO throw exception on error.
        }

        public IList GetByCondition(PropertyAppropriation propertyAppropriation)
        {
            return PropertyAppropriationDao.GetByCondition(propertyAppropriation);
        }
    }
}
