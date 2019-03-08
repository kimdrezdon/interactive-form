const $otherTitle = $('#other-title');
const $allColors = $('#color option');
const $punColors = $('#color option:lt(3)');
const $heartColors = $('#color option:gt(2)');

//on first page load, set focus on first text input field [focus()?]
$('#name').focus();

//name field can't be blank
//display an error indication if theres a validation error
//EXCEEDS EXPECATIONS: real time error message, rather than on submit of the form


//email field must be a validly formatted address
//display an error indication if theres a validation error
//EXCEEDS EXPECATIONS: real time error message, rather than on submit of the form


//hide the Other job role text field initially using JS (default = without JS should be visible)
$otherTitle.hide();

//display the Other job role text field when Other is selected from the menu
$("#title").change(function() {
    if ($('#title option:selected').text() === 'Other') {
        $otherTitle.show();
    } else {
        $otherTitle.hide();
    }
});

//only display the Color options that match the option selected in the Design drop down menu
//JS Puns = Cornflower Blue, Dark Slate Grey, Gold
//I Heart JS = Tomato, Steel Blue, Dim Grey
//when a new Design is selected, the Color drop down menu is updated
$('#design').change(function() {
    $allColors.detach();
    if ($('#design option:selected').val() === 'js puns') {
        $('#color').append($punColors);
    } else if ($('#design option:selected').val() === 'heart js') {
        $('#color').append($heartColors);
    }
});

//EXCEEDS EXPECTATIONS: hide the COLOR label and select menu until a T-Shirt design is selected from the Design menu


//user must select at least one checkbox in the activities list
//display an error indication if theres a validation error
//EXCEEDS EXPECATIONS: real time error message, rather than on submit of the form


//when the user selects a workshop, disable the checkbox of conflicting workshops and dim its text
//when the user unselects a workshop, undisable the conflicting workshops


//as the user selects activities, a running total should display below the list of activities


//display only the credit card information (#credit-card div) on page load, hide the Paypal and Bitcoun info
//if the Credit Card payment option is selected a credit card #, zip code and CVV must be supplied before the form can be submitted
//CC should only accept a 13-16 digit number
//zip code should only accept a 5 digit number
//CVV should only accept a 3 digit number
//display an error indication if theres a validation error for any of these three fields
//EXCEEDS EXPECATIONS: real time error message, rather than on submit of the form


/* EXCEEDS EXPECTATIONS: make an error message conditional (ie: if CC field is blank "Please enter a credit card number" 
or if it only contains 10 numbers "Please enter a number that is between 13 and 16 digits long") */


//display the Paypal info when the user selects Paypal from the dropdown menu, hide the CC and Bitcoin info


//display the Bitcoin info when the user selects Bitcoin from the dropdown menu, hide the Paypal and CC info


//the user should not be able to submit the form without a payment option selected, "Select Payment Method" is not an option