import { v4 as uuid } from "uuid";
import { GetTermbaseTermsEndpointResponse } from "@typings/responses";
import { generateJWT, importFile } from "@tests/helpers";
import { Role } from "@byu-trg/express-user-management";
import { UUID } from "@typings";
import { APP_ROOT } from "@constants";
import testApiClient from "@tests/test-api-client";

const jwt = generateJWT(
  Role.User
);
let mockData: {
  termbaseUUID: UUID,
};

describe("tests GetTerms controller", () => {
  beforeAll(async () => {
    const termbaseUUID = await importFile(
      `${APP_ROOT}/example-tbx/valid-tbx-core.tbx`,
      testApiClient
    );

    mockData = {
      termbaseUUID,
    };
  });

  test("should return a 404 response for invalid uuid (unknown uuid)", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${uuid()}/terms?page=1`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);

    expect(status).toBe(404);
    expect(body.error).toBeDefined();
  });

  test("should return a response with an array of 8 terms", async () => { 
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/terms?page=1`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);
    
    const responseBody = body as GetTermbaseTermsEndpointResponse;

    expect(status).toBe(200);
    expect(responseBody.terms.length).toBe(8);
    expect(responseBody.pagination).toStrictEqual({
      page: 1,
      pageCount: 2,
      perPage: 8,
      totalCount: 13
    });
  });

  test("should return a response with an array of 8 terms", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/terms?page=1`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);
    
    const responseBody = body as GetTermbaseTermsEndpointResponse;

    expect(status).toBe(200);
    expect(responseBody.terms.length).toBe(8);
    expect(responseBody.pagination).toStrictEqual({
      page: 1,
      pageCount: 2,
      perPage: 8,
      totalCount: 13
    });
  });

  test("should return a response with an array of 1 term", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/terms?page=1&language=de`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);    

    const responseBody = body as GetTermbaseTermsEndpointResponse;

    expect(status).toBe(200);
    expect(responseBody.terms.length).toBe(1);
    expect(responseBody.pagination).toStrictEqual({
      page: 1,
      pageCount: 1,
      perPage: 8,
      totalCount: 1
    });
  });

  test("should return a response with an array of 1 term", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/terms?page=1&term=base`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);

    const responseBody = body as GetTermbaseTermsEndpointResponse;

    expect(status).toBe(200);
    expect(responseBody.terms.length).toBe(2);
    expect(responseBody.pagination).toStrictEqual({
      page: 1,
      pageCount: 1,
      perPage: 8,
      totalCount: 2
    });
  });

  test("should return a response with an array of 1 term", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/terms?page=1&part_of_speech=verb`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);
    
    const responseBody = body as GetTermbaseTermsEndpointResponse;

    expect(status).toBe(200);
    expect(responseBody.terms.length).toBe(1);
    expect(responseBody.pagination).toStrictEqual({
      page: 1,
      pageCount: 1,
      perPage: 8,
      totalCount: 1
    });
  });

  test("should return a response with an array of 1 term", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/terms?page=1&customer=IBM`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);

    const responseBody = body as GetTermbaseTermsEndpointResponse;

    expect(status).toBe(200);
    expect(responseBody.terms.length).toBe(1);
    expect(responseBody.pagination).toStrictEqual({
      page: 1,
      pageCount: 1,
      perPage: 8,
      totalCount: 1
    });
  });

  test("should return a response with an array of 1 term", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/terms?page=1&concept_id=c1`)
      .set("Cookie", [`TRG_AUTH_TOKEN=${jwt}`]);

    const responseBody = body as GetTermbaseTermsEndpointResponse;

    expect(status).toBe(200);
    expect(responseBody.terms.length).toBe(1);
    expect(responseBody.pagination).toStrictEqual({
      page: 1,
      pageCount: 1,
      perPage: 8,
      totalCount: 1
    });
  });
});

