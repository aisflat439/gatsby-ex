import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda.handler",
      },
    });

    const site = new sst.StaticSite(this, "StaticSite", {
      path: "frontend",
      errorPage: "404.html",
      indexPage: "index.html",
      buildOutput: "public",
      buildCommand: "npm run build",
      s3Bucket: {
        publicReadAccess: true,
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      SiteUrl: site.url,
      ApiEndpoint: api.url,
    });
  }
}
