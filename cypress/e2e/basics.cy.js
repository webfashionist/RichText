describe('basic formatting', () => {
  const editorSelector = '.richText-editor';
  const commandSelector = (command, options) => {
    const selector = `a[data-command="${command}"]`;
    if (options) {
      return `${selector}[data-option="${options}"]`;
    }
    return selector;
  };

  const typeWithCommand = (command, text, options) => {
      cy.get(commandSelector(command, options)).click();
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

  it('can remove formatting', () => {
      // check bold
    typeWithCommand('bold', 'hello world');
    cy.get(editorSelector).should('have.html', '<div><b>hello world</b></div>');
    cy.get(editorSelector).type('{selectall}');
    cy.get(commandSelector('removeFormat')).click();
    cy.get(editorSelector).should('have.html', '<div>hello world</div>');
    // check italic
    cy.get(editorSelector).type('{selectall}');
    typeWithCommand('italic', 'hello world');
    cy.get(editorSelector).should('have.html', '<div><i>hello world</i></div>');
    cy.get(editorSelector).type('{selectall}');
    cy.get(commandSelector('removeFormat')).click();
    cy.get(editorSelector).should('have.html', '<div>hello world</div>');
  });

  it('can write text with font-size', () => {
    for (let n = 24; n >= 12; n -= 2) {
      cy.get(editorSelector).type('{selectall}');
      cy.get(commandSelector('removeFormat')).click();
      cy.get(editorSelector).type(`hello world ${n}`);
      cy.get(editorSelector).type('{selectall}');
      const buttonSelector = cy.get(`.fa-text-height`).parent(`a`);
      buttonSelector.click(); // open dropdown
      // check if dropdown is open
      buttonSelector.children(`.richText-dropdown-outer`).should('be.visible');

      cy.get(`a[data-command="fontSize"][data-option="${n}"]`).click();
      cy
          .get(editorSelector)
          .should('include.html', `<div><span style="font-size:${n}px;">hello world ${n}</span></div>`)
          .type('{enter}');
    }
  });

  it('can write text with font-family', () => {
    const fontNames = [
        'Arial',
        'Arial Black',
        'Comic Sans MS',
        'Courier New',
        'Geneva',
        'Georgia',
        'Helvetica',
        'Impact',
        'Lucida Console',
        'Tahoma',
        'Times New Roman',
        'Verdana'
    ];

    for (const fontName of fontNames) {
      cy.get(editorSelector).type('{selectall}');
      cy.get(commandSelector('removeFormat')).click();
      cy.get(editorSelector).type(`hello world ${fontName}`);
      cy.get(editorSelector).type('{selectall}');
      const buttonSelector = cy.get(`.fa-font`).parent(`a`);
      buttonSelector.click(); // open dropdown
      // check if dropdown is open
      buttonSelector.children(`.richText-dropdown-outer`).should('be.visible');

      cy.get(`a[data-command="fontName"][data-option="${fontName}"]`).click();
      cy
          .get(editorSelector)
          .should('include.html', `<div><font face="${fontName}">hello world ${fontName}</font></div>`)
          .type('{enter}');
    }
  });

  it('can write text with font color', () => {
    const fontColors = [
        '#FFFFFF',
        '#000000',
        '#7F6000',
        '#938953',
        '#1F497D',
        '#4F81BD',
        '#953734',
        '#4F6128',
        '#3F3151',
        '#31859B',
        '#4BACC6',
        '#E36C09',
        '#F79646',
        '#FFFF00'
    ];

    for (const fontColor of fontColors) {
        cy.get(editorSelector).type('{selectall}');
        cy.get(commandSelector('removeFormat')).click();
        cy.get(editorSelector).type(`hello world ${fontColor}`);
        cy.get(editorSelector).type('{selectall}');
        const buttonSelector = cy.get(`.fa-pencil`).parent(`a`);
        buttonSelector.click(); // open dropdown
        // check if dropdown is open
        buttonSelector.children(`.richText-dropdown-outer`).should('be.visible');

        cy.get(`a[data-command="forecolor"][data-option="${fontColor}"]`).click();
        cy
            .get(editorSelector)
            .should('include.html', `<div><font color="${fontColor.toLowerCase()}">hello world ${fontColor}</font></div>`)
            .type('{enter}');
    }
  });

    it('can write text with background color', () => {
        const backgroundColors = [
            '#FFFFFF',
            '#000000',
            '#7F6000',
            '#938953',
            '#1F497D',
            'blue',
            '#4F81BD',
            '#953734',
            'red',
            '#4F6128',
            'green',
            '#3F3151',
            '#31859B',
            '#4BACC6',
            '#E36C09',
            '#F79646',
            '#FFFF00'
        ];

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        for (const backgroundColor of backgroundColors) {
            cy.get(editorSelector).type('{selectall}');
            cy.get(commandSelector('removeFormat')).click();
            cy.get(editorSelector).type(`hello world ${backgroundColor}`);
            cy.get(editorSelector).type('{selectall}');
            const buttonSelector = cy.get(`.fa-paint-brush`).parent(`a`);
            buttonSelector.click(); // open dropdown
            // check if dropdown is open
            buttonSelector.children(`.richText-dropdown-outer`).should('be.visible');

            const matchingBackgroundColor = backgroundColor.startsWith('#') ? `rgb(${hexToRgb(backgroundColor).r}, ${hexToRgb(backgroundColor).g}, ${hexToRgb(backgroundColor).b})` : backgroundColor;

            cy.get(`a[data-command="hiliteColor"][data-option="${backgroundColor}"]`).click();
            cy
                .get(editorSelector)
                .should('include.html', `<div><span style="background-color: ${matchingBackgroundColor};">hello world ${backgroundColor}</span></div>`)
                .type('{enter}');
        }
    });

  /**
   * TODO: add more tests for:
   * - links
   * - images
   * - headings
   * - code
   * - files
   * - videos
   * - tables
   */
});
