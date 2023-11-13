import axios from 'axios'

export const GetData = (gender, height, weight, age, goal, activity, amountdays) => {
    console.log(gender, height, weight, age, goal, activity, amountdays)
    return axios
    .get(`http://127.0.0.1:8000/items/${gender}/${height}/${weight}/${age}/${goal}/${activity}/${amountdays}`)
    .then((response) => {
        return response.data
    })
}