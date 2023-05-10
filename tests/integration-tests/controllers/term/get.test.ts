import { v4 as uuid } from "uuid";
import { GetTermEndpointResponse } from "@typings/responses";
import { fetchMockTermbaseData, importTBXFile } from "@tests/helpers";
import { UUID } from "@typings";
import testApiClient,  { TEST_API_CLIENT_COOKIES } from "@tests/test-api-client";

let mockData: {
  termbaseUUID: UUID,
  termUUID: UUID,
};

describe("tests GetTerm controller", () => {
  beforeAll(async () => {
    const termbaseUUID = await importTBXFile();

    const { termUUID } = await fetchMockTermbaseData(
      termbaseUUID,
      testApiClient,
    );

    mockData = {
      termbaseUUID,
      termUUID,
    };
  });

  test("should return a 404 response for invalid uuid (unknown uuid)", async () => {
    
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/term/${uuid()}`)
      .set("Cookie", TEST_API_CLIENT_COOKIES);
   
    expect(status).toBe(404);
    expect(body.error).toBeDefined();
  });


  test("should return a 404 response for invalid uuid (malformed uuid)", async () => {
    const { status, body } = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/term/randommmm`)
      .set("Cookie", TEST_API_CLIENT_COOKIES);

    expect(status).toBe(404);
    expect(body.error).toBeDefined();
  });

  test("should return a successful response", async () => {
    const termResponse = await testApiClient
      .get(`/termbase/${mockData.termbaseUUID}/term/${mockData.termUUID}`)
      .set("Cookie", TEST_API_CLIENT_COOKIES) as
      { status: number; body: GetTermEndpointResponse};

    expect(termResponse.status).toBe(200);
    expect(termResponse.body.uuid).toBeDefined();
    expect(termResponse.body.id).toBeDefined();
    expect(termResponse.body.value).toBeDefined();
    expect(termResponse.body.language).toBeDefined();
    expect(termResponse.body.termSecId).toBeDefined();
    expect(termResponse.body.termbaseUUID).toBeDefined();
    expect(termResponse.body.synonyms).toBeDefined();
    expect(termResponse.body.conceptId).toBeDefined();
    expect(termResponse.body.translations).toBeDefined();
    expect(termResponse.body.customers).toBeDefined();
    expect(termResponse.body.partOfSpeech).toBeDefined();
    expect(termResponse.body.approvalStatus).toBeDefined();
    expect(termResponse.body.subjectField).toBeDefined();
    expect(termResponse.body.conceptEntry).toBeDefined();
    expect(termResponse.body.languageSection).toBeDefined();
    expect(termResponse.body.auxElements).toBeDefined();
    expect(termResponse.body.termNotes).toBeDefined();
  });
});