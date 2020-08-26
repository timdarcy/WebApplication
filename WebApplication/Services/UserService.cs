using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebApplication.Data;
using WebApplication.Enums;
using WebApplication.Interfaces;
using WebApplication.Models.DataModels;

namespace WebApplication.Services
{
    public class UserService : IUserService
    {
        private ApplicationDbContext _context;
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public User GetUser(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            var user = _context.User.FirstOrDefault(entry => email.Equals(entry.Email));

            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            return user;
        }

        public UserStatus CreateUser(User user, string password)
        {
            if (_context.User.Any(entry => entry.Email.Equals(user.Email)))
            {
                return UserStatus.UserExists;
            }

            byte[] hash, salt;
            CreatePasswordHash(password, out hash, out salt);

            user.PasswordHash = hash;
            user.PasswordSalt = salt;

            _context.User.Add(user);
            _context.SaveChanges();
            
            return UserStatus.UserCreated;
        }

        public User GetUserById(int id)
        {
            return _context.User.Find(id); 
        }

        private static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be null or whitespace", "password");
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");
            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash);
            }
        }
    }
}
