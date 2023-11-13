import { useState} from 'react'
import { GetData } from '../proxies/GetData'
import gymdaylogo from './gymdaylogo.jpg';

import MyDocument from '../pdf/pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
const Home = () => {
    const doelopties = ["spiermassa", "behouden", "verliezen"]
    const genderopties = ["man", "vrouw"]
    const activityopties = ["weinig", "licht", "gemiddeld", "gemiddeld_intense", "zwaar", "zeer_zwaar"]
    const mealtype = ["ontbijt", "lunch", "diner"]
    const days = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag","zondag"]

    const [data, setData] = useState([])
    const [breakfasts, setBreakfasts] = useState([])
    const [lunches, setLunches] = useState([])
    const [dinners, setDinners] = useState([])
    const [snacks, setSnacks] = useState([])

    const [gender, setGender] = useState(genderopties[0])
    const [goal, setGoal] = useState(doelopties[0])

    const [height, setHeight] = useState(170)
    const [weight, setWeight] = useState(70)
    const [age, setAge] = useState(20)
    const [activity, setActivity] = useState(activityopties[0])
    const [amountdays, setAmountdays] = useState(1)
    
    const [personname, setName] = useState("wolf")
    const [personData, setPersonData] = useState({
        tdee : 0,
        kcalgoal : 0,
        goal : ""
    })


    const GetDataHandler = async (e) => {
        e.preventDefault()

        GetData(gender, height, weight, age,  goal, activity, amountdays)
        .then((data) => {
            setData(data)
            setBreakfasts(data.meals.breakfast)
            setLunches(data.meals.lunch)
            setDinners(data.meals.dinner)
            setSnacks(data.meals.snack)

            setPersonData({
                tdee : data.tdee,
                kcalgoal : data.kcal_goal,
                goal : data.goal,
            })

            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    
    return (
        <div>

            <h1>gegevens formulier</h1>
            <br></br>
            <form onSubmit={GetDataHandler}>
                <label htmlFor="naam">Naam</label>
                <input value={personname} onChange={(e) => setName(e.target.value)} type="text" id="naam" name="naam" ></input>
                <br></br>

                <img src="gymdaylogo.jpg" alt="" />
                <label htmlFor="geslacht">Geslacht</label>
                <select id="geslacht" name="geslacht" onChange={(e) => setGender(genderopties[e.target.value])}>
                    {
                        genderopties.map((gender, key) => <option value={key}>{gender}, {key}</option>)
                    }
                </select>
                <br></br>
                {/* lengte, huidig gewicht, leeftijd */}
                <label htmlFor="amountdays">Hoeveel dagen schema</label>
                <input value={amountdays} onChange={(e) => setAmountdays(e.target.value)} type="number" id="amountdays" name="amountdays" min="1" max="7"></input>
                <br></br>

                <label htmlFor="lengte">Lengte</label>
                <input value={height} onChange={(e) => setHeight(e.target.value)} type="number" id="lengte" name="lengte" min="100" max="250"></input>
                <br></br>

                <label htmlFor="huidig_gewicht">Huidig gewicht</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" id="huidig_gewicht" name="huidig_gewicht" min="30" max="400"></input>
                <br></br>

                <label htmlFor="leeftijd">Leeftijd</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} type="number" id="leeftijd" name="leeftijd" min="10" max="100"></input>
                <br></br>

                <label htmlFor="doel">Doel</label>
                <select id="doel" name="doel" onChange={(e) => setGoal(doelopties[e.target.value])}>
                    {
                        doelopties.map((doel, key) => <option value={key}>{doel}</option>)
                    }
                </select>
                <br></br>

                <label htmlFor="sport">Hoeveel sport</label>
                <select name="sport" id="sport" onChange={(e) => setActivity(activityopties[e.target.value])}>
                    {
                        activityopties.map((activity, key) => <option value={key}>{activity}</option>)
                    }
                </select>

                <br></br>
                <br></br>

                <button type="submit" >Haal voedings schema op</button>

            </form>
            <br></br>
            <br></br>

            {personData.tdee !== 0 ?  <>
                <h2>data voor {personname} :</h2>
                <h3>TDEE : {personData.tdee}</h3>
                <h3>kcal doel : {personData.kcalgoal}</h3>
                <h3>doel : {personData.goal}</h3>
            </> : <h1></h1>}       

            <br></br>

            <div>
                <h1>Voeding schema data : </h1>
                <h3>Gemiddeld kcal per dag : {data.total_kcal} </h3>
                <h3>Gemiddeld eiwitten per dag : {data.total_protein} </h3>
                <PDFDownloadLink document={<MyDocument days={days} data={data} person={personname} breakfasts={breakfasts} lunches={lunches} dinners={dinners} snacks={snacks}/>} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
                <h2>breakfasts :</h2>
                {breakfasts.map((datapunt, index) => 
                    <>
                        <p><b>{index + 1}</b> : {datapunt.name} :</p>
                        <p><b>kcal: </b> {datapunt.kcal}, <b>fats:</b> {datapunt.fats}, <b>carbs:</b> {datapunt.carbs}, <b>protein:</b> {datapunt.protein}</p>
                        <p><b>vegan:</b> {datapunt.vegan}, <b>vegatarisch:</b> {datapunt.vegetarian}, <b>allergien:</b> {datapunt.allergies}</p>
                        <p><b>Ingredients: </b>{datapunt.ingredients}</p>
                        <p><b>Instructions: </b>{datapunt.instructions}</p>
                        <br></br>
                    </>
                )}
                <h2>lunches :</h2>
                {lunches.map((datapunt, index) => 
                    <>
                        <p><b>{index + 1}</b> : {datapunt.name} :</p>
                        <p><b>kcal: </b> {datapunt.kcal}, <b>fats:</b> {datapunt.fats}, <b>carbs:</b> {datapunt.carbs}, <b>protein:</b> {datapunt.protein}</p>
                        <p><b>vegan:</b> {datapunt.vegan}, <b>vegatarisch:</b> {datapunt.vegetarian}, <b>allergien:</b> {datapunt.allergies}</p>
                        <p><b>Ingredients: </b>{datapunt.ingredients}</p>
                        <p><b>Instructions: </b>{datapunt.instructions}</p>
                        <br></br>
                    </>
                )}

                <h2>dinners :</h2>
                {dinners.map((datapunt, index) => 
                    <>
                        <p><b>{index + 1}</b> : {datapunt.name} :</p>
                        <p><b>kcal: </b> {datapunt.kcal}, <b>fats:</b> {datapunt.fats}, <b>carbs:</b> {datapunt.carbs}, <b>protein:</b> {datapunt.protein}</p>
                        <p><b>vegan:</b> {datapunt.vegan}, <b>vegatarisch:</b> {datapunt.vegetarian}, <b>allergien:</b> {datapunt.allergies}</p>
                        <p><b>Ingredients: </b>{datapunt.ingredients}</p>
                        <p><b>Instructions: </b>{datapunt.instructions}</p>
                        <br></br>
                    </>
                )}

                <h2>snacks :</h2>
                {snacks.map((datapunt, index) => 
                    <>
                        <p><b>{index + 1}</b> : {datapunt.name} :</p>
                        <p><b>kcal: </b> {datapunt.kcal}, <b>fats:</b> {datapunt.fats}, <b>carbs:</b> {datapunt.carbs}, <b>protein:</b> {datapunt.protein}</p>
                        <p><b>vegan:</b> {datapunt.vegan}, <b>vegatarisch:</b> {datapunt.vegetarian}, <b>allergien:</b> {datapunt.allergies}</p>
                        <p><b>Ingredients: </b>{datapunt.ingredients}</p>
                        <p><b>Instructions: </b>{datapunt.instructions}</p>
                        <br></br>
                    </>
                )}

            </div>  
        </div>
    )

}

export default Home