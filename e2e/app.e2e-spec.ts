import { InfluexpinterfacePage } from './app.po';

describe('influexpinterface App', function() {
  let page: InfluexpinterfacePage;

  beforeEach(() => {
    page = new InfluexpinterfacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
