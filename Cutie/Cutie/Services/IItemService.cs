using Cutie.Models;
using System.Collections.Generic;

namespace Cutie.Services
{
    public interface IItemService
    {
        int Add(ItemAddRequest model);
        List<Item> Get();
    }
}