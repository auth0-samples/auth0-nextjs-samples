/**
 * @jest-environment node
 */

import shows from '../../../pages/api/shows';

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

    await shows(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Text' });
  });

  it('should fail when the external API call fails', async () => {
    global.fetch = jest.fn().mockReturnValue({ json: () => Promise.reject(new Error('Error')) });

    await shows(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
  });
});
