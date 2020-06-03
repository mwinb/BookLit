export interface MockResponse {
  body: any;
}
export const mockErrorResponse: MockResponse = { body: { code: 500, error: 'Failed to successfully complete' } };
export const mockSuccessResponse = (body: any): MockResponse => {
  return {
    body: body,
  };
};
