import { fetchMockTermNote, importFile } from "@tests/helpers";
import { PatchTermNoteEndpointResponse } from "@typings/responses";
import { TermNote, UUID } from "@typings";
import { VALID_LANGUAGE_CODE } from "@tests/constants";
import { SuperAgentResponse } from "@tests/types";
import { APP_ROOT } from "@constants";
import testApiClient from "@tests/test-api-client";
import { TEST_AUTH_TOKEN } from "@tests/constants";

const endpointConstructor = (
  termbaseUUID: UUID,
  termNoteUUID: UUID,
) => `/termbase/${termbaseUUID}/termNote/${termNoteUUID}`;
let mockData: {
  termbaseUUID: UUID,
  termNote: TermNote,
};

describe("tests PatchTermNote controller", () => {
  beforeAll(async () => {
    const termbaseUUID = await importFile(
      `${APP_ROOT}/example-tbx/valid-tbx-core.tbx`,
      testApiClient
    );

    const termNote = await fetchMockTermNote(
      termbaseUUID,
      testApiClient
    );

    mockData = {
      termbaseUUID,
      termNote,
    };
  });

  test("should return a 200 response for successful patch of term note", async () => {
    const { status, body} = await testApiClient
      .patch(
        endpointConstructor(
          mockData.termbaseUUID,
          mockData.termNote.uuid
        )
      )
      .set("Cookie", [`TRG_AUTH_TOKEN=${TEST_AUTH_TOKEN}`])
      .field({
        id: "Test",
        type: "Test",
        value: "Test",
        grpId: "Test1",
        datatype: "Test",
        langCode: VALID_LANGUAGE_CODE,
        order: 100,
      }) as SuperAgentResponse<PatchTermNoteEndpointResponse>;
  
    expect(status).toBe(200);
    expect(body.type).toBe("Test");
    expect(body.value).toBe("Test");
    expect(body.xmlLang).toBe(VALID_LANGUAGE_CODE);
    expect(body.order).toBe(100);
  });
});