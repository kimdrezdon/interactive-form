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
function appendError(element, error) {
    element.append(error);
    error.hide();
}

const $nameError = $('<span class="error">Please enter a name</span>');
appendError($('label[for="name"]'), $nameError);

function nameTest(name) {
    return /^\D+$/.test(name);
}

function validName () {
    const $nameInput = $name.val();
    if (nameTest($nameInput)) {
        $name.css('border-color', "");
        $nameError.hide();
        return true;
    } else {
        $name.css('border-color', 'red');
        $nameError.show();
        return false;
    }
}

$name.keyup(function() {
    validName();
});

//email field must be a validly formatted address
//display an error indication if theres a validation error
//real time error message, rather than on submit of the form

const $emailError = $('<span class="error">Please enter a valid email address</span>');
appendError($('label[for="mail"]'), $emailError);

function emailTest(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function validEmail () {
    const $emailInput = $email.val();
    if (emailTest($emailInput)) {
        $email.css('border-color', "");
        $emailError.hide();
        return true;
    } else {
        $email.css('border-color', 'red');
        $emailError.show();
        return false;
    }
}

$email.keyup(function() {
    validEmail();
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

const $totalDiv = $('<div>Total Cost: $0.00 </div>');
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
   
    $totalDiv.text('Total Cost:  $' + totalCost + '.00');
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

const $ccBlankError = $('<p class="error">Please enter a valid credit card number</p>');
appendError($('#credit-card'), $ccBlankError);

const $ccError = $('<p class="error">Please enter a number that is between 13 and 16 digits long</p>');
appendError($('#credit-card'), $ccError);

function creditTest(creditCard) {
    return /^\d{13,16}$/.test(creditCard);
}

function validCredit () {
    const $ccInput = $('#cc-num').val();
    if ($ccInput === "") {
        $('#cc-num').css('border-color', 'red');
        $ccBlankError.show();
        return false;
    } else if (creditTest($ccInput)) {
        $('#cc-num').css('border-color', "");
        $ccError.hide();
        $ccBlankError.hide();
        return true;
    } else {
        $('#cc-num').css('border-color', 'red');
        $ccError.show();
        return false;
    }
}

const $zipError = $('<p class="error">Please enter a valid zip code</p>');
appendError($('#credit-card'), $zipError);

function zipTest(zipCode) {
    return /^\d{5}$/.test(zipCode);
}

function validZip () {
    const $zipInput = $('#zip').val();
    if (zipTest($zipInput)) {
        $('#zip').css('border-color', "");
        $zipError.hide();
        return true;
    } else {
        $('#zip').css('border-color', 'red');
        $zipError.show();
        return false;
    }
}
    
const $cvvError = $('<p class="error">Please enter a valid CVV</p>');
appendError($('#credit-card'), $cvvError);

function cvvTest(cvv) {
    return /^\d{3}$/.test(cvv);
}

function validCvv () {
    const $cvvInput = $('#cvv').val();
    if (cvvTest($cvvInput)) {
        $('#cvv').css('border-color', "");
        $cvvError.hide();
        return true;
    } else {
        $('#cvv').css('border-color', 'red');
        $cvvError.show();
        return false;
    }
}
  
//only validate credit card fields IF credit card payment method is selected
//the user should not be able to submit the form without a payment option selected, "Select Payment Method" is not an option
const $paymentError = $('<p class="error">Please select a payment method</p>');
$('#payment').after($paymentError);
$paymentError.hide();

function validPayment() {
    if ($('#payment option:selected').val() === 'credit card') {
        const credit = validCredit();
        const zip = validZip();
        const cvv = validCvv();
        if (credit && zip && cvv) {
            return true;
        } else {
            return false;
        }
    } else if ($('#payment option:selected').val() === 'select_method') {
        $paymentError.show();
        return false;
    } else {
        return true;
    }
}

//user must select at least one checkbox in the activities list
//display an error indication if theres a validation error
//error message on submit of the form

const $activitiesError = $('<span class="error">At least one activity must be selected</span>');
appendError($('.activities legend'), $activitiesError);

function validActivity () {
    const $activitiesChecked = $('input:checked').length;
    if ($activitiesChecked === 0) {
        $activitiesError.show();
        return false;
    } else {
        return true;
    }
}

/* need to make the form check all validation upon submit SINGLE EVENT LISTENER 
FOR THE FORM, CALLING EACH SECTIONS VALIDATOR FUNCTION- form cannot
be submitted (the page does not refresh when the submit button is 
clicked) until all the following are true (name isn't blank, email is
validly formatted, at least one checkbox is selected, if cc is selected
cc number zip code and cvv are validly formatted) - error messages
for all of these need to appear upon submit as well */

const $submitError = $('<div class="error">There was a problem with your submission. Please complete all required fields.</div>');
$('.container').before($submitError);
$submitError.hide();

$('form').submit(function(e) {
    const a = validActivity();
    const b = validPayment();
    const c = validName();
    const d = validEmail();
    if (a && b && c && d) {
        alert('Your registration has been submitted.');
    } else {
        e.preventDefault();
        $('html').scrollTop(0);
        $submitError.slideDown(1000).delay(3000).slideUp();
    }
});


/*
try to get ok message to appear in the same place as the error message
when correctly formatted
 */