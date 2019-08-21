import minimist from 'minimist'

export const parseCommand = (msg: string) => {
    const args = msg.split(' ')

    if(args.length > 1) {
        msg = args.shift()!
        console.log(args)
        const commands = minimist(args)
        console.log(commands)
    }

    return msg
}