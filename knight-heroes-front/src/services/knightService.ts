export function getKnights() {
    return fetch(`${process.env.VUE_APP_API_URL}knights`).then((data)=>data.json())
}

export function getHeroes() {
    return fetch(`${process.env.VUE_APP_API_URL}knights?filter=heroes`).then((data)=>data.json())
}

export function deleteKnight(id: string) {
    return fetch(`${process.env.VUE_APP_API_URL}knights/${id}`, {method: 'DELETE'}).then((data)=>data.status == 204)
}
export function getKnight(id: string) {
    return fetch(`${process.env.VUE_APP_API_URL}knights/${id}`).then((data)=>data.json())
}

export function updateKnight(id: string, body: object) {
    return fetch(`${process.env.VUE_APP_API_URL}knights/${id}`, {method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)}).then((data)=>data.status == 204)
}

export function createKnight(body: object) {
    return fetch(`${process.env.VUE_APP_API_URL}knights`, {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)}).then((data)=>data.json())
}