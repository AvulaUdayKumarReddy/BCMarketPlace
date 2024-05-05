//SPDX-License-Identifier:MIT
pragma solidity ^0.8.25;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract market {
// this enum is to maintain the status.    
    enum ItemStatus{
        Active,
        Sold,
        Cancelled
    }
// Item data structure to store the data item.
    struct Item {
        int IID;
        ItemStatus status;
        address seller;
        string title;
        string description;
        uint price;
    }

    event Itemized (
        uint itemId,
        address seller,
        string title,
        uint price
    );

    event Sale(
        uint itemId,
        address buyer,
        uint price
    );

    
uint private _itemId=0;
int private c=-1;
mapping(uint=>Item) private _items;

function getItems(uint itemId) public view returns(Item memory) {
    return _items[itemId];

}
function listItems(string memory title, string memory description,uint price) external {
   c++; // to maintain the ID
// to initialize the item
 Item memory item =Item(
    c,
    ItemStatus.Active,
    msg.sender,
    title,
    description,
    price
 );

 _items[_itemId]=item;
  _itemId++;

 emit Itemized(
    _itemId,
    msg.sender,
    title,
    price
 );
}
// this function is for buying
function buy(uint itemId) external payable  {
    Item storage item = _items[itemId];
// checks if listing is active
    require (item.status == ItemStatus.Active,"Listing is not active");
//checks if the buyer is seller
    require (msg.sender!=item.seller, "Seller cannot by their own things");
//checks if the buyer has sufficient funds
    require(msg.value >= item.price, "Insufficient amount");
//changing the item status
    item.status = ItemStatus.Sold;
//transfering the ETH
    payable(item.seller).transfer(item.price);
    item.seller = msg.sender;
    emit Sale(
    _itemId,
    msg.sender,
    item.price
 );

}
// function that returns all items to website.
function getAllItems() public view returns (Item[] memory) {
        Item[] memory allItems = new Item[](_itemId);
        for (uint256 i = 0; i < _itemId; i++) {
            allItems[i] = _items[i];
        }
        return allItems;
    }

/*function cancel(uint itemId) public {
    Item storage item =  _items[itemId];

    require (msg.sender==item.seller, "Only seller can cancel the item");
    require (item.status == ItemStatus.Active,"Listing is not active");

    item.status = ItemStatus.Cancelled;

    emit Cancel(itemId, item.seller);
    
}*/
}
