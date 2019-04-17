const axios = require("axios");

const getRequest = async () => {
  const response = await axios.get(
    "http://www.supermarketownbrandguide.co.uk/api/newfeed.php?json=search&q=beans&apikey=ticrk41z75yq98u7isqz"
  );
  console.log(response.data.items);

  // Set the state
  /* 
   Display the data from the request:
  

    .map((data, index) => {
    const usersAllergies = this.state.allergies;
    const productAllergies = data.properties.contains;

    return (
        <Card
        key={index}
        name={data.title}
        isAllergic={usersAllergies.some(allergy =>
            productAllergies.includes(allergy)
        )}
        action={() => this.handleStorage()}
        />
    );
    })}
  */

  /* 
  Saving to Storage:
  
  index is the element index within the array

  addedItemToItemDirectory = async (index) => {
    Create the object which will be added to the array
    
    let shoppingListItem = {
      id: shortid.generate(),
      name: this.state.item[index].title,
      properties: this.state.item[index].properties.contains
    };

    /*
    Callback approach:
    - Instead of initalising a seperately variable and then pushing the variable is intalized in the callback
    - Await for the set to be set (IMPORTANT)
    - Without waiting the state wouldn't update in time.
    */
   await this.setState(({ shoppingLists }) => ({
    shoppingLists: [shoppingListItem, ...shoppingLists]
  }));

  //Save the updated currentDirectory to the ItemsDirectroy key value
  await AsyncStorage.setItem(
    "ItemsDirectory",
    JSON.stringify(this.state.shoppingLists)
  );

  this.setState({
    isSaveModalVisible: true,
    isAllergicModalVisible: false
  });
};


};

getRequest();

//http://www.supermarketownbrandguide.co.uk/api/newfeed.php?json=search&q=beans&apikey=ticrk41z75yq98u7isqz
