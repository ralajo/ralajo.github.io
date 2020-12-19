//JavaScript Document
//Global Variables
let localStorage = 0;
let pillowArray = [];

//PRODUCT PAGE ALONE FUNCTIONS
//Change Title of Fill
function filltitle() {
	console.log("filltitlechange");
	let x = document.getElementById("pfill");
	let i = x.selectedIndex;
	return document.getElementById("fillinsert").innerHTML = x.options[i].text;

	//Change The Price to reflect the selected Quantity

	function pricequantchange() {
		console.log("pricequant chang");
		var x = document.getElementById("pquantity");
		var i = x.selectedIndex;
		return document.getElementById("pprice").innerHTML = x.options[i].text * 30;
	}

	//CART PAGE FUNCTIONS
	//Servers as template to build the rows of items with thier info - Remove item function within this space! 
	//This idea + style comes from the doggo's activity!!

	function cardTemplate(parentEl, name, quantity, image, shape, color, fill, price, index) {
		let divContainer = document.createElement("div");
		divContainer.className = "card";
		parentEl.appendChild(divContainer);

		let img = document.createElement("img");
		img.src = image;
		img.width = 200;
		divContainer.appendChild(img);

		let divTextContainer = document.createElement("div");
		divTextContainer.className = "text";
		divContainer.appendChild(divTextContainer);

		let header = document.createElement("h2");
		header.innerHTML = name;
		divTextContainer.appendChild(header);

		let quant = document.createElement("p");
		quant.innerHTML = quantity;
		divTextContainer.appendChild(quant);

		let pricetag = document.createElement("p");
		pricetag.innerHTML = price;
		divContainer.appendChild(pricetag);

		let shapepil = document.createElement("p");
		shapepil.innerHTML = shape;
		divTextContainer.appendChild(shapepil);

		let colorpil = document.createElement("p");
		colorpil.innerHTML = color;
		divTextContainer.appendChild(colorpil);

		let fillpil = document.createElement("p");
		shapepil.innerHTML = fill;
		divTextContainer.appendChild(fillpil);

		//Remove Pillow Function!!!
		let removeBtn = document.createElement('button');
		removeBtn.textContent = 'Remove!';
		removeBtn.onclick = function () {

			console.log(pillowArray);
			//This brings out the items for a pillow in the array, same things pulled from inside fish go outside to top of function.
			const pillow = {
				name: name,
				quantity: quantity,
				price: price,
				color: color,
				fill: fill,
				shape: shape,
				image: image
			}
			//This takes out one of the items from the index, specifically the one you clicked on!
			pillowArray.splice(index, 1);

			window.localStorage.setItem("pillowArray", JSON.stringify(pillowArray));
			//This removes the box from the page once it is gone from the array w/out you needing to refresh the page
			divContainer.remove();
			console.log(pillowArray);
		};

		divContainer.appendChild(removeBtn);

		return divContainer;

	}

	//Constructor Function for Pillow to exsist

	class Pillow {
		constructor(shape, color, fill, quantity, price, image) {
			this.shape = shape;
			this.color = color;
			this.fill = fill;
			this.quantity = quantity;
			this.price = price;
			this.image = image;
		}
		//here the getPillowName function is made, name is not in the class of pillows initially,
		//b/c this function is used later to append the constructed function
		getPillowName() {
			return this.shape + " in " + this.color + " with " + this.fill + " filling";
		}
	}

	//Adding to Cart Function, sets up item attributes and adds in the name that was mentioned above!
	function addToCart() {
		let shape = document.getElementById("pshape").innerHTML;
		let color = document.getElementById("pcolor").innerHTML;
		let fill = document.getElementById("fillinsert").innerHTML;
		let quantity = document.getElementById("pquantity").value;
		let price = document.getElementById("pprice").innerHTML;
		let image = document.getElementById("MHRBig").src;
		let fish = new Pillow(shape, color, fill, quantity, price, image);
		//I called this fish, because I was having trouble remembering that this was a differnt thing functionally so I wrote a different word from all else

		//adding the get pillow namw functiuon and appending it onto the string at the end makin it longer w/ the name thier
		fish.name = fish.getPillowName();
		pillowArray.push(fish);
		// through these pushes you can see that the pillows name is beign added to the fish function
		window.localStorage.setItem("pillowArray", JSON.stringify(pillowArray));
		console.log(pillowArray);
		console.log(fish);
	}

	//This is what actually brings up all of the cart rows
	function onLoad() {
		console.log("hi i made it to the cart FINALLY!!!");
		pillowArray = window.localStorage.getItem("pillowArray");
		if (pillowArray === null) {
			return;
			//If no items have been added to cart nothing will be shown
		}
		else {
			pillowArray = JSON.parse(pillowArray);
			let parentEl = document.getElementById("divstuff");
			pillowArray.forEach((fish, index) => {
				console.log(fish);
				cardTemplate(parentEl, fish.name, fish.quantity, fish.image, fish.shape, fish.color, fish.fill, fish.price, index);
				//If there are items to be shown, then each will be spanned into the cart template, by thier appendeges
			});
			return;
		}
	}

	//CART COUNT
	//SUBTOTAL

	//TAX

	//SHIPPING

	//TOTAL
	//functions dependent upon this input
