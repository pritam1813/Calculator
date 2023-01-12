var operand1 = 0;
var operand2 = null;

//Storing textarea jQuery object in variable 'screenText'
var screenText = $('textarea');


//Handling button click event
$('button').click(function() {

    //Storing Button Value in variable 'value'
    let value = $(this).val();

    //When textarea is empty
    if(screenText.val() === ''){

        //checking if the first key pressed is a number or not
        if(/^[0-9.]/.test(value)){
            screenText.val(value);
        }

        //Storing and showing Answer for last calculation 
        if(value === "Ans" && operand2 != null){
            screenText.val(operand2);
        }
    }
    else{
        switch (true){

            //Condition for button Pressed from 0-9
            case /^[0-9.]/.test(value):
                screenText.val(screenText.val() + value); //updating textarea content
                break;

            //Condition for button Pressed with value of operators
            case /[+-/*]/.test(value):
                screenText.val(screenText.val() + value);
                break;

            //Condition for button Pressed with value of % , can't be done through eval() function
            case /%/.test(value):

                //storing number before the % symbol in ooperand1
                operand1 = parseFloat(screenText.val());
                screenText.val(screenText.val() + value);
                break;

            //Calculating result upon pressing '='
            case /=/.test(value):

                //calculation in case % is present
                if(/%/.test(screenText.val())){
                    operand2 = parseFloat(screenText.val().match(/\d+$/));
                    screenText.val(operand1/100 * operand2);
                    operand2 = screenText.val();
                }
                else{
                    operand2 = eval(screenText.val());
                    screenText.val(operand2);
                }
                break;

                //Functions for other buttons
            case value === "delete":
                screenText.val(screenText.val().replace(/.$/,""));
                break;

            case value === "AC":
                screenText.val(screenText.val().replace(/.*/g,""));
                break;

            case value === "Ans":
                screenText.val(operand2);
                break;

            default:
                screenText.val("Invalid Input");
        }
    }
});

