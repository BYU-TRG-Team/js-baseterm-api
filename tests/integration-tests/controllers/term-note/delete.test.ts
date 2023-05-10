import { fetchMockTermNote, importTBXFile } from "@tests/helpers";
import { UUID } from "@typings";
import testApiClient from "@tests/test-api-client";
import { TEST_API_CLIENT_COOKIES } from "@tests/constants";

const endpointConstructor = (
  termbaseUUID: UUID,
  termNoteUUID: UUID,
) => `/termbase/${termbaseUUID}/termNote/${termNoteUUID}`;
let mockData: {
  termbaseUUID: UUID,
  termNoteUUID: UUID,
};

describe("tests DeleteTermNote controller", () => {
  beforeAll(async () => {
    const termbaseUUID = await importTBXFile();

    const termNote = await fetchMockTermNote(
      termbaseUUID,
      testApiClient,
    );

    mockData = {
      termbaseUUID,
      termNoteUUID: termNote.uuid
    };
  });

  test("should return a successful response and produce a 404 when requesting the term note", async () => {
    const { status: deleteTermNoteStatus } = await testApiClient
      .delete(
        endpointConstructor(
          mockData.termbaseUUID,
          mockData.termNoteUUID
        )
      )
      .set("Cookie", TEST_API_CLIENT_COOKIES);
	
    expect(deleteTermNoteStatus).toBe(204);
	
    const { status: getTermNoteStatus } = await testApiClient
      .get(
        endpointConstructor(
          mockData.termbaseUUID,
          mockData.termNoteUUID
        )
      )
      .set("Cookie", TEST_API_CLIENT_COOKIES);
	
    expect(getTermNoteStatus).toBe(404);
  });
});