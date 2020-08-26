using WebApplication.Enums;
using WebApplication.Models.DataModels;

namespace WebApplication.Interfaces
{
    public interface IUserService
    {
        User GetUser(string email, string password);

        UserStatus CreateUser(User user, string password);

        User GetUserById(int id);
    }
}
