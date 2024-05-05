

const web3 = new Web3(window.ethereum);
var accounts;
const getWeb3 = async() =>{
        const web3= new Web3(window.ethereum)
        
	if(web3) {
        try{
            accounts =  await window.ethereum.request({method:"eth_requestAccounts"});
	    console.log("Acquired addr : ", accounts[0]);
        localStorage.setItem('addr', accounts[0]);
           window.location.href = "home.html";
            //const hiddenSection = document.getElementById("isD");
            //if (hiddenSection.style.display === "none") {
            // Display the section
            //hiddenSection.style.display = "block";
            //}

           // resolve(web3)
        }
        catch(error){
		console.error(error);
            //reject(error)
        }
}
}

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("connect-wallet1").addEventListener("click",async()=>{
        const web3 =await getWeb3()
    })
})

const contractAddress = '0x5881b7E8C0d73Af9AA2667f9e377D3104dE32A48';
const contractABI =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "Itemized",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listItems",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "Sale",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int256",
						"name": "IID",
						"type": "int256"
					},
					{
						"internalType": "enum market.ItemStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct market.Item[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "getItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int256",
						"name": "IID",
						"type": "int256"
					},
					{
						"internalType": "enum market.ItemStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct market.Item",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contract = new web3.eth.Contract(contractABI, contractAddress);

const popupForm = document.getElementById("popupForm");
const popupButton = document.getElementById("popupButton");

// When the user clicks the button, open the popup form
function openForm() {
  popupForm.style.display = "block";
}

// When the user clicks on <span> (x), close the popup form
function closeForm() {
  popupForm.style.display = "none";
}
async function listItem() {
	
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    //const price = web3.utils.toWei(document.getElementById('price'), 'ether');
	const wei = document.getElementById('price').value
	const price = web3.utils.toWei(wei, 'ether');

	document.getElementById("title").value = ""; 
    document.getElementById("description").value = ""; 
    document.getElementById("price").value = ""; 
    try {
        // Call contract method to list item
		const addr = localStorage.getItem('addr');  
		/*const result = web3.eth.getAccounts() ;
		result.then(addresses => {
			// Retrieve the address from the Array
			const address = addresses[0];
			console.log('Address:', address);
		});

		const addresses = await result;
		
		console.log(addresses); */

		accounts =  await window.ethereum.request({method:"eth_requestAccounts"});
		//localStorage.setItem('addr', accounts[0]);
const listing = await contract.methods.listItems(title, description, price).send({ from:accounts[0] });

const Hash = listing.transactionHash;
	
        console.log('Item listed successfully');
		console.log(Hash);
		
		const popupContainer = document.createElement("div");
		popupContainer.style.width = "70%";
        popupContainer.style.height = "20%";
        popupContainer.style.backgroundColor = "#fff";
        popupContainer.style.border = "1px solid #ccc";
        popupContainer.style.borderRadius = "5px";
        popupContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        popupContainer.style.padding = "20px";
        popupContainer.style.position = "absolute";
        popupContainer.style.top = "50%";
        popupContainer.style.left = "50%";
        popupContainer.style.transform = "translate(-50%, -50%)";
        popupContainer.classList.add("popup-container");

        // Create close button
        const closeButton = document.createElement("span");

		closeButton.innerHTML = "&times;";
        closeButton.style.position = "absolute";
        closeButton.style.top = "10px";
        closeButton.style.right = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.color = "#888";

        closeButton.innerHTML = "&times;";
        closeButton.classList.add("popup-close");
        closeButton.onclick = function() {
            document.body.removeChild(popupContainer);
        };

        // Create transaction hash element
        const transactionHashElement = document.createElement("p");
        transactionHashElement.textContent = "Transaction Hash: " + Hash;

        // Append elements to the pop-up container
        popupContainer.appendChild(closeButton);
        popupContainer.appendChild(transactionHashElement);

        // Append pop-up container to the body
        document.body.appendChild(popupContainer);

		
        // Add logic to update UI or show success message
    } catch (error) {
        console.error('Error listing item:', error);
        // Add logic to show error message
    }
}




/*async function displayItems() {
    const items = await contract.methods.getAllItems().call()
    const itemList = document.getElementById("itemList");
   itemList.innerHTML = ''; // Clear previous items
   


    items.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.title} - ${item.description} - ${item.price}`;
        itemList.appendChild(listItem);
    });


	
}*/

async function displayItems() {

    const items = await contract.methods.getAllItems().call();
	console.log(items)
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ''; // Clear previous items

    items.forEach(item => {
        // Create a container for each item
		if(item.status ==0){
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        // Create elements to display item details
        const titleElement = document.createElement("h2");
        titleElement.textContent = item.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = item.description;

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: ${web3.utils.fromWei(item.price, "ether")} ETH`;

        // Create a buy button for each item
        const buyButton = document.createElement("button");
        buyButton.textContent = "Buy";
        buyButton.classList.add("buy-button");
		const addr = localStorage.getItem('addr');  
		
        buyButton.addEventListener("click", async () => {
         try {
			 /*  	const result = web3.eth.getAccounts() ;
		result.then(addresses => {
			// Retrieve the address from the Array
			const address = addresses[0];
			console.log('Address:', address);
		});

		const addresses = await result;
		
		console.log(addresses); */
		accounts =  await window.ethereum.request({method:"eth_requestAccounts"});
		//localStorage.setItem('addr', accounts[0]);
		if(item.seller.toLowerCase()==accounts[0]){
			alert("You can't buy your own item");
		}
		else{
        const buying = await contract.methods.buy(item.IID).send({ from: accounts[0], value: item.price });

		const Buy_Hash = buying.transactionHash;
        console.log('Item listed successfully');
		console.log(Buy_Hash);
		const popupContainer = document.createElement("div");
		popupContainer.style.width = "70%";
        popupContainer.style.height = "20%";
        popupContainer.style.backgroundColor = "#fff";
        popupContainer.style.border = "1px solid #ccc";
        popupContainer.style.borderRadius = "5px";
        popupContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        popupContainer.style.padding = "20px";
        popupContainer.style.position = "absolute";
        popupContainer.style.top = "50%";
        popupContainer.style.left = "50%";
        popupContainer.style.transform = "translate(-50%, -50%)";
        popupContainer.classList.add("popup-container");

        // Create close button
        const closeButton = document.createElement("span");

		closeButton.innerHTML = "&times;";
        closeButton.style.position = "absolute";
        closeButton.style.top = "10px";
        closeButton.style.right = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.color = "#888";

        closeButton.innerHTML = "&times;";
        closeButton.classList.add("popup-close");
        closeButton.onclick = function() {
            document.body.removeChild(popupContainer);
        };

        // Create transaction hash element
        const transactionHashElement = document.createElement("p");
        transactionHashElement.textContent = "Transaction Hash: " + Buy_Hash;

        // Append elements to the pop-up container
        popupContainer.appendChild(closeButton);
        popupContainer.appendChild(transactionHashElement);

        // Append pop-up container to the body
        document.body.appendChild(popupContainer);

                console.log(`Item '${item.title}' purchased successfully`);
                // You can add code to update UI or show a success message here
           } } catch (error) {
                console.error(`Error purchasing item '${item.title}':`, error);
                // You can add code to handle errors or show an error message here
            }
        });

        // Append elements to the item container
        itemContainer.appendChild(titleElement);
        itemContainer.appendChild(descriptionElement);
        itemContainer.appendChild(priceElement);
        itemContainer.appendChild(buyButton);

        // Append item container to the item list
        itemList.appendChild(itemContainer);
	}
    });
}


async function displayItemsSold() {

    const items = await contract.methods.getAllItems().call();
	console.log(items)
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ''; // Clear previous items

    items.forEach(item => {
        // Create a container for each item
		if(item.status ==1){
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        // Create elements to display item details
        const titleElement = document.createElement("h2");
        titleElement.textContent = item.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = item.description;

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: ${web3.utils.fromWei(item.price, "ether")} ETH`;

        

        // Append elements to the item container
        itemContainer.appendChild(titleElement);
        itemContainer.appendChild(descriptionElement);
        itemContainer.appendChild(priceElement);
        

        // Append item container to the item list
        itemList.appendChild(itemContainer);
	}
    });
}

async function displayBoughtItems() {

    const items = await contract.methods.getAllItems().call();
	//console.log(items)
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ''; // Clear previous items
    accounts =  await window.ethereum.request({method:"eth_requestAccounts"});
    items.forEach(item => {
        // Create a container for each item
		//console.log(item.status);
		//console.log("seller");
		
		//console.log(item.seller);
		const dummyaddr = accounts[0];
		//console.log(dummyaddr);
		//console.log(item.seller.trim() == dummyaddr.trim());
		//console.log(typeof(item.seller));
		//console.log(typeof(dummyaddr));
		if(item.status ==1 && item.seller.toLowerCase() == dummyaddr ){
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        // Create elements to display item details
        const titleElement = document.createElement("h2");
        titleElement.textContent = item.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = item.description;

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: ${web3.utils.fromWei(item.price, "ether")} ETH`;

        

        // Append elements to the item container
        itemContainer.appendChild(titleElement);
        itemContainer.appendChild(descriptionElement);
        itemContainer.appendChild(priceElement);
        

        // Append item container to the item list
        itemList.appendChild(itemContainer);
	}
    });
}


