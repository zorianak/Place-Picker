/********************************************************************
* File Name:   PickAPlace.js
*
* Description: This file contains functions for creating a restaurant
*				chooser.
* 
* Programmer:  Kim Holmes 
*              brandnewaquarium@me.com
********************************************************************/

/********************************************************************
* Function:     restaurantClick (and related functions)
*
* Description:  This event is for whenever a restaurant is clicked on
*				in the picker div.
*               
*               Params: theForm is a form object.
*/

//load this stuff up NOW!

window.onload=function(){
		makeRestaurants();
		callGenres();
}

//create restaurant objects

function restObj(name,url,genre)

{
	this.name = name;
	this.url = url;	
	this.genre = genre; //some will have more than one genre, so we want to account for that
}

//Create an array for all of the genres we'll have, so we can read through those and populate our DOM
//Chinese, Campus, Davis, Fancy, Fast Food, Stuff Dad likes, seafood, Late Night, Burger, Mexican, Pizza, Ice Cream

genre_info = new Object();


//create the objects for all of the restaurants now

rest_list = [
	new restObj("Panda Express","http://www.pandaexpress.com/",['Chinese','Fast Food','Campus']),
	new restObj("Hunan Bar and Restaurant","http://www.yelp.com/biz/hunan-bar-and-restaurant-Davis",['Chinese','Fancy','Davis']),
	new restObj("Silver Dragon","http://Daviswiki.org/Silver_Dragon",['Chinese','Fancy','Fast Food','Davis']),
	new restObj("PF Changs","http://www.pfchangs.com",['Chinese','Fancy']),
	new restObj("Jack in the Box","http://www.jackinthebox.com",['Fast Food','Late Night','Burger']),
	new restObj("McDonalds","http://www.mcdonalds.com",['Fast Food','Late Night','Burger']),
	new restObj("Carls Jr","http://www.carlsjr.com/",['Fast Food','Late Night','Burger']),
	new restObj("Wendys","http://www.wendys.com/",['Fast Food','Late Night','Burger']),
	new restObj("Taco Bell","http://www.tacobell.com/",['Fast Food','Late Night','Mexican']),
	new restObj("Wendys","http://www.tacobell.com",['Fast Food','Late Night']),
	new restObj("Applebees","http://www.applebees.com",['Late Night']),
	new restObj("BJs","http://www.bjs.com",['Late Night','Fancy','Pizza']),
	new restObj("Leatherbys","http://www.leatherbys.com",['Late Night','Fancy','Ice Cream']),
	new restObj("Cheesecake Factory","http://www.thecheesecakefactory.com",['Fancy']),
	new restObj("Mikunis","http://www.mikuniSushi.com",['Sushi','Fancy']),
	new restObj("California Pizza Kitchen","http://www.cpk.com",['Pizza','Fancy']),
	new restObj("The Melting Pot","http://www.meltingpot.com",['Fancy']),
	new restObj("Outback Steakhouse","http://www.outback.com",['Stuff Dad likes','Fancy']),
	new restObj("The Black Angus","http://www.blackangus.com",['Stuff Dad likes','Fancy']),
	new restObj("Dairy Queen","http://www.dairyqueen.com",['Fast Food','Ice Cream']),
	new restObj("Burger King","http://www.bk.com",['Fast Food','Burger','Campus']),
	new restObj(":(","http://www.joescrabshack.com",['Stuff Dad likes','Seafood']),
	new restObj("Mel\'s Diner","http://www.mlesdrive-in.com",['Breakfast','Burger','Ice Cream','Late Night']),
	new restObj("iHop","http://www.ihop.com",['Breakfast','Burger','Late Night']),
	new restObj("Dennys","http://www.dennys.com",['Breakfast','Burger','Late Night']),
	new restObj("Mimis Cafe","http://www.mimiscafe.com",['Breakfast','Fancy','Late Night']),
];

//this function is to now read through ALL of those restaurants, and then figure out what genre each is using
function makeRestaurants()
{
	rest_list.sort()
	for (var i=0;i< rest_list.length;i++)
	{
		var restaurant = rest_list[i];
		for(var j=0;j<restaurant.genre.length;j++)
		{
			var genre = restaurant.genre[j];
			if(genre_info[genre] == undefined )
				{ genre_info[genre] = [restaurant]; }
			else 
				{	
					genre_info[genre].push(restaurant);
				}
		}
	}
}

function callGenres()
{
	
	
	for (var k in genre_info)
		{
			document.getElementById('choices').innerHTML += '<li><a href="#" name="' + k + '" id="' + k +'" onClick="restaurantClick(\'' + k + '\');">' + k + '</a></li>';
		}
}


function restaurantClick(clickedRest)
{
	//This grabs the ID of the link (restaurant) and then asks "What's your name?" so that we can compare the names!
	//var clickedRest = document.getElementById('restaurant').name;
	
	var genre = clickedRest;
	var genre_data = genre_info[genre];
	
	document.getElementById('results').innerHTML = "";
	
	for (var i= 0; i<genre_data.length; i++)
	{
		var restName = genre_data[i].name;
		var restUrl = genre_data[i].url;
		
		document.getElementById('results').innerHTML += '<li><a href="' + restUrl +'" name="' + restName + '" target="_blank">' + restName + '</li>';
	}
	
}

/********************************************************************
* Function:     randomRest (and related functions)
*
* Description:  This event is to select one random restaurant.
*               
*               Params: theForm is a form object.
*/

function randomRest()

{
	//clear out what's in there
	document.getElementById('results').innerHTML = "";
	
	//get the amount of restaurants we have
	var bigNumber = rest_list.length;
	
	//generate random number
	var randomNum = Math.floor(Math.random()*bigNumber);
	
	//now pick a random restaurant
	var chosenRestName = rest_list[randomNum].name;
	var chosenRestUrl = rest_list[randomNum].url;
	
	document.getElementById('results').innerHTML += '<li><a href="' + chosenRestUrl +'" name="' + chosenRestName + '" target="_blank">' + chosenRestName + '</li>';
}