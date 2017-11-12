using Cutie.Models;
using Cutie.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WikiWebStarter.Web.Models.Responses;

namespace Cutie.Controllers
{
    [RoutePrefix("api/items")]
    public class ItemsApiController : ApiController
    {
        private IItemService _itemService;
        

        public ItemsApiController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [Route(), HttpPost]
        public HttpResponseMessage AddItem(ItemAddRequest model)
        {

            HttpStatusCode code = HttpStatusCode.OK;
            ItemResponse<int> response = new ItemResponse<int>();


            if (!ModelState.IsValid)
            {
                code = HttpStatusCode.BadRequest;
                return Request.CreateErrorResponse(code, ModelState);
            }
            else
            {
                response.Item = _itemService.Add(model);
            }

            return Request.CreateResponse(code, response);
        }

        [Route(),HttpGet]
        public HttpResponseMessage GetItems()
        {

            HttpStatusCode code = HttpStatusCode.OK;
            ItemsResponse<Item> response = new ItemsResponse<Item>();
            response.Items = _itemService.Get();

            if (response.Items == null)
            {
                code = HttpStatusCode.BadRequest;
                response.IsSuccessful = false;
            }
            return Request.CreateResponse(code, response);
        }


    }
}
