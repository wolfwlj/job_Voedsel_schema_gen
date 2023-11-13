from typing import Union
from fastapi import FastAPI

import pandas as pd
import numpy as np
import json
from fastapi.middleware.cors import CORSMiddleware


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
    dataset = pd.read_csv('recipes_job_1.csv')

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
            row['cat'] = 0
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

            'ingredients': row['ingredients']
        }
        if 'breakfast' in str(row['cat']) or 'ontbijt' in str(row['cat']):
            breakfasts_names.append(row['name'])
        if 'lunch' in str(row['cat']) or 'middageten' in str(row['cat']):
            lunches_names.append(row['name'])
        if 'dinner' in str(row['cat']) or 'avondeten' in str(row['cat']):
            dinners_names.append(row['name'])
        if 'snack' in str(row['cat']) or 'extra' in str(row['cat']):
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
        adjusted_tdee = tdee + 250
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



    total_kcal_schedule = 0
    total_protein_schedule = 0


    for i in range(0, days):
        while True:
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

            # combotuple = (random_number1, random_number2, random_number3)

            # if combotuple in checked_combinations:
            #     continue

            # print(checked_combinations)        
            total_kcal += collectmeals[breakfasts_names[random_number1]]['kcal']
            total_protein += collectmeals[breakfasts_names[random_number1]]['protein']
            temp_meals['breakfast'].append(collectmeals[breakfasts_names[random_number1]])

            total_kcal += collectmeals[lunches_names[random_number2]]['kcal']
            total_protein += collectmeals[lunches_names[random_number2]]['protein']
            temp_meals['lunch'].append(collectmeals[lunches_names[random_number2]])

            total_kcal += collectmeals[dinners_names[random_number3]]['kcal']
            total_protein += collectmeals[dinners_names[random_number3]]['protein']
            temp_meals['dinner'].append(collectmeals[dinners_names[random_number3]])

            if activity == 'zeer_zwaar' or activity == 'gemiddeld' or activity == 'zwaar':
                random_number4 = np.random.randint(len(snacks_names))

                # y = list(combotuple)
                # y.append(random_number4)
                # combotuple = tuple(y)
                # if activity == 'gemiddeld':
                #     if combotuple in checked_combinations:
                #         continue

                total_kcal += collectmeals[snacks_names[random_number4]]['kcal']
                total_protein += collectmeals[snacks_names[random_number4]]['protein']
                temp_meals['snack'].append(collectmeals[snacks_names[random_number4]])


            if activity == 'zeer_zwaar' or  activity == 'zwaar':

                random_number5 = np.random.randint(len(snacks_names))
                # y = list(combotuple)
                # y.append(random_number5)
                # combotuple = tuple(y)
                # if activity == 'zwaar':
                #     if combotuple in checked_combinations:
                #         continue

                total_kcal += collectmeals[snacks_names[random_number5]]['kcal']
                total_protein += collectmeals[snacks_names[random_number5]]['protein']
                temp_meals['snack'].append(collectmeals[snacks_names[random_number5]])



            if activity == 'zeer_zwaar':
                random_number6 = np.random.randint(len(snacks_names))

                # y = list(combotuple)
                # y.append(random_number6)
                # combotuple = tuple(y)
                # if activity == 'zeer_zwaar':
                #     if combotuple in checked_combinations:
                #         continue

                total_kcal += collectmeals[snacks_names[random_number6]]['kcal']
                total_protein += collectmeals[snacks_names[random_number6]]['protein']
                temp_meals['snack'].append(collectmeals[snacks_names[random_number6]])

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

            if total_kcal > min_tdee and total_kcal < max_tdee:
                meals['breakfast'].append(temp_meals['breakfast'][0])
                meals['lunch'].append(temp_meals['lunch'][0])
                meals['dinner'].append(temp_meals['dinner'][0])

                for snack in temp_meals['snack']:
                    meals['snack'].append(snack)
                total_kcal_schedule += total_kcal
                total_protein_schedule += total_protein
                break
            else :
                random_number7 = np.random.randint(len(snacks_names))
                # y = list(combotuple)
                # y.append(random_number7)
                # combotuple = tuple(y)
                # if combotuple in checked_combinations:
                #     continue
                total_kcal += collectmeals[snacks_names[random_number7]]['kcal']
                total_protein += collectmeals[snacks_names[random_number7]]['protein']
                temp_meals['snack'].append(collectmeals[snacks_names[random_number7]])


                if total_kcal > min_tdee and total_kcal < max_tdee:
                    meals['breakfast'].append(temp_meals['breakfast'][0])
                    meals['lunch'].append(temp_meals['lunch'][0])
                    meals['dinner'].append(temp_meals['dinner'][0])

                    for snack in temp_meals['snack']:
                        meals['snack'].append(snack)
                    total_kcal_schedule += total_kcal
                    total_protein_schedule += total_protein
                    break
                else:
                    # checked_combinations.add(combotuple)
                    continue


    return_data = {'meals' : meals, 'tdee': tdee, 'total_kcal': int(total_kcal_schedule / days), 'total_protein': int(total_protein_schedule / days), 'kcal_goal' : int(adjusted_tdee), 'goal': goal, 'bmr': bmi} 

    return return_data