import configStore from 'configstore'
import { splash } from "./scripts/interface"
import { newUser } from "./questions/user-info"
import { greeter } from "./questions/portal"

const store = new configStore('hello-node')

splash('Hello Node').then(() => {
    const username = store.get('username')

    if(username) {
        greeter(username)
    } else {
        newUser(store)
    }    
})