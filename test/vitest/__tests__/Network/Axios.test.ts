import { expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import configureAxiosService from 'src/services/ConfigureAxiosService';

it('when initialized, form is in expected (initial) state', async () => {
  const sut = configureAxiosService().invoke();
  const mock = new MockAdapter(sut);

  mock.onGet('https://any.url').reply(400, null);

  try {
    await sut.get('https://any.url');
  } catch {
    expect(true).toBe(false);
  }
});
