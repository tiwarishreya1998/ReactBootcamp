const user = {
    firstName:'Sahil',
    lastName: 'Dua',
    Address: {
    Line1: 'address line 1',
    Line2: 'address line 2',
    State: 'Delhi',
    Pin: 110085,
    Country: 'India',
    City: 'New Delhi',
    },
    phoneNo: 9999999999
    }
const {firstName,lastName,Address:{Line1,Line2,State,Pin,Country,City},phoneNo}=user;
export{
    Line1,Line2,State,Pin,Country,City
};