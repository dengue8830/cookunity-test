import { Context, controller, HttpResponseInternalServerError, IAppController } from "@foal/core";
import { OpenApiController } from "./controllers/openApi.controller";
import { ApiController } from "./controllers";

export class AppController implements IAppController {
  subControllers = [controller("/api", ApiController), controller("/swagger", OpenApiController)];

  handleError(error: Error, ctx: Context) {
    return new HttpResponseInternalServerError({
      code: "unexpected-error",
      message: error.message || "Ups! something went wrong",
    });
  }
}
