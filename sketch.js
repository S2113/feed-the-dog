var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTheDog;
var Hour;
var time;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happyDog.png");

getTime();

}

function setup() {
  database=firebase.database();
  createCanvas(1200,400);

  foodObj = new Foody();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog=createButton ("feed Dog");
  feedTheDog.position (900,95);
  feedTheDog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  

  //write code to read fedtime value from the database 
  

  
  foodObj.getFedTime (time);
  text ("last Fed: " + time);
  foodObj.display();
  
  drawSprites();
  //write code to display text lastFed time here
  




  


 
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood ();
  Hour=hour ();

    if (Hour==0)
    {
      time= "12 am";
    }
      
    else if (Hour <12)
    {
        time = Hour + " am";
    }

    else (Hour >12)
    {
      time = Hour-12 + " pm";
    }




  foodObj.getFedTime(time);
  //write code here to update food stock and last fed time
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })


}



