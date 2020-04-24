using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.LambdaJsonSerializer))]

namespace LambdaConjugacion
{
    public class Function
    {
        
        /// <summary>
        /// Return an object.
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public object FunctionHandler(ILambdaContext context)
        {
            var result = Data.TenRandomVerbs(null);
            return result;
        }
    }
}
