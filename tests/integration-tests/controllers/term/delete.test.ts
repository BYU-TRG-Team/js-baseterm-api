import { fetchMockTermbaseData, importFile } from "@tests/helpers";
import { UUID } from "@typings";
import { Role } from "@byu-trg/express-user-management";
import { APP_ROOT } from "@constants";
import testApiClient from "@tests/test-api-client";
import { TEST_AUTH_TOKEN } from "@tests/constants";

const endpointConstructor = (
  termbaseUUID: UUID,
  termUUID: UUID,
) => `/termbase/${termbaseUUID}/term/${termUUID}`;
let mockData: {
  termbaseUUID: UUID,
  termUUID: UUID,
};

describe("tests DeleteTerm controller", () => {
  beforeAll(async () => {
    const termbaseUUID = await importFile(
      `${APP_ROOT}/example-tbx/valid-tbx-core.tbx`,
      testApiClient
    );

    const {
      termUUID
    } = await fetchMockTermbaseData(
      termbaseUUID,
      testApiClient,
    );

    mockData = {
      termbaseUUID,
      termUUID,
    };
  });

  test("should return a successful response and produce a 404 when requesting the term", async () => {
    const { status: deleteTermStatus } = await testApiClient
      .delete(
        endpointConstructor(
          mockData.termbaseUUID,
          mockData.termUUID
        )
      )
      .set("Cookie", [`TRG_AUTH_TOKEN=${TEST_AUTH_TOKEN}`]);
	
    expect(deleteTermStatus).toBe(204);
	
    const { status: getTermStatus } = await testApiClient
      .get(
        endpointConstructor(
          mockData.termbaseUUID,
          mockData.termUUID
        )
      )
      .set("Cookie", [`TRG_AUTH_TOKEN=${TEST_AUTH_TOKEN}`]);
	
    expect(getTermStatus).toBe(404);
  });
});