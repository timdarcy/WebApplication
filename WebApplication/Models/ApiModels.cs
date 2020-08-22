using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace WebApplication.Models.ApiModels
{
    public class Login
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
    public class Register
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class Update
    {
    }

    public class ServiceResponse<T>
    {
        public T Data { get; set; }
        public List<Error> Errors {get;set;}
        public bool HasError => Errors.Any();

    }

    public class ErrorResponse : ServiceResponse<string>
    {
        public ErrorResponse(List<Error> errors)
        {
            Errors = errors;
        }
    }

    public class Error
    {
        public Error(string message)
        {
            Message = message;
        }

        public string Message { get; set; }
    }


}
