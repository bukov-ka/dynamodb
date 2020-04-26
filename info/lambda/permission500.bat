aws lambda add-permission --function-name arn:aws:lambda:eu-west-3:908478757030:function:GetRandomVerbs --source-arn arn:aws:execute-api:eu-west-3:908478757030:pt1vedqzte/* --principal apigateway.amazonaws.com --statement-id statement-id-guid --action lambda:InvokeFunction
rem aws lambda add-permission --function-name arn:aws:lambda:eu-west-3:908478757030:function:GetRandomVerbs --source-arn arn:aws:execute-api:eu-west-3:908478757030:pt1vedqzte/*/GET/lambdasv1 --principal apigateway.amazonaws.com --statement-id statement-id-guid --action lambda:InvokeFunction
rem aws lambda add-permission --function-name arn:aws:lambda:us-east-1:youraccount-id:function:yourlambdafunction --source-arn arn:aws:execute-api:us-east-1:youraccount-id:api-id/*/GET/lambdasv1 --principal apigateway.amazonaws.com --statement-id statement-id-guid --action lambda:InvokeFunction


