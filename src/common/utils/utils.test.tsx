import { getMaxWidth } from './utils';

const MIN_CARD_WIDTH = 70;
const MAX_CARD_WIDTH = 90;
const WINDOW_SIZE_CUT_OFF = 800;

describe('getMaxWidth', () => {
  it(`returns ${MAX_CARD_WIDTH} if windowWidth is less than ${WINDOW_SIZE_CUT_OFF}`, () => {
    const maxCardWidth = getMaxWidth(WINDOW_SIZE_CUT_OFF - 1, MAX_CARD_WIDTH, MIN_CARD_WIDTH, WINDOW_SIZE_CUT_OFF);
    expect(maxCardWidth).toBe(MAX_CARD_WIDTH);
  });

  it(`return ${MIN_CARD_WIDTH} if windowWidth is greater than or equal to ${WINDOW_SIZE_CUT_OFF}`, () => {
    const maxCardWidth = getMaxWidth(WINDOW_SIZE_CUT_OFF, MAX_CARD_WIDTH, MIN_CARD_WIDTH, WINDOW_SIZE_CUT_OFF);
    expect(maxCardWidth).toBe(MIN_CARD_WIDTH);
  });
});
