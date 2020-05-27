using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DynamicDBConsole
{
    class Program
    {
        AmazonDynamoDBClient _dynamoDbClient;
        const string tableName = "VerbsTable";

        Program()
        {
            var awsAccessKeyId = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
            var awsSecretAccessKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
            var awsRegion = Environment.GetEnvironmentVariable("AWS_REGION");
            _dynamoDbClient = new AmazonDynamoDBClient(awsAccessKeyId, awsSecretAccessKey, RegionEndpoint.GetBySystemName(awsRegion));
        }

        static async System.Threading.Tasks.Task Main(string[] args)
        {
            var program = new Program();
            bool initialAction = false;
            if (initialAction)
            {
                // Create the table
                await program.CreateTmpTableAsync();

                // Fill the table with data
                var serializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy()
                    }
                };
                var verbsString = File.ReadAllText("allVerbsForm.json");
                var verbs = JsonConvert.DeserializeObject<List<JsonDTO>>(verbsString, serializerSettings);
                verbs = verbs.Where(s => s.TenseKey.Contains("presentIndicative")
                || s.TenseKey == "gerund"
                || s.TenseKey == "pastParticiple").Take(10).ToList();


                foreach (var verb in verbs)
                {
                    _ = program.AddItem(verb);
                }
            }
            else
            {
                // Get random verb
                try
                {
                    _ = await program.GetRandomVerb();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            Console.WriteLine("Done");
            Console.ReadLine();
        }
        public async Task<string> GetRandomVerb()
        {
            var randomRangeKey = Guid.NewGuid().ToString();
            var request = new QueryRequest();
            request.IndexName = "RandomVerbIndex";
            request.TableName = tableName;
            request.Limit = 1;
            request.KeyConditionExpression = @"Division=:div AND Id > :id";
            var exprAttrValues = new Dictionary<string, AttributeValue>();
            exprAttrValues.Add(":div", new AttributeValue("Verbs"));
            exprAttrValues.Add(":id", new AttributeValue(randomRangeKey));
            request.ExpressionAttributeValues = exprAttrValues;
            //var startKey = new Dictionary<string, AttributeValue>();
            //startKey.Add("Id", new AttributeValue() { S = randomRangeKey });
            //request.ExclusiveStartKey = startKey ;

            var response = await _dynamoDbClient.QueryAsync(request);
            return response.ToString();
        }

        #region CreatetmpTable
        private async System.Threading.Tasks.Task CreateTmpTableAsync()
        {
            Console.WriteLine("Creating table");
            var request = new CreateTableRequest
            {
                AttributeDefinitions = new List<AttributeDefinition>
                {
                    new AttributeDefinition
                    {
                        AttributeName = "Id",
                        AttributeType = "S"
                    },
                    new AttributeDefinition
                    {
                        AttributeName = "Division",
                        AttributeType = "S"
                    }
                },
                KeySchema = new List<KeySchemaElement>
                {
                    new KeySchemaElement
                    {
                        AttributeName = "Id",
                        KeyType = "HASH" // Partition Key
                    }/*,
                    new KeySchemaElement
                    {
                        AttributeName = "Id",
                        KeyType = "Range" // Sort Key
                    }*/
                },
                GlobalSecondaryIndexes = new List<GlobalSecondaryIndex>
                {
                     new GlobalSecondaryIndex()
                     {
                         IndexName = "RandomVerbIndex",
                         KeySchema = new List<KeySchemaElement>
                         {
                             new KeySchemaElement
                            {
                                AttributeName = "Division",
                                KeyType = "HASH" // Partition Key
                            },
                            new KeySchemaElement
                            {
                                AttributeName = "Id",
                                KeyType = "Range" // Sort Key
                            }
                         },
                         Projection = new Projection()
                         {
                             ProjectionType = ProjectionType.ALL
                         },
                         ProvisionedThroughput = new ProvisionedThroughput
                         {
                            ReadCapacityUnits = 1,
                            WriteCapacityUnits = 1
                         }
                     },
                     //new GlobalSecondaryIndex()
                     //{
                     //    IndexName = "RegAnsweredIndex",
                     //    KeySchema = new List<KeySchemaElement>
                     //    {
                     //        new KeySchemaElement
                     //       {
                     //           AttributeName = "Division",
                     //           KeyType = "HASH" // Partition Key
                     //       },
                     //       new KeySchemaElement
                     //       {
                     //           AttributeName = "Id",
                     //           KeyType = "Range" // Sort Key
                     //       }
                     //    },
                     //    Projection = new Projection()
                     //    {
                     //        ProjectionType = ProjectionType.ALL
                     //    },
                     //    ProvisionedThroughput = new ProvisionedThroughput
                     //    {
                     //       ReadCapacityUnits = 1,
                     //       WriteCapacityUnits = 1
                     //    }
                     //}
                },
                ProvisionedThroughput = new ProvisionedThroughput
                {
                    ReadCapacityUnits = 1,
                    WriteCapacityUnits = 1
                },
                TableName = tableName
            };

            var response = await _dynamoDbClient.CreateTableAsync(request);
            SerializeAndSave(response, "CreateTableResponse.json");

            WaitUntilTableReady(tableName);
        }

        public void WaitUntilTableReady(string tableName)
        {
            string status = null;

            do
            {
                try
                {
                    var res = _dynamoDbClient.DescribeTableAsync(new DescribeTableRequest
                    {
                        TableName = tableName
                    });

                    status = res.Result.Table.TableStatus;
                    SerializeAndSave(res.Result, string.Format("DescribeTable_{0}.json", status));
                }
                catch (ResourceNotFoundException)
                {
                    Console.WriteLine("The temp table is not ready yet.");
                    continue;
                }
                if (status != "ACTIVE") Thread.Sleep(5000);
                Console.WriteLine("The temp table status is '{0}'", status);
            } while (status != "ACTIVE");
            {
                Console.WriteLine("Table Created Successfully");
            }
        }
        #endregion
        private static void SerializeAndSave(object objectToSave, string fname)
        {
            var resultString = JsonConvert.SerializeObject(objectToSave);
            File.WriteAllText(fname, resultString, Encoding.UTF8);
        }

        #region Put
        //private async Task AddItem(Guid id, string word)
        private async Task AddItem(JsonDTO verb)
        {
            var id = Guid.NewGuid();
            var queryRequest = RequestBuilder(id, verb);
            _ = await _dynamoDbClient.PutItemAsync(queryRequest);
        }
        private PutItemRequest RequestBuilder(Guid id, JsonDTO verb)
        {
            var item = new Dictionary<string, AttributeValue>
            {
                {"Division", new AttributeValue {S = "Verbs"}},
                {"Id", new AttributeValue {S = id.ToString()}}
            };
            // Transfer all properti values
            foreach (var property in verb.GetType().GetProperties())
            {
                var attrValue = new AttributeValue();
                var valueValue = property.GetValue(verb);
                if (valueValue is null) continue;
                if (property.PropertyType == typeof(string))
                {
                    attrValue.S = valueValue.ToString();
                }
                else
                if (property.PropertyType == typeof(bool))
                {
                    attrValue.BOOL = (bool)valueValue;
                }
                else if (property.PropertyType == typeof(int)
                    || property.PropertyType == typeof(float)
                    || property.PropertyType == typeof(double)
                    || property.PropertyType == typeof(long))
                {
                    attrValue.N = valueValue.ToString();
                }
                else
                {
                    throw new ArgumentException($"Type is not supported: '{property.PropertyType.ToString()}'");
                }
                item.Add(property.Name, attrValue);
            }

            return new PutItemRequest
            {
                TableName = tableName,
                Item = item
            };
        }
        #endregion
    }
}
