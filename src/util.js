import с from "classnames";

export function random_between(min, max, units = 1) {
    min = min*units; max = max*units
    return Math.floor(Math.random()*(max-min+1)+min);
}


export function generateRandomString(length = 8){
    return Math.random().toString(20).substr(2, length)
}

export function media(clas, options = null) {
    return window.innerWidth < 780 ? clas : ''
}

export function jclass(...arg) {
    return {className: с(...arg)}
}

export function objUpdate(obj, newObj) {
    console.log(obj, newObj)
    Object.keys(obj).map(n => delete obj[n])
    Object.keys(newObj).map(n => obj[n] = newObj[n])
    return obj
}

export const to = (id, offset = 100) => {
    const el = document.getElementById(id)
    if(el) document.getElementById('scrollRoot').scrollTo({top: el.offsetTop-offset, behavior: 'smooth'})
}