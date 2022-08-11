import * as propsData from '@/data/props';

describe('propsData', () => {
  describe('alert', () => {
    it('should match snapshot', () => {
      expect(propsData.alert).toMatchSnapshot();
    });
  });
});
