# techdegree-project-3: Interactive Form

This project uses unobtrusive JavaScript to add functionality to a registration 
form. 

The Name and Email input fields are checked for valid formats in real time, 
displaying and hiding error messages accordingly. 

When Other is selected in the Job Role dropdown menu, a text input field appears
for a user to type in their custom title. The text field disappears again if
Other is unselected. 

The Color dropdown menu under Tshirt Info is hidden until the user selects a 
t-shirt design from the Design dropdown menu. The options in the Color menu are
dynamically updated to show only the color options that match the selected tshirt 
design.

The activities list checkboxes do not allow workshops with conflicting time slots
to be selected. As the user selects and deselects activities, the total cost below
the list is updated to show the total amount due.

The credit card payment information is shown by default. When the user selects a new
payment method, only the information related to the selected payment method is 
displayed.

Upon submit of the form, the following form areas are checked for validity and 
completeness. 
    > Name = Cannot be blank or contain any numbers
    > Email = Cannot be blank and must be formatted like a valid email address
    > Activites = At least one checkbox must be checked
    > Only if the Credit Card option is selected:
        > Card Number = Must contain a 13-16 digit number
        > Zip Code = Must contain a 5 digit number
        > CVV = Must contain a 3 digit number

If any of these are invalid the form prevents default refresh and 
displays the corresponding error messages. An error message also flashes on the 
top of the screen informing the user that the submission did not go through and 
will need to fix the errors that are displayed on the page.

The credit card field displays a conditional error message depending on whether
the field was left blank or if the user entered a number with an incorrect 
number of digits.

If all fields are valid, on submit the page refreshes and an alert displays 
informing the user that the registration was successfully submitted.