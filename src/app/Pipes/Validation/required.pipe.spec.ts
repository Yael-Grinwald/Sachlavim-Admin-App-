import { RequiredPipe } from './required.pipe';

describe('RequiredPipe', () => {
  it('create an instance', () => {
    const pipe = new RequiredPipe();
    expect(pipe).toBeTruthy();
  });
});
