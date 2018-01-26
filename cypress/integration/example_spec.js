beforeEach(() => {
  cy.server()
  cy.route('/todos', []).as('getTodos')

  cy.visit('localhost:3000')
  cy.wait('@getTodos')

  // cy.request({
  //   method: 'POST',
  //   url: '/reset',
  //   body: {
  //     todos: []
  //   }
  // })
  cy.window().then(win => {
    win.Math.random = () => '333'
  })
})

it('loads', () => {
  cy.get('.new-todo').should('be.visible').type('Hi Slalom{enter}')
  cy.get('.todo').should('have.length', 1)

  const getStore = () => cy.window().its('app.$store')

  cy.get('.new-todo').type('Test with Cypress')
  getStore().its('state').should('deep.equal', {
    loading: false,
    newTodo: 'Test with Cypress',
    todos: [
      {
        completed: false,
        id: 3,
        title: 'Hi Slalom'
      }
    ]
  })
})
