import { isFloat } from './index';

describe('Application utils tests', () => {
  it('should verify function, isFloat', () => {
    let input = [
      '23.23',
      '23.00',
      '.23',
      '23.asdf23',
      '23.23000',
      '23...23',
      '23...2.3',
      '23.'
    ];

    let expectation = [true, true, true, false, true, false, false, false];
    expect(input.map(item => isFloat(item))).toEqual(expectation);
  });
});
