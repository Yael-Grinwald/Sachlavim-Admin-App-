import { RoutModule } from './rout.module';

describe('RoutModule', () => {
  let routModule: RoutModule;

  beforeEach(() => {
    routModule = new RoutModule();
  });

  it('should create an instance', () => {
    expect(routModule).toBeTruthy();
  });
});
