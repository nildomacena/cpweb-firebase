import { CpwebFirebasePage } from './app.po';

describe('cpweb-firebase App', function() {
  let page: CpwebFirebasePage;

  beforeEach(() => {
    page = new CpwebFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
