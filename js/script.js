const $name = $('#name');
const $email = $('#mail');
const $otherTitle = $('#other-title');
const $colorDiv = $('#colors-js-puns');
const $punColors = $('#color option:contains("JS Puns")');
const $heartColors = $('#color option:contains("I \u2665 JS")');
const $activities = $('.activities label');
const $checkboxes = $('.activities input:checkbox');
const $paymentMethod = $('#payment');
const $creditDiv = $('#credit-card');
const $ccNum = $('#cc-num');
const $zipCode = $('#zip');
const $cvv = $('#cvv');

// Add novalidate attribute to form to prevent default validation pop ups

$('form').attr('novalidate', 'novalidate');

// On first page load, set focus on Name input field

$name.focus();

// Function to append an error message and immediately hide it

const appendError = (element, error) => {
    element.append(error);
    error.hide();
}

// Function to either show or hide error message and change border color of
// element

const showHideError = (test, element, error) => {
    if (test) {
        element.css('border-color', "");
        error.hide();
        return true;
    } else {
        element.css('border-color', '#DB0622');
        error.show();
        return false;
    }
}

// Create and append error span for Name input field

const $nameError = $('<span class="error">Please enter a name</span>');
appendError($('label[for="name"]'), $nameError);

// Function to validate format of users input for Name

const nameTest = name => /^\D+$/.test(name);

// Function to check validity of users input for Name, format border, and hide or
// display error message

const validName = () => {
    const $nameInput = $name.val();
    return showHideError(nameTest($nameInput), $name, $nameError);
}

// Run the validName function to display validation error in real time

$name.keyup(function () {
    validName();
});

// Create and append error span for Email input field

const $emailError = $('<span class="error">Please enter a valid email address</span>');
appendError($('label[for="mail"]'), $emailError);

// Function to validate format of users input for Email

const emailTest = email => /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);

// Function to check validity of users input for Email, format border, and hide
// or display error message

const validEmail = () => {
    const $emailInput = $email.val();
    return showHideError(emailTest($emailInput), $email, $emailError);
}

// Run the validEmail function to display validation error in real time

$email.keyup(function () {
    validEmail();
});

// Hide the Other job role text field on page load

$otherTitle.hide();

// Display the Other job role text field when Other is selected from the menu

$("#title").change(function () {
    $otherTitle.toggle($('#title option:selected').text() === 'Other');
});

// Hide the COLOR label and select menu on page load

$colorDiv.hide();

// Only display the Color options that match the option selected in the Design
// drop down menu. When a new Design is selected, the Color drop down menu is
// updated. Display the Color label and select menu only when a T-Shirt design
// is selected from the Design menu

$('#design').change(function () {
    const $userDesign = $('#design option:selected');
    $colorDiv.toggle($userDesign.val() !== 'select');
    $punColors.toggle($userDesign.val() === 'js puns');
    $heartColors.toggle($userDesign.val() === 'heart js');
    if ($userDesign.val() === 'js puns') {
        $punColors.eq(0).prop('selected', true);
    } else if ($userDesign.val() === 'heart js') {
        $heartColors.eq(0).prop('selected', true);
    } 
});

// When the user selects a workshop, disable the checkbox of conflicting
// workshops and grey-out its text. When the user unselects a workshop,
// re-enable the conflicting workshops

const setCheckboxProp = (index, setting) => {
    let color = setting ? 'grey' : '';
    $checkboxes.eq(index).prop('disabled', setting).parent().css('color', color);
}

const conflict = {
    1: 3,
    2: 4, 
    3: 1,
    4: 2
}

$checkboxes.change( () => {  
    for (let i = 1; i <= 4; i++) {
        let conflictIndex = conflict[i];
        if ($checkboxes.eq(i).is(":checked")) {
            setCheckboxProp(conflictIndex, true);
        } else {
            setCheckboxProp(conflictIndex, false);
        }
    }
});

// Create and append a div below the list of activities to display the total cost
// of the activities selected

const $totalDiv = $('<div>Total Cost: $0.00 </div>');
$totalDiv.insertAfter($('.activities'));

// As the user selects and deselects activities, update the running total cost

$checkboxes.change( () => {
    let totalCost = 0;
    $checkboxes.each( i => {
        if ($checkboxes.eq(i).is(':checked')) {
            let detail = $activities.eq(i).text();
            let costString = detail.slice(detail.indexOf('$') + 1);
            totalCost += parseInt(costString, 10);
        }
    });
    $totalDiv.text('Total Cost:  $' + totalCost + '.00');
});

// Create and append error span for Activities checkboxes

const $activitiesError = $('<span class="error">At least one activity must be selected</span>');
appendError($('.activities legend'), $activitiesError);

// Function to make sure user selects at least on checkbox in the activities list, and display or hide error message

const validActivity = () => {
    const $activitiesChecked = $('input:checked').length;
    if ($activitiesChecked === 0) {
        $activitiesError.show();
        return false;
    } else {
        return true;
    }
}

// Display only the credit card div on page load, hide the Paypal and Bitcoin divs

$paymentMethod.val('credit card').prop('selected', true);
$creditDiv.nextAll().hide();

// Display the correct payment div when the user selects Paypal, CC or Bitcoin
// from the dropdown menu

$paymentMethod.change(function () {
    const $userPayment = $('#payment option:selected');
    $paymentMethod.nextAll().hide();
    if ($userPayment.val() === 'credit card') {
        $creditDiv.show();
    } else if ($userPayment.val() === 'paypal') {
        $creditDiv.next().show();
    } else if ($userPayment.val() === 'bitcoin') {
        $creditDiv.next().next().show();
    }
});

// Create and append two conditional error elements for Card Number input field

const $ccBlankError = $('<p class="error">Please enter a valid credit card number</p>');
appendError($creditDiv, $ccBlankError);

const $ccError = $('<p class="error">Please enter a credit card number that is between 13 and 16 digits long</p>');
appendError($creditDiv, $ccError);

// Function to validate format of users input for Card Number

const creditTest = creditCard => /^\d{13,16}$/.test(creditCard);

// Function to check validity of users input for Card Number, format border, and
// hide or display conditional error message

const validCredit = () => {
    const $ccInput = $ccNum.val();
    if ($ccInput === "") {
        $ccNum.css('border-color', '#DB0622');
        $ccBlankError.show();
        $ccError.hide();
        return false;
    } else {
        $ccBlankError.hide();
        return showHideError(creditTest($ccInput), $ccNum, $ccError);
    }
}

// Create and append error p for Zip Code input field

const $zipError = $('<p class="error">Please enter a valid zip code</p>');
appendError($creditDiv, $zipError);

// Function to validate format of users input for Zip Code
const zipTest = zipCode => /^\d{5}$/.test(zipCode);

// Function to check validity of users input for Zip Code, format border, and
// hide or display error message

const validZip = () => {
    const $zipInput = $zipCode.val();
    return showHideError(zipTest($zipInput), $zipCode, $zipError);
}

// Create and append error p for CVV input field

const $cvvError = $('<p class="error">Please enter a valid CVV</p>');
appendError($creditDiv, $cvvError);

// Function to validate format of users input for CVV

const cvvTest = cvv => /^\d{3}$/.test(cvv);

// Function to check validity of users input for CVV, format border, and hide or display error message

const validCvv = () => {
    const $cvvInput = $cvv.val();
    return showHideError(cvvTest($cvvInput), $cvv, $cvvError);
}

// Create and append error p for payment method dropdown menu

const $paymentError = $('<p class="error">Please select a payment method</p>');
$paymentMethod.after($paymentError);
$paymentError.hide();

// Function used to make sure all credit card fields are valid only if the
// credit card payment method is selected. Display an error if the user submits
// the form without a payment option selected

const validPayment = () => {
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

// Create and append error div at top of page for any form submit validation
// errors

const $submitError = $('<div class="error">There was a problem with your submission. Please complete all required fields.</div>');
$('.container').before($submitError);
$submitError.hide();

// Upon submit of form, check validation of all required fields. If any invalid
// fields prevent default page refresh, display all error messages, display
// submit error div. If all required fields are valid, submit form and display
// confirmation alert

$('form').submit(function (e) {
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