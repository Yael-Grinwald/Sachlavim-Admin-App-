import { HebrewDatePipe } from './hebrew-date.pipe';

describe('HebrewDatePipe', () => {
  it('create an instance', () => {
    const pipe = new HebrewDatePipe();
    expect(pipe).toBeTruthy();
  });
});
