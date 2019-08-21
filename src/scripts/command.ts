import minimist from 'minimist'

let executor: (params: { msg: string, options?: minimist.ParsedArgs }) => void
let cmdList: Map<string, Function>

export const control = (msg: string) => {
    const func = cmdList.get(msg)
    func ? func(parse(msg)) : executor(parse(msg))
}

export const parse = (msg: string) => {
    const args = msg.split(' ')

    if(args.length > 1) {
        return {
            msg: args.shift()!,
            options: minimist(args)
        }
    }

    return { msg }
}

export const setCmdList = (list: Map<string, Function>) => cmdList = list

export const setExecution = (cb: (params: { msg: string, options?: minimist.ParsedArgs }) => void) => executor = cb