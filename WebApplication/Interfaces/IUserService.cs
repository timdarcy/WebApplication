using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Enums;
using WebApplication.Models.DataModels;

namespace WebApplication.Interfaces
{
    public interface IUserService
    {
        User GetUser(string email, string password);

        UserStatus CreateUser(User user, string password);
    }
}
