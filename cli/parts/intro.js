const chalk = require('chalk')
const figlet = require('figlet')

export function run () {
  console.log(
    chalk.green(
      figlet.textSync('Welcome!')
    )
  )
  console.log(
    chalk.green(
      figlet.textSync('lok-ui-devkit')
    )
  )
}

export function seeYa () {
  console.log(
    chalk.green(
      figlet.textSync('See Ya!')
    )
  )
}
