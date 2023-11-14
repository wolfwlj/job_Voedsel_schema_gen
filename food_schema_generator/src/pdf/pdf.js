import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import gymdaylogo from './Gymday_logo.png';
import FontPoppinsRegular from './Poppins-Regular.ttf';
import FontPoppins700 from './Poppins-Bold.ttf';
import FontPoppinsLight from './Poppins-Light.ttf';
import FontPoppinsExtraBold from './Poppins-ExtraBold.ttf';

// Create Document Component
const MyDocument = (props) => (

  <Document>
    <Page style={styles.body}>

    <Image
        style={styles.image}
        src={gymdaylogo}
      />

      <Text style={styles.title}>Gymday</Text>
      <Text style={styles.author}>Voedingsschema</Text>
      <Text style={styles.author}>{props.data.kcal_goal} Kcal</Text>/


      <Text style={styles.subtitle}>
          {props.person}
      </Text>



      <Text style={styles.ondertitle_textwrap} break>
        <Text style={styles.ondertitle}>
          Gymday
        </Text>
        <Text style={styles.ondertitleorange}>
          Instructies
        </Text>
      </Text>

      <Text style={styles.text}>
          Bij Gymday begrijpen we dat iedereen uniek is en dat voeding geen ‘one-size-fits-all’ benadering kent. Daarom zijn onze voedingsschema’s en recepten bedoeld als inspiratiebron en niet als strikte regels die je moet volgen. Voel je vrij om bepaalde ingrediënten te verwisselen als je dat wilt. Bijvoorbeeld, als een recept kip vereist maar je bent vegetarisch, kun je dit vervangen door een plantaardige eiwitbron zoals tofu. Of heb je geen zin in kip, neem dan vis, beef etc. 
      </Text>
      <Text style={styles.text}>
          Het belangrijkste is dat je voldoende eiwitten binnenkrijgt en je houdt aan het voorgeschreven caloriedoel. Deze twee factoren zijn cruciaal voor het behalen van je fitness- en gezondheidsdoelen. Onthoud dat voeding niet zwart/wit is. Als je niet precies eet zoals het in het schema staat, betekent dit niet dat je je doelen niet zult halen. Het gaat om het grotere geheel en de consistentie op lange termijn. 
      </Text>
      <Text style={styles.text}>
            We begrijpen dat iedereen een hectisch leven leidt. Daarom bieden we voor elk type maaltijd—ontbijt, lunch, avondeten en tussendoortjes—zowel snelle als uitgebreidere gerechten aan. 
      </Text>
      <Text style={styles.text}>
            In het bijgevoegde schema vind je een voorbeeldweek. Deze dient als inspiratie en is dus ook prima toepasbaar in het dagelijks leven. Je hebt de vrijheid om de gerechten naar wens te verplaatsen of je eigen indeling te creëren. We hopen dat onze voedingsschema’s en recepten je zullen inspireren en motiveren op je gezondheidsreis. Mocht je vragen of opmerkingen hebben, aarzel dan niet om contact met ons op te nemen.
      </Text>

      <Text style={styles.ondertitleorange} break>
          Ontbijt
      </Text>
      <View style={styles.foodwrapper}>
        <View style={styles.foodheader}>
          <View style={styles.foodheader_opties}>
            <Text style={styles.foodheader_text}>Opties</Text>
          </View>
          <View style={styles.foodheader_maaltijd}>
            <Text style={styles.foodheader_text}>Maaltijd</Text>
          </View>

          <View style={styles.foodheader_kcal}>
            <Text style={styles.foodheader_text}>kcal</Text>
          </View>
        </View>
            {props.breakfasts.map((datapunt, index) => 
              <View style={index % 2 == 1 ? styles.foodbody1 : styles.foodbody0}>
                  <View style={styles.foodbody_opties}>
                    <Text style={styles.foodbody_text}>
                        Optie {index + 1}
                    </Text>
                    <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Eiwitten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.protein}g</Text>
                    </View>
                  </View>
                  <View style={styles.foodbody_maaltijd}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.name}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Koolhydraten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.carbs}g</Text>
                      </View>
                  </View>

                  <View style={styles.foodbody_kcal}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.kcal}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Vetten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.fats}g</Text>
                      </View>
                  </View>
              </View>
            )}
      </View>

      <Text style={styles.ondertitleorange} break>
          Lunch
      </Text>

      <View style={styles.foodwrapper}>
        <View style={styles.foodheader}>
          <View style={styles.foodheader_opties}>
            <Text style={styles.foodheader_text}>Opties</Text>
          </View>
          <View style={styles.foodheader_maaltijd}>
            <Text style={styles.foodheader_text}>Maaltijd</Text>
          </View>

          <View style={styles.foodheader_kcal}>
            <Text style={styles.foodheader_text}>kcal</Text>
          </View>
        </View>
            {props.lunches.map((datapunt, index) => 
              <View style={index % 2 == 1 ? styles.foodbody1 : styles.foodbody0}>
                  <View style={styles.foodbody_opties}>
                    <Text style={styles.foodbody_text}>
                        Optie {index + 1}
                    </Text>
                    <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Eiwitten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.protein}g</Text>
                    </View>
                  </View>
                  <View style={styles.foodbody_maaltijd}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.name}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Koolhydraten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.carbs}g</Text>
                      </View>
                  </View>

                  <View style={styles.foodbody_kcal}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.kcal}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Vetten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.fats}g</Text>
                      </View>
                  </View>
              </View>
            )}
      </View>

      <Text style={styles.ondertitleorange} break>
          Avondeten
      </Text>

      <View style={styles.foodwrapper}>
        <View style={styles.foodheader}>
          <View style={styles.foodheader_opties}>
            <Text style={styles.foodheader_text}>Opties</Text>
          </View>
          <View style={styles.foodheader_maaltijd}>
            <Text style={styles.foodheader_text}>Maaltijd</Text>
          </View>

          <View style={styles.foodheader_kcal}>
            <Text style={styles.foodheader_text}>kcal</Text>
          </View>
        </View>
            {props.dinners.map((datapunt, index) => 
              <View style={index % 2 == 1 ? styles.foodbody1 : styles.foodbody0}>
                  <View style={styles.foodbody_opties}>
                    <Text style={styles.foodbody_text}>
                        Optie {index + 1}
                    </Text>
                    <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Eiwitten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.protein}g</Text>
                    </View>
                  </View>
                  <View style={styles.foodbody_maaltijd}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.name}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Koolhydraten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.carbs}g</Text>
                      </View>
                  </View>

                  <View style={styles.foodbody_kcal}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.kcal}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Vetten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.fats}g</Text>
                      </View>
                  </View>
              </View>
            )}
      </View>

      <Text style={styles.ondertitleorange} break>
          Snacks
      </Text>

      <View style={styles.foodwrapper}>
        <View style={styles.foodheader}>
          <View style={styles.foodheader_opties}>
            <Text style={styles.foodheader_text}>Opties</Text>
          </View>
          <View style={styles.foodheader_maaltijd}>
            <Text style={styles.foodheader_text}>Maaltijd</Text>
          </View>

          <View style={styles.foodheader_kcal}>
            <Text style={styles.foodheader_text}>kcal</Text>
          </View>
        </View>
            {props.snacks.map((datapunt, index) => 
              <View style={index % 2 == 1 ? styles.foodbody1 : styles.foodbody0}>
                  <View style={styles.foodbody_opties}>
                    <Text style={styles.foodbody_text}>
                        Optie {index + 1}
                    </Text>
                    <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Eiwitten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.protein}g</Text>
                    </View>
                  </View>
                  <View style={styles.foodbody_maaltijd}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.name}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Koolhydraten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.carbs}g</Text>
                      </View>
                  </View>

                  <View style={styles.foodbody_kcal}>
                      <Text style={styles.foodbody_text}>
                          {datapunt.kcal}
                      </Text>
                      <View style={styles.nutritie_view}>
                          <Text style={styles.nutritie_text}>Vetten </Text>
                          <Text style={styles.foodbody_text_nutritie}> {datapunt.fats}g</Text>
                      </View>
                  </View>
              </View>
            )}
      </View>
    

      <Text style={styles.ondertitle_textwrap} break>
        <Text style={styles.ondertitleorange}>
          Voorbeeld 
        </Text>
        <Text style={styles.ondertitle}>
          week
        </Text>
      </Text>

      {/* heir shit */}

      {props.breakfasts.map((datapunt, index) => 
        <View style={styles.voorbeeld_body }>
            <View style={styles.voorbeeld_day_header}>
                <Text  style={styles.vb_day_text}>{props.days[index]}</Text>
            </View>
            <View style={index % 2 == 1 ? styles.dag_voorbeeld_body1 : styles.dag_voorbeeld_body0}>
                <View style={styles.vb_row}>
                    <View style={styles.vb_row_header}>
                        <Text style={styles.vb_text}>Ontbijt</Text>
                    </View>
                    <View style={styles.vb_row_content}>
                        <Text style={styles.vb_text}>{datapunt.name}</Text>
                    </View>
                </View>

                <View style={styles.vb_row}>
                    <View style={styles.vb_row_header}>
                        <Text style={styles.vb_text}>Lunch</Text>
                    </View>
                    <View style={styles.vb_row_content}>
                        <Text style={styles.vb_text}>{props.lunches[index].name}</Text>
                    </View>
                </View>

                <View style={styles.vb_row}>
                    <View style={styles.vb_row_header}>
                        <Text style={styles.vb_text}>Avondeten</Text>
                    </View>
                    <View style={styles.vb_row_content}>
                        <Text style={styles.vb_text}>{props.dinners[index].name}</Text>
                    </View>
                </View>

                <View style={styles.vb_row}>
                    <View style={styles.vb_row_header}>
                        <Text style={styles.vb_text}>Snack</Text>
                    </View>
                    <View style={styles.vb_row_content}>
                        <Text style={styles.vb_text}>{props.snacks[index]?.name}</Text>
                    </View>
                </View>

            </View>
        </View>
      )}


      <Text style={styles.ondertitleorange} break>
          Recepten
      </Text>

      <Text style={styles.recipe_header}>
          Ontbijt recepten
      </Text>
      {props.breakfasts.map((datapunt, index) => 
        <View style={styles.recipe_body }>
            <View style={styles.recipe_upper_body}>
                <View style={styles.title_box}>
                  <Text style={styles.recipe_name}>
                      {datapunt.name}
                  </Text>
                </View>
                <View style={styles.nutrient_box}>
                  <Text style={styles.boxtitles}>Per 1 portie </Text>
                  <Text style={styles.recipe_nutrients}>
                      kcal: {datapunt.kcal}, fats: {datapunt.fats}, carbs: {datapunt.carbs}, protein: {datapunt.protein}
                  </Text>
                </View>
            </View>
            <View style={styles.recipe_lower_body}>
                <View style={styles.ingredient_box}>
                  <Text style={styles.boxtitles}>Ingrediënten </Text>

                  <Text style={styles.recipe_ingredients}>
                      {datapunt.ingredients}
                  </Text>
                </View>
                <View style={styles.instruction_box}>
                  <Text style={styles.boxtitles}>Aanwijzingen </Text>

                  <Text style={styles.recipe_instructions}>
                      {datapunt.instructions}
                  </Text>
                </View>
            </View>
          <View style={styles.divider}>
          </View>
        </View>
      )}

      <Text style={styles.recipe_header}>
          Lunch recepten
      </Text>
      {props.lunches.map((datapunt, index) => 
        <View style={styles.recipe_body }>
            <View style={styles.recipe_upper_body}>
                <View style={styles.title_box}>
                  <Text style={styles.recipe_name}>
                      {datapunt.name}
                  </Text>
                </View>
                <View style={styles.nutrient_box}>
                  <Text style={styles.boxtitles}>Per 1 portie </Text>
                  <Text style={styles.recipe_nutrients}>
                      kcal: {datapunt.kcal}, fats: {datapunt.fats}, carbs: {datapunt.carbs}, protein: {datapunt.protein}
                  </Text>
                </View>
            </View>
            <View style={styles.recipe_lower_body}>
                <View style={styles.ingredient_box}>
                  <Text style={styles.boxtitles}>Ingrediënten </Text>

                  <Text style={styles.recipe_ingredients}>
                      {datapunt.ingredients}
                  </Text>
                </View>
                <View style={styles.instruction_box}>
                  <Text style={styles.boxtitles}>Aanwijzingen </Text>

                  <Text style={styles.recipe_instructions}>
                      {datapunt.instructions}
                  </Text>
                </View>
            </View>
          <View style={styles.divider}>
          </View>
        </View>
      )}


      <Text style={styles.recipe_header}>
          Avondeten recepten
      </Text>
      {props.dinners.map((datapunt, index) => 
        <View style={styles.recipe_body }>
            <View style={styles.recipe_upper_body}>
                <View style={styles.title_box}>
                  <Text style={styles.recipe_name}>
                      {datapunt.name}
                  </Text>
                </View>
                <View style={styles.nutrient_box}>
                  <Text style={styles.boxtitles}>Per 1 portie </Text>
                  <Text style={styles.recipe_nutrients}>
                      kcal: {datapunt.kcal}, fats: {datapunt.fats}, carbs: {datapunt.carbs}, protein: {datapunt.protein}
                  </Text>
                </View>
            </View>
            <View style={styles.recipe_lower_body}>
                <View style={styles.ingredient_box}>
                  <Text style={styles.boxtitles}>Ingrediënten </Text>

                  <Text style={styles.recipe_ingredients}>
                      {datapunt.ingredients}
                  </Text>
                </View>
                <View style={styles.instruction_box}>
                  <Text style={styles.boxtitles}>Aanwijzingen </Text>

                  <Text style={styles.recipe_instructions}>
                      {datapunt.instructions}
                  </Text>
                </View>
            </View>
          <View style={styles.divider}>
          </View>
        </View>
      )}

      <Text style={styles.recipe_header}>
          Snack recepten
      </Text>
      {props.snacks.map((datapunt, index) => 
        <View style={styles.recipe_body }>
            <View style={styles.recipe_upper_body}>
                <View style={styles.title_box}>
                  <Text style={styles.recipe_name}>
                      {datapunt.name}
                  </Text>
                </View>
                <View style={styles.nutrient_box}>
                  <Text style={styles.boxtitles}>Per 1 portie </Text>
                  <Text style={styles.recipe_nutrients}>
                      kcal: {datapunt.kcal}, fats: {datapunt.fats}, carbs: {datapunt.carbs}, protein: {datapunt.protein}
                  </Text>
                </View>
            </View>
            <View style={styles.recipe_lower_body}>
                <View style={styles.ingredient_box}>
                  <Text style={styles.boxtitles}>Ingrediënten </Text>

                  <Text style={styles.recipe_ingredients}>
                      {datapunt.ingredients}
                  </Text>
                </View>
                <View style={styles.instruction_box}>
                  <Text style={styles.boxtitles}>Aanwijzingen </Text>

                  <Text style={styles.recipe_instructions}>
                      {datapunt.instructions}
                  </Text>
                </View>
            </View>
          <View style={styles.divider}>
          </View>
        </View>
      )}


      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);
Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: FontPoppinsRegular,
    },
    {
      src: FontPoppins700,
      fontWeight: 'bold',
    },
    {
      src: FontPoppinsLight,
      fontWeight: 'light',
    },
    {
      src: FontPoppinsExtraBold,
      fontWeight: 'extraBold',
    },

  ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 15,
    paddingBottom: 65,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 56,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',

  },
  author: {
    fontSize: 56,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#f9af3e',

  },
  subtitle: {
    fontSize: 56,
    marginTop: 50,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  ondertitle: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  ondertitleorange: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#f9af3e',
  },
  ondertitle_textwrap: {
    marginBottom : 20,
  },
  recipe_header: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000000',
  },

  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Poppins',
    marginHorizontal: 50,
  },


  // {/* recipe_header, recipe_body, recipe_upper_body, recipe_name, recipe_nutriens,
  // recipe_lower_body, recipe_ingredients, recipe_intructions 
  // ingredient_box, instruction_box,title_box, nutrient_box
  // */}
  recipe_body : {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 20,
  },
  recipe_upper_body : {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10,
  },
  recipe_lower_body : {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  recipe_name : {
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000000',
  },
  recipe_nutrients : {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'light',
    color: '#000000',
  },
  recipe_ingredients : {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'light',
    color: '#000000',
  },
  recipe_instructions : {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'light',
    color: '#000000',
  },
  boxtitles : {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000000',
  },
  divider : {
    borderBottomColor: '#f9af3e',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 10,

  },

  ingredient_box : {
    width: '50%',
  },
  instruction_box : {
    width: '50%',
  },
  title_box : {
    width: '50%',
  },
  nutrient_box : {
    width: '50%',
  },


  foodheader: {
    marginTop: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'row',
  },

  foodheader_opties: {
    width: '25%',
  },
  foodheader_maaltijd: {
    width: '50%',
    marginRight: 5,
  },
  foodheader_kcal: {
    width: '25%',
  },
  foodheader_text : {
    color: '#f9af3e',
    fontSize: 22,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },



  foodbody0: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
  },
  foodbody1: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ededec',
    display: 'flex',
    flexDirection: 'row',
  },
  foodbody_opties: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',

  },
  foodbody_maaltijd: {
    width: '50%',
    marginRight: 5,

  },
  foodbody_kcal: {
    width: '25%',
  },
  foodbody_text : {
    color: '#000000',
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Poppins',
  },

  nutritie_view : {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,

  },
  nutritie_text : {
    color: '#f9af3e',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },

  foodbody_text_nutritie : {
    color: '#000000',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'light',
  },

  image: {
    marginVertical: 15,
    marginHorizontal: 30,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
        // {/* voorbeeld_body, voorbeeld_day_header, vb_day_text, dag_voorbeeld_body, vb_row_header, vb_row_content */}
  voorbeeld_body : {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 50,
  },
  voorbeeld_day_header : {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  dag_voorbeeld_body0 : {
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop:5,
    backgroundColor: '#ffffff',
  },
  dag_voorbeeld_body1: {
    // display: 'flex',
    // flexDirection: 'collumn',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop:5,
    backgroundColor: '#ededec',
  },
  vb_day_text : {
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#f9af3e',

  },
  vb_text : {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    color: '#000000',
  },
  vb_row:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  vb_row_header : {
    width: '30%',
  },
  vb_row_content : {
    width: '70%',
  },
});


export default MyDocument;