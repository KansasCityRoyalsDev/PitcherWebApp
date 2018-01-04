import { RoyalsPitcherAppPage } from './app.po';

describe('royals-pitcher-app App', function() {
  let page: RoyalsPitcherAppPage;

  beforeEach(() => {
    page = new RoyalsPitcherAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
