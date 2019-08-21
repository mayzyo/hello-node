import { ask, notice } from "../scripts/interface"

export const greeter = async (username: string) => {
    let res = await ask(`How was your day ${username}?`)

    if(res.length != 0) {
        console.log('successful')
        process.exit()
    } else {
        notice('Type in what you want to say and press Enter please')
        await greeter(username)
    }
}