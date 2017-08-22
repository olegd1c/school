import { SchoolPage } from './app.po';

describe('school App', () => {
  let page: SchoolPage;

  beforeEach(() => {
    page = new SchoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
