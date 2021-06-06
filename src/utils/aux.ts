const empty = (x: string) => (!x || x.length === 0);

const getUniqueId = () => {
    let x = 0;
    for (let i = 0; i < 6; i++){
        x = x * 10 + Math.floor(Math.random() * 9) + 1;
    }
    return x.toString();
}

export {empty, getUniqueId};