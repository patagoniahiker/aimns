using System;

using NUnit.Framework;
using Spring.Testing.NUnit;
using AIMNS.Model;
using AIMNS.IBLL;

namespace AIMNS.UnitTest
{
    [TestFixture]
    public  class UserManagerTest :AbstractTransactionalDbProviderSpringContextTests
    {
        protected override string[] ConfigLocations
        {
            get
            {
                return new String[] { "objects.xml" };
            }
        }
        protected IUserManager UserManager
        {
            get
            {
                return applicationContext.GetObject("UserManagerTrans") as IUserManager;
            }
        }

        [Test]
        public void SaveUserTest()
        {
            User user = UserManager.NewUser();
            user.UserID = "buyer0p";
            user.Password = "admin";
            user.UserName = "刘翔";
            UserManager.SaveUser(user);
            transactionManager.Commit(transactionStatus);
        }
    }
}
