import configStore from 'configstore'
import { ask, notice } from "../scripts/interface"
import { greeter } from "./portal"

export const newUser = async (store: configStore) => {
    let res = await ask('Greetings! what should I call you?')

    if(res.length != 0) {
        store.set('username', res)
        greeter(res)
    } else {
        notice('Type in what you want to say and press Enter please')
        newUser(store)
    }
}