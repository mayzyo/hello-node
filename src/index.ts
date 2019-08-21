import minimist from "minimist"
import ConfigStore from 'configstore'
import { splash, update } from "./scripts/interface"
import { control, setExecution, setCmdList } from "./scripts/command"

enum Control {
    EXIT = 'exit',
    CLEAR = 'clear',
}

const config = new ConfigStore('hello-node')
let memory: string[] = config.get('memory') || []

setExecution((params: { msg: string, options?: minimist.ParsedArgs }) => {
    if(params.options && params.options['r']) {
        const index = memory.indexOf(params.msg)
        index != -1 && memory.splice(index, 1)
    } else {
        console.log('test', memory)
        memory.push(params.msg)
    }

    update(`Items: ${memory.join(' | ')}`).then(res => control(res))
})

setCmdList(
    new Map<string, Function>([
        [Control.EXIT, () => {
            config.set('memory', memory)
            process.exit()
        }],
        [Control.CLEAR, () => {
            memory = []
            update(`Items: ${memory.join(' | ')}`).then(res => control(res))
        }]
    ])
)

splash('Hello Node', `Controls: ${Control.EXIT} | ${Control.CLEAR} |`, `Items: ${memory.join(' | ')}`)
.then(res => control(res))