describe('basic formatting', () => {
  const editorSelector = '.richText-editor';
  const commandSelector = command => `a[data-command="${command}"]`;

  const typeWithCommand = (command, text) => {
      cy.get(commandSelector(command)).click();
      cy.get(editorSelector).type(text);
  };

  beforeEach(() => {
    cy.visit('/examples/index.html');
    cy.get(editorSelector).focus();
  });

  it('has correct init state', () => {
    cy.get(editorSelector).should('have.html', '<div><br></div>');
  });

  it('writes text unstyled by default', () => {
    cy.get(editorSelector).type('hello world');
    cy.get(editorSelector).should('have.html', '<div>hello world</div>');
  });

  it('can write text in bold', () => {
    typeWithCommand('bold', 'hello world');
    cy.get(editorSelector).should('have.html', '<div><b>hello world</b></div>');
  });

  it('can write text in italic', () => {
    typeWithCommand('italic', 'hello world');
    cy.get(editorSelector).should('have.html', '<div><i>hello world</i></div>');
  });

  it('can write text in underline', () => {
    typeWithCommand('underline', 'hello world');
    cy.get(editorSelector).should('have.html', '<div><u>hello world</u></div>');
  });

  it('can write text left-aligned', () => {
    cy.get(editorSelector).type('hello world');
    cy.get(commandSelector('justifyRight')).click();
    cy.get(commandSelector('justifyLeft')).click();
    cy.get(editorSelector).should('have.html', '<div style="text-align: left;">hello world</div>');
  });

  it('can write text center-aligned', () => {
    cy.get(editorSelector).type('hello world');
    cy.get(commandSelector('justifyCenter')).click();
    cy.get(editorSelector).should('have.html', '<div style="text-align: center;">hello world</div>');
  });

  it('can write text right-aligned', () => {
    cy.get(editorSelector).type('hello world');
    cy.get(commandSelector('justifyRight')).click();
    cy.get(editorSelector).should('have.html', '<div style="text-align: right;">hello world</div>');
  });

  it('can write text fully-aligned', () => {
    cy.get(editorSelector).type('hello world');
    cy.get(commandSelector('justifyFull')).click();
    cy.get(editorSelector).should('have.html', '<div style="text-align: justify;">hello world</div>');
  });

  it('can write ordered lists', () => {
    typeWithCommand('insertOrderedList', 'hello world');
    cy
      .get(editorSelector)
      .should('have.html', '<div><ol><li>hello world</li></ol></div>')
      .type('{enter}')
      .type('hello world2')
      .get(editorSelector)
      .should('have.html', '<div><ol><li>hello world</li><li>hello world2</li></ol></div>');
  });

  it('can write unorderd lists', () => {
    typeWithCommand('insertUnorderedList', 'hello world');
    cy
      .get(editorSelector)
      .should('have.html', '<div><ul><li>hello world</li></ul></div>')
      .type('{enter}')
      .type('hello world2')
      .get(editorSelector)
      .should('have.html', '<div><ul><li>hello world</li><li>hello world2</li></ul></div>');
  });

  /**
   * TODO: add more tests for:
   * - links
   * - images
   * - headings
   * - code
   * - font size
   * - font family
   * - font color
   * - background color
   * - files
   * - videos
   * - tables
   * - remove format
   */
});