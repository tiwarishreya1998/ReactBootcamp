//Question 1
import{arr2}from './ques1';
console.log('Question 1:Given this array: `[3,62,234,7,23,74,23,76,92]`, Using arrow function, create an array of the numbers greater than `70`');
console.log(arr2);

//Question 2
import{addIntoArray,getTotal,arrayOfSec,findFlexItems,mapOfTimeStrings} from './ques2';
console.log('Question 2');
    //a. Select all the list items on the page and convert to array.
    addIntoArray();

    //b. Filter for only the elements that contain the word 'flexbox'
    findFlexItems();

    //c. Map down to a list of time strings
    mapOfTimeStrings();

    //d. Map to an array of seconds
    arrayOfSec();

    //e. Reduce to get total using .filter and .map
    getTotal();

//Question 3
import{markup} from './ques3'
console.log('Question 3:');
console.log(markup);


//Question 4
import{Line1,Line2,State,Pin,Country,City}from './ques4';
console.log('Question 4');
console.log('Line1:',Line1,'Line 2:',Line2,'State:',State,'Pin:',Pin,'Country',Country,'City',City);

//Question 5
import {uniqueData} from './ques5'
console.log('Question 5:Filter unique array members using Set.');
console.log(uniqueData);

//Question 6
import{getAllCombinations} from './ques6';
console.log('Question 6:Find the possible combinations of a string and store them in a MAP');
console.log(getAllCombinations("ABC"));

//Question 7
import {Vehicle}from './ques7';

//Question 8
import{sum,sub,mul,div} from './ques8'
console.log('Question 8:Write a program to implement a class having static functions');
console.log(sum,'is the addition');
console.log(sub,'is the subtraction');
console.log(mul,'is the multiplication');
console.log(div,'is the division');

//Question 9
import{areaCir,areaRec,areaCyl} from './ques9'
console.log('Question 9:Import a module containing the constants and method for calculating area of circle, rectangle, cylinder.');
console.log('Area of Circle: ',areaCir(5));
console.log('Area of Rectangle: ',areaRec(8,9));
console.log('Area of Cylinder: ',areaCyl(5,6));


//Question 10
import {uniqueName} from './ques10';
console.log('Question 10 :Import a module for filtering unique elements in an array.');
console.log(uniqueName);

//Question 11
import{flattenArray} from './ques11';
console.log('Question 11:Write a program to flatten a nested array to single level using arrow functions.');
flattenArray();

//Question 12
import {list} from "./ques12";


//Question 13
import{ addValueToSet,addValueToMap} from './ques13';
console.log('Question 13:Implement Map and Set using Es6')
addValueToSet();
addValueToMap();

//Question 14
import {stack} from "./ques14";