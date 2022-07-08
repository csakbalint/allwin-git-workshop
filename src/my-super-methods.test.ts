import { double, sum, reverse, plot, multiply } from './my-super-methods';

describe('my-super-methods', () => {
  describe('double', () => {
    it('should calculate 2 + 2', () => expect(double(2)).toEqual(4));

    it('should calculate 5 + 5', () => expect(double(5)).toEqual(10));
  });

  describe('multiply', () => {
    it('should work without parameters', () => expect(multiply()).toEqual(0));

    it('should calculate 2 * 2', () => expect(multiply(2, 2)).toEqual(4));

    it('should calculate 3 * 3 * 3 * 3', () => expect(multiply(3, 3, 3, 3)).toEqual(81));
  });

  describe('sum', () => {
    it('should sum 1, 2, 3', () => expect(sum(1, 2, 3)).toEqual(6));

    it('should sum 1', () => expect(sum(1)).toEqual(1));

    it('should sum 1, 2, 3, 4, 5, 6', () => expect(sum(1, 2, 3, 4, 5, 6)).toEqual(21));
  });

  describe('reverse', () => {
    it('should reverse [1, 2, 3, 4, 5]', () =>
      expect(reverse([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]));

    it('should reverse "őlüytüfnáfzér"', () =>
      expect(reverse('őlüytüfnáfzér')).toEqual('rézfánfütyülő'));
  });

  describe('plot', () => {
    let consoleLog: jest.SpyInstance;
    beforeEach(() => {
      consoleLog = jest.spyOn(global.console, 'log').mockImplementation();
    });

    afterEach(() => jest.clearAllMocks());

    it('should call console.log with "plot(\'sum(1,2,3) =\', sum(1, 2, 3))"', () => {
      plot('sum(1,2,3) =', sum(1, 2, 3));
      expect(consoleLog).toBeCalledWith('"sum(1,2,3) = 6"');
    });

    it('should call console.log with "plot(\'reverse([1,2,3,4,5]) =\', reverse([1, 2, 3, 4, 5]));"', () => {
      plot('reverse([1,2,3,4,5]) =', reverse([1, 2, 3, 4, 5]));
      expect(console.log).toBeCalledWith('"reverse([1,2,3,4,5]) = 5,4,3,2,1"');
    });
  });
});
