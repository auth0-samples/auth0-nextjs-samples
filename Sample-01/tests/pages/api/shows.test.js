/**
 * @jest-environment node
 */

import { GET as shows } from '../../../app/api/shows/route';

const req = jest.fn();
const res = (() => {
  const mock = {};
  mock.status = jest.fn().mockReturnValue(mock);
  mock.json = jest.fn().mockReturnValue(mock);
  return mock;
})();

describe('/api/shows', () => {
  afterAll(() => {
    delete global.fetch;
  });

  it('should call the external API', async () => {
    global.fetch = jest.fn().mockReturnValue({ json: () => Promise.resolve({ msg: 'Text' }) });

    const res = await shows(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ msg: 'Text' });
  });

  it('should fail when the external API call fails', async () => {
    global.fetch = jest.fn().mockReturnValue({ json: () => Promise.reject(new Error('Error')) });

    const res = await shows(req);

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: 'Error' });
  });
});
