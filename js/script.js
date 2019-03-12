const $otherTitle = $('#other-title');
const $allColors = $('#color option');
const $punColors = $('#color option:lt(3)');
const $heartColors = $('#color option:gt(2)');
const $name = $('#name');
const $email = $('#mail');

//on first page load, set focus on first text input field [focus()?]
$name.focus();

//name field can't be blank
//display an error indication if theres a validation error
//real time error message, rather than on submit of the form

const $nameError = $('<span class="error-span">Name is required</span>');
$name.after($nameError);
$nameError.hide();

function validName(name) {
    return /^\D+$/.test(name);
}

$name.keyup(function() {
    const $nameInput = $name.val();
    if (validName($nameInput)) {
        $(this).css('border-color', "");
    } else {
        $(this).css('border-color', 'red');
        $nameError.show();
    }
});

//email field must be a validly formatted address
//display an error indication if theres a validation error
//real time error message, rather than on submit of the form

const $emailError = $('<span class="error-span">Please enter a valid email address</span>');
$email.after($emailError);
$emailError.hide();

function validEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

$email.keyup(function() {
    const $emailInput = $email.val();
    if (validEmail($emailInput)) {
        $(this).css('border-color', "");
    } else {
        $(this).css('border-color', 'red');
        $emailError.show();
    }
});

//hide the Other job role text field initially using JS (default = without JS should be visible)
//display the Other job role text field when Other is selected from the menu

$otherTitle.hide();

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
//hide the COLOR label and select menu until a T-Shirt design is selected from the Design menu

$('#colors-js-puns').hide();

$('#design').change(function() {
    $allColors.detach();
    $('#colors-js-puns').show();
    const $userDesign = $('#design option:selected');
    if ($userDesign.val() === 'js puns') {
        $('#color').append($punColors);
    } else if ($userDesign.val() === 'heart js') {
        $('#color').append($heartColors);
    } else {
        $('#color').append($allColors);
        $('#colors-js-puns').hide();
    }
});

//when the user selects a workshop, disable the checkbox of conflicting workshops and dim its text
//when the user unselects a workshop, undisable the conflicting workshops

const $checkboxes = $('.activities input:checkbox');
$checkboxes.change(function(){
    if ($checkboxes.eq(1).is(":checked")) {
        $checkboxes.eq(3).prop('disabled', true).parent().css('color', 'grey');
    } else {
        $checkboxes.eq(3).prop('disabled', false).parent().css('color', '');
    }
    if ($checkboxes.eq(2).is(":checked")) {
        $checkboxes.eq(4).prop('disabled', true).parent().css('color', 'grey');
    } else {
        $checkboxes.eq(4).prop('disabled', false).parent().css('color', '');
    }
    if ($checkboxes.eq(3).is(":checked")) {
        $checkboxes.eq(1).prop('disabled', true).parent().css('color', 'grey');
    } else {
        $checkboxes.eq(1).prop('disabled', false).parent().css('color', '');
    }
    if ($checkboxes.eq(4).is(":checked")) {
        $checkboxes.eq(2).prop('disabled', true).parent().css('color', 'grey');
    } else {
        $checkboxes.eq(2).prop('disabled', false).parent().css('color', '');
    }
});

//as the user selects activities, a running total should display below the list of activities

const $totalDiv = $('<div>Total Cost: $0 </div>');
$totalDiv.insertAfter($('.activities'));

$checkboxes.change(function(){
    let totalCost = 0;

    if ($checkboxes.eq(0).is(":checked")) {
        totalCost += 200;
    } 

    $checkboxes.each(function( i ) {
        if (i > 0 && $checkboxes.eq(i).is(':checked')) {
            totalCost += 100;
        }
    });
   
    $totalDiv.text('Total Cost: $' + totalCost);
});

//display only the credit card information (#credit-card div) on page load, hide the Paypal and Bitcoun info
//if the Credit Card payment option is selected a credit card #, zip code and CVV must be supplied before the form can be submitted
//display the Paypal info when the user selects Paypal from the dropdown menu, hide the CC and Bitcoin info
//display the Bitcoin info when the user selects Bitcoin from the dropdown menu, hide the Paypal and CC info

$('#payment').val('credit card').prop('selected', true);
$('#credit-card').nextAll().hide();

$('#payment').change(function() {
    const $userPayment = $('#payment option:selected');
    $('#payment').nextAll().hide();
    if ($userPayment.val() === 'credit card') {
        $('#credit-card').show();
    } else if ($userPayment.val() === 'paypal') {
        $('#credit-card').next().show();
    } else if ($userPayment.val() === 'bitcoin') {
        $('#credit-card').next().next().show();
    }
});

//CC should only accept a 13-16 digit number
//zip code should only accept a 5 digit number
//CVV should only accept a 3 digit number
//display an error indication if theres a validation error for any of these three fields
/* EXCEEDS EXPECTATIONS: make an error message conditional (ie: if CC field is blank "Please enter a credit card number" 
or if it only contains 10 numbers "Please enter a number that is between 13 and 16 digits long") */

//the user should not be able to submit the form without a payment option selected, "Select Payment Method" is not an option

//user must select at least one checkbox in the activities list
//display an error indication if theres a validation error
//error message on submit of the form

const $activitiesError = $('<span class="error-span">At least one activity must be selected</span>');
$('.activities').after($activitiesError);
$activitiesError.hide();

$('form').submit(function(e) {
    alert("Please fix the errors before submitting");
    const $activitiesChecked = $('input:checked').length;
    if ($activitiesChecked < 1) {
        $activitiesError.show();
    }
    e.preventDefault();
});