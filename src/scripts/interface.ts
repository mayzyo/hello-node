import { createInterface } from "readline"
import chalk from 'chalk'

const ascii = require('ascii-text-generator')

const clear = '\u001B[2J\u001B[0;0f'
const ui = createInterface(process.stdin, process.stdout)

let banner: string

export const splash = (title: string, subtitle?: string, msg?: string):Promise<string> => {
    banner = chalk.cyan(`${ascii(title,"2")}\n${subtitle ? subtitle : ''}`)
    return update(msg || '')
}

export const notice = (msg: string) => {
    ui.write(chalk.bgCyan(`${msg}\n`))
}

export const update = (msg: string):Promise<string> => {
    return new Promise((resolve, reject) => 
        ui.question(`${clear}${banner}\n${msg}\n\n`, answer => resolve(answer))
    )
}