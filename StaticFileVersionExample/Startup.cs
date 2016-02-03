using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(StaticFileVersionExample.Startup))]
namespace StaticFileVersionExample
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
