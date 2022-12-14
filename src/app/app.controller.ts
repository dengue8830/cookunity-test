import { Context, controller, HttpResponseInternalServerError, IAppController } from "@foal/core";
import { OpenApiController } from "./controllers/open-api.controller";
import { ApiController } from "./controllers/api.controller";

export class AppController implements IAppController {
  subControllers = [controller("/api", ApiController), controller("/swagger", OpenApiController)];

  handleError(error: Error, ctx: Context) {
    return new HttpResponseInternalServerError({
      code: "unexpected-error",
      message: error.message || "Ups! something went wrong",
    });
  }
}
