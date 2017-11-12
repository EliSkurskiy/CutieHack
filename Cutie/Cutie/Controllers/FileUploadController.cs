using Cutie.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Cutie.Controllers
{
    [RoutePrefix("api/files")]
    public class FileUploadController : ApiController
    {

        private IFileService _fileService;


        public FileUploadController(IFileService fileService)
        {
 
            _fileService = fileService;
        }


        [Route("missing/items"), HttpPost()]
        public HttpResponseMessage UploadFiles()
        {
            HttpFileCollection hfc = HttpContext.Current.Request.Files;


            HttpStatusCode code = HttpStatusCode.OK;

       

            List<string> files  = _fileService.UploadFiles(hfc);

            // make association here


            if (files == null)
            {
                code = HttpStatusCode.BadRequest;
                
            }

            return Request.CreateResponse(code, files);

        }

    }
}
