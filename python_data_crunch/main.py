from typing import Union
from fastapi import FastAPI

import pandas as pd
import numpy as np
import json
from fastapi.middleware.cors import CORSMiddleware

# uvicorn main:app --host 0.0.0.0 --port $PORT

app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://gymday.wolfolthuis.com",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
def test():
    return "test"

@app.get("/items/{gender}/{height}/{weight}/{age}/{goal}/{activity}/{days}")
def read_item(gender: str, height: int, weight: int, age: int, goal: str, activity: str, days: int):

    # Importing the dataset
    dataset = pd.read_csv('recipes_job_3.csv')

    breakfasts_names = []
    lunches_names = []
    dinners_names = []
    snacks_names = []
    collectmeals = {} 

    #loop through the dataset
    for index, row in dataset.iterrows():
        # print(row['name'], row['fats'])

        #fill empty values with 0
        if pd.isnull(row['fats']):
            row['fats'] = 0
        if pd.isnull(row['carbs']):
            row['carbs'] = 0
        if pd.isnull(row['protein']):
            row['protein'] = 0
        if pd.isnull(row['vegan']):
            row['vegan'] = 0
        if pd.isnull(row['vegetarian']):
            row['vegetarian'] = 0
        if pd.isnull(row['allergies']):
            row['allergies'] = 0
        if pd.isnull(row['instructions']):
            row['instructions'] = 0
        if pd.isnull(row['ingredients']):
            row['ingredients'] = 0
        if pd.isnull(row['kcal']):
            row['kcal'] = 0
        if pd.isnull(row['cat']):
            row['cat'] = "niks"
        if pd.isnull(row['name']):
            row['name'] = 0
        if pd.isnull(row['fiber']):
            row['fiber'] = 0             


        collectmeals[row['name']] = {
            'name': row['name'],
            'cat': row['cat'],
            'kcal': float(row['kcal']),
            'fats': float(row['fats']),
            'carbs': float(row['carbs']),
            'protein': float(row['protein']),
            'fiber': float(row['fiber']),
            'vegan': row['vegan'],
            'vegetarian': row['vegetarian'],
            'allergies': row['allergies'],
            'instructions': row['instructions'],
            'ingredients': row['ingredients'],
            'day': 0
        }
        #uncomment dit om te checken of er iets in de cat kolom staat wat niet klopt
        # if 'niks' in str(row['cat']).lower():
        #     print(row['name'])
        if 'breakfast' in str(row['cat']).lower() or 'ontbijt' in str(row['cat']).lower():
            breakfasts_names.append(row['name'])
        if 'lunch' in str(row['cat']).lower() or 'middageten' in str(row['cat']).lower():
            lunches_names.append(row['name'])
        if 'dinner' in str(row['cat']).lower() or 'avondeten' in str(row['cat']).lower():
            dinners_names.append(row['name'])
        if 'snack' in str(row['cat']).lower() or 'extra' in str(row['cat']).lower():
            snacks_names.append(row['name'])


    activitymap = {
        "weinig": 1.2,
        "licht": 1.375,
        "gemiddeld": 1.465,
        "gemiddeld_intense": 1.55,
        "zwaar": 1.725,
        "zeer_zwaar": 1.9
    }


    #calc bmi (10 × 79kg) + (6.25 × 182cm) - (5 × 24) + 5 = 1813kcal
    bmi = 0
    if gender == 'vrouw':
        bmi = (10 * weight) + (6.25 * height) - (5 * age) - 161
    else:
        bmi = (10 * weight) + (6.25 * height) - (5 * age) + 5

    tdee = bmi * activitymap[activity]

    adjusted_tdee = 0
    if goal == 'verliezen':
        adjusted_tdee = tdee - 400
    elif goal == 'spiermassa':
        adjusted_tdee = tdee * 1.1
    else:
        adjusted_tdee = tdee


    #tdee is how much calories you need to maintain your weight
    #create a algorithm to calculate how much calories you need to maintain your weight


    meals = {
        "breakfast": [],
        "lunch": [],
        "dinner": [],
        "snack": []
    }

    amount_snacks_per_day = []

    total_kcal_schedule = 0
    total_protein_schedule = 0


    high_calorie_snacks = []

    bld_min = 0.65

    if adjusted_tdee <= 2500:
        bld_min = 0.9 
    if adjusted_tdee >= 2500 and adjusted_tdee < 3100:
        #add to snacks
        for snack in collectmeals:
            if 'snack' in collectmeals[snack]['cat'].lower() :
                if collectmeals[snack]['kcal'] > 150:
                    high_calorie_snacks.append(collectmeals[snack]['name'])
            elif 'lunch' in collectmeals[snack]['cat'] :
                if collectmeals[snack]['kcal'] > 250 and collectmeals[snack]['kcal'] < 800:
                    high_calorie_snacks.append(collectmeals[snack]['name'])

        snacks_names = high_calorie_snacks

        bld_min = 0.85     
    elif adjusted_tdee >= 3100:
        for snack in collectmeals:
            if 'snack' in collectmeals[snack]['cat'].lower() :
                if collectmeals[snack]['kcal'] > 250:
                    high_calorie_snacks.append(collectmeals[snack]['name'])
            elif 'lunch' in collectmeals[snack]['cat'] :
                if collectmeals[snack]['kcal'] > 250 and collectmeals[snack]['kcal'] < 800:
                    high_calorie_snacks.append(collectmeals[snack]['name'])

        snacks_names = high_calorie_snacks

        bld_min = 0.8        
    if adjusted_tdee >= 2800 and adjusted_tdee < 3100:
        bld_min = 0.8
    if adjusted_tdee >= 3800:
        bld_min = 0.75



    # loops = []
    # print(len(snacks_names))


    for i in range(0, days):
        loopscount = 0
        notfound = True
        while notfound:
            loopscount += 1
            # print(loopscount)
            if loopscount > 4000:
                return "error"
            total_kcal = 0
            total_protein = 0
            temp_meals = {
                "breakfast": [],
                "lunch": [],
                "dinner": [],
                "snack": []
            }

            random_number1 = np.random.randint(len(breakfasts_names))
            random_number2 = np.random.randint(len(lunches_names))
            random_number3 = np.random.randint(len(dinners_names))


            if collectmeals[breakfasts_names[random_number1]] in meals['breakfast'] or collectmeals[breakfasts_names[random_number1]] in meals['lunch']:
                continue

            total_kcal += collectmeals[breakfasts_names[random_number1]]['kcal']
            total_protein += collectmeals[breakfasts_names[random_number1]]['protein']
            temp_meals['breakfast'].append(collectmeals[breakfasts_names[random_number1]])


            if collectmeals[lunches_names[random_number2]] in meals['lunch'] or collectmeals[lunches_names[random_number2]] in meals['dinner']:
                continue

            total_kcal += collectmeals[lunches_names[random_number2]]['kcal']
            total_protein += collectmeals[lunches_names[random_number2]]['protein']
            temp_meals['lunch'].append(collectmeals[lunches_names[random_number2]])


            if collectmeals[dinners_names[random_number3]] in meals['dinner'] or collectmeals[dinners_names[random_number3]] in meals['lunch']:
                continue

            total_kcal += collectmeals[dinners_names[random_number3]]['kcal']
            total_protein += collectmeals[dinners_names[random_number3]]['protein']
            temp_meals['dinner'].append(collectmeals[dinners_names[random_number3]])


            if goal == 'verliezen':
                min_tdee = adjusted_tdee - 100
                max_tdee = adjusted_tdee + 100            
            elif goal == 'spiermassa':
                min_tdee = adjusted_tdee - 50
                max_tdee = adjusted_tdee + 100 
            else:
                adjusted_tdee = tdee
                min_tdee = adjusted_tdee - 100
                max_tdee = adjusted_tdee + 100

            #if breakfast, lunch and dinner make up > 70% of the total kcal, add snacks untul its around 100%


            if total_kcal >= adjusted_tdee * bld_min and total_kcal < adjusted_tdee:
                if total_kcal >= min_tdee and total_kcal <= max_tdee:
                    #case : geen snacks nodig
                    meals['breakfast'].append(temp_meals['breakfast'][0])
                    meals['lunch'].append(temp_meals['lunch'][0])
                    meals['dinner'].append(temp_meals['dinner'][0])
                    total_kcal_schedule += total_kcal
                    total_protein_schedule += total_protein
                    notfound = False
                    break
                loopscount2 = 0
                    # print(loopscount)
                
                #voordat je random snacks pakt.
                # check eerst of er een snack is die past bij de kcal die je nog nodig hebt
                # als die er is, pak die dan
                # zorg dat die snack niet al gepakt is. Als dit niet lukt, pak dan random snacks.
                for snack in snacks_names:
                    # print(snack)
                    # print(f"current kcal: {total_kcal}  kcal tested: {collectmeals[snack]['kcal'] + total_kcal}  min: {min_tdee}  max: {max_tdee}")
                    if collectmeals[snack]['kcal'] + total_kcal >= min_tdee and collectmeals[snack]['kcal'] + total_kcal <= max_tdee:
                        if collectmeals[snack] in meals['snack']:
                            continue
                        else:
                            collectmeals[snack]['day'] = i
                            temp_meals['snack'].append(collectmeals[snack])
                            total_kcal += collectmeals[snack]['kcal']
                            total_protein += collectmeals[snack]['protein']

                            meals['breakfast'].append(temp_meals['breakfast'][0])
                            meals['lunch'].append(temp_meals['lunch'][0])
                            meals['dinner'].append(temp_meals['dinner'][0])
                            for snack in temp_meals['snack']:
                                meals['snack'].append(snack)
                            total_kcal_schedule += total_kcal
                            total_protein_schedule += total_protein
                            notfound = False

                            amount_snacks_per_day.append(len(temp_meals['snack']))
                            break
                    else:
                        continue

                while total_kcal < min_tdee:
                    #case : meer snacks nodig
                    loopscount2 += 1
                    if loopscount2 > 100000:
                        return "error"
                    


                    random_number4 = np.random.randint(len(snacks_names))
                    temptotal = total_kcal + collectmeals[snacks_names[random_number4]]['kcal']

                    if temptotal >= min_tdee and temptotal <= max_tdee:
                        collectmeals[snacks_names[random_number4]]['day'] = i
                        temp_meals['snack'].append(collectmeals[snacks_names[random_number4]])
                        total_kcal += collectmeals[snacks_names[random_number4]]['kcal']
                        total_protein += collectmeals[snacks_names[random_number4]]['protein']

                        meals['breakfast'].append(temp_meals['breakfast'][0])
                        meals['lunch'].append(temp_meals['lunch'][0])
                        meals['dinner'].append(temp_meals['dinner'][0])       
                        for snack in temp_meals['snack']:
                            meals['snack'].append(snack)
                        total_kcal_schedule += total_kcal
                        total_protein_schedule += total_protein
                        notfound = False

                        amount_snacks_per_day.append(len(temp_meals['snack']))
                        break
                    elif temptotal > max_tdee:
                        continue
                    elif temptotal < min_tdee:
                        collectmeals[snacks_names[random_number4]]['day'] = i
                        temp_meals['snack'].append(collectmeals[snacks_names[random_number4]])
                        total_kcal += collectmeals[snacks_names[random_number4]]['kcal']
                        total_protein += collectmeals[snacks_names[random_number4]]['protein']
                        continue
                    else:
                        continue
                # print(loopscount)
        # loops.append(loopscount)

    # print(loops)                
    return_data = {'meals' : meals, 'tdee': tdee, 'snacks_per_day' : amount_snacks_per_day, 'total_kcal': int(total_kcal_schedule / days), 'total_protein': int(total_protein_schedule / days), 'kcal_goal' : int(adjusted_tdee), 'goal': goal, 'bmr': bmi} 

    return return_data

if __name__ == "__main__":
    import uvicorn
    import os   
    print(os.getenv('PORT'))
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv('PORT')))
