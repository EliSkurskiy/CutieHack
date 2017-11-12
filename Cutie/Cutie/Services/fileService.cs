using Amazon.S3;
using Amazon.S3.Transfer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Cutie.Services
{
    public class FileService : IFileService
    {
        public List<string> UploadFiles(HttpFileCollection hfc)
        {
            AmazonS3Client client = new AmazonS3Client("AKIAJF53EJKW7SJUV55Q", "0XXkz0M4+dvAycBCS3tR7K+MFNtw7ZRMeQjN97lQ", Amazon.RegionEndpoint.USWest2);

            TransferUtility fileTransferUtility = new
                TransferUtility(client);


            List<string> myFiles = null;


            for (int i = 0; i <= hfc.Count - 1; i++)
            {
                HttpPostedFile hpf = hfc[i];

 
                TransferUtilityUploadRequest fileTransferUtilityRequest = new TransferUtilityUploadRequest
                {
                    BucketName = "sabio-training",
                    InputStream = hpf.InputStream, 
                    Key = "C40" + "/" + Guid.NewGuid().ToString() + Path.GetFileName(hpf.FileName),

                };

                fileTransferUtility.Upload(fileTransferUtilityRequest);
                Console.WriteLine("Upload completed");


                if (myFiles == null)
                {
                    myFiles = new List<string>();
                }

                myFiles.Add(fileTransferUtilityRequest.Key);


            }

            return myFiles;

        }


    }
}