using Cutie.Models;
using MyVehicleRepairServiceNeeds.TowApp.Web.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Cutie.Services
{
    public class ItemService : BaseService, IItemService
    {

        public int Add(ItemAddRequest model)
        {
            int id = 0;

            Action<SqlParameterCollection> inputParamDelegate = delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Title", model.Title);
                paramCollection.AddWithValue("@Description", model.Description);
                paramCollection.AddWithValue("@Name", model.Name);
                paramCollection.AddWithValue("@Email", model.Email);
                paramCollection.AddWithValue("@PhoneNo", model.PhoneNo);
                paramCollection.AddWithValue("@Location", model.Location);
                paramCollection.AddWithValue("@UserId", 1);
                paramCollection.AddWithValue("@Tag", model.Tag);
                paramCollection.AddWithValue("@Lat", model.Lat);
                paramCollection.AddWithValue("@Lng", model.Lng);


                SqlParameter outParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                outParameter.Direction = System.Data.ParameterDirection.Output;

                paramCollection.Add(outParameter);
            };

            Action<SqlParameterCollection> returnParamDelegate = delegate (SqlParameterCollection paramCollection)
            {
                Int32.TryParse(paramCollection["@Id"].Value.ToString(), out id);
            };

            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Items_Insert", inputParamDelegate, returnParamDelegate);
            return id;

        }


        public List<Item> Get()
        {
            List<Item> list = null;

            Action<IDataReader, short> singleRecMapper = delegate (IDataReader reader, short set)
            {
                Item ItemInfo = MapItemInfo(reader);

                if (list == null)
                {
                    list = new List<Item>();
                }
                list.Add(ItemInfo);
            };

            Action<SqlParameterCollection> inputParamDelegate = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.Items_SelectAll", inputParamDelegate, singleRecMapper);
            return list;
        }

        public static Item MapItemInfo(IDataReader reader)
        {
            Item itemInformation = new Item();
            int startingIndex = 0;
            itemInformation.Id = reader.GetInt32(startingIndex++);
            itemInformation.Title = reader.GetString(startingIndex++);
            itemInformation.Description = reader.GetString(startingIndex++);
            itemInformation.Name = reader.GetString(startingIndex++);
            itemInformation.Email = reader.GetString(startingIndex++);
            itemInformation.PhoneNo = reader.GetString(startingIndex++);
            itemInformation.Location = reader.GetString(startingIndex++);
            itemInformation.Photo = reader.GetString(startingIndex++);
            itemInformation.UserId = reader.GetInt32(startingIndex++);
            itemInformation.Tag = reader.GetString(startingIndex++);
            itemInformation.Lat = reader.GetDouble(startingIndex++);
            itemInformation.Lng = reader.GetDouble(startingIndex++);
            return itemInformation;
        }


    }
}