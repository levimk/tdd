import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "tdd",
      region: "ap-southeast-2",
      stage: "dev",
      profile: "kowa-learning"
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new AstroSite(stack, "site");
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
