import { createInterface } from "readline"
import chalk from 'chalk'
import figlet from 'figlet'

const clear = '\u001B[2J\u001B[0;0f'
const ui = createInterface(process.stdin, process.stdout)

let header: string
export let question: string

export const ask = (msg: string):Promise<string> => {
    question = msg
    return new Promise((resolve, reject) => ui.question(`${clear}${header}${chalk.bold(msg)}\n`, answer => resolve(answer)))
}

export const notice = (msg: string) => {
    ui.write(chalk.bgCyan(`${msg}\n`))
}

export const splash = (title: string) => {
    return new Promise((resolve, reject) => figlet(title, (err, data) => {
        if (err) {
            console.dir('Something went wrong...', err)
            reject()
        }

        header = data ? `${chalk.cyan(data)}\n\n` : ''
        ui.write(`${clear}${header}`)
        resolve()
    }))
}