using System.Collections.Generic;
using System.Web;

namespace Cutie.Services
{
    public interface IFileService
    {
        List<string> UploadFiles(HttpFileCollection hfc);
    }
}