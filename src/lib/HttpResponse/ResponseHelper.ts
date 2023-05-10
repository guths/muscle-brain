import { Response } from "express";
import Logger from "../Logger/Logger";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { STATUS_CODES } from "http";
export default class ResponseHelper {
  public static ok(response: Response, data: any): Response<any> {
    const successResponse = ResponseHelper.messageFactory(
      "success",
      StatusCodes.OK,
      ReasonPhrases.OK,
      data
    );
    return ResponseHelper.returnSuccessResponse(response, successResponse);
  }

  public static created(response: Response, data: any): Response<any> {
    const successResponse = ResponseHelper.messageFactory(
      "success",
      StatusCodes.CREATED,
      ReasonPhrases.CREATED,
      data
    );
    return ResponseHelper.returnSuccessResponse(response, successResponse);
  }

  public static deleted(response: Response): Response<any> {
    const successResponse = ResponseHelper.messageFactory(
      "success",
      StatusCodes.OK,
      ReasonPhrases.OK,
      null
    );
    return ResponseHelper.returnSuccessResponse(response, successResponse);
  }

  public static noContent(response: Response): Response<any> {
    const successResponse = ResponseHelper.messageFactory(
      "success",
      StatusCodes.NO_CONTENT,
      ReasonPhrases.NO_CONTENT,
      null
    );
    return ResponseHelper.returnSuccessResponse(response, successResponse);
  }

  public static unprocessableEntity(
    response: Response,
    message: string
  ): Response<any> {
    const errorResponse = ResponseHelper.messageFactory(
      "failed",
      StatusCodes.UNPROCESSABLE_ENTITY,
      ReasonPhrases.UNPROCESSABLE_ENTITY,
      {
        reason: message,
      }
    );

    return ResponseHelper.returnErrorResponse(response, errorResponse);
  }

  public static conflit(response: Response, message: string): Response<any> {
    const errorResponse = ResponseHelper.messageFactory(
      "failed",
      StatusCodes.CONFLICT,
      ReasonPhrases.CONFLICT,
      {
        reason: message,
      }
    );

    return ResponseHelper.returnErrorResponse(response, errorResponse);
  }

  private static returnSuccessResponse(response, successResponse: any) {
    Logger.info("API Reponse Success", successResponse);
    return response.status(successResponse.code).send(successResponse);
  }

  private static returnErrorResponse(response, errorResponse: any) {
    Logger.warning("API Response Error", errorResponse);
    return response.status(errorResponse.code).send(errorResponse);
  }

  private static messageFactory(
    status: string,
    code: number,
    name: string,
    data: Object | null
  ) {
    return {
      status: status,
      code,
      name,
      data,
    };
  }
}
