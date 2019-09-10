import { createHash } from "crypto";
import axios from "axios";

export default {
  plugin: {
    name: "MyPlugin",
    version: "1.0.0",
    register: function(server, options) {
      const { path = "/saved-search", parseSearchParams, apiUrl } = options;

      server.route({
        method: "GET",
        path,
        handler: (request, h) => {
          return h.response({});
        }
      });

      server.route({
        method: "POST",
        path,
        handler: async (request, h) => {
          const hash = createHash("SHA1");
          const searchParams = parseSearchParams(request);

          hash.update(JSON.stringify(searchParams));
          searchParams.hash = hash.digest("hex");

          try {
            const apiResponse = await axios.post(apiUrl, {
              data: searchParams
            });
            return h.response(apiResponse.data);
          } catch (e) {
            return Promise.reject(e);
          }
        }
      });
    }
  }
};
