using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Interfaces;

namespace WebApplication.Helpers
{
    public class AppSettings : IAppSettings
    {
        public string Secret { get; set; }
    }
}
