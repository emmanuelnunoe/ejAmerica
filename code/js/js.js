// UABC | ejAmerica
// 10-05-2020
// Emmanuel Nuno Estrella
// CRUD for user management 

// USER  CONTROLLER
var userController = (function(){

    var User = function(id, word1, word2, word3, word4, age, relocation,phone, email){
        this.id = id
        this.word1 = word1;
        this.word2 = word2;
        this.word3 = word3;
        this.word4 = word4;
        this.age = age;
        this.relocation = relocation;
        this.phone = phone;
        this.email = email;

    }

    var data = {
      users:[]
    }
    User.prototype.getName = function() {
        return this.name;
    };

    User.prototype.getAge = function(){
        return this.age;
    }
    
    User.prototype.getEmail = function(){
        return this.email;
    }

    // generate random integer
    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

    // generate random word for name
    var randomWord = function(letters,except, plus){
        var i,word,a,z,flag
        a=97
        z=122
        i=0
        word="s"

        var randChar = String.fromCharCode(randInt); 
        // setup exceptions
        var exeptions =  except // example'[^*aoump""]'

       while (i < letters && word.length < letters ) {

        // select random int
        var randInt = getRandomInt(a,z);
        // convert int to char
        var randChar = String.fromCharCode(randInt); 
        // setup regular expresion
        let regExpFirstWord= new RegExp(exeptions,flag)
        // evaluate regular expresion
        let result = regExpFirstWord.test(randChar)
        // word builder after passing exceptions/RegExp
            if( result )
             {
                 word+=randChar;
                 i++
             }
  
        }
        if(plus)
        {
            randInt= getRandomInt(1,9)
            word+=randInt
        }
      

        return word;
    
    }

    // random User
    var randomUser = function(ID){
            var randomInt, rndAge, relocation, 
                phone, email, usr,exception,
                word1, word2, word3, word4
            // generate random name.
                exception = '[^*aoump""]'
                word1 = randomWord(4,exception,false);
                exception = '[*asdfghjklopuytem]'
                word2 = randomWord(4,exception,false);
                exception = '[^*aeou""]'
                word3 = randomWord(4,exception,true);
                exception = '[t]'
                word4 = randomWord(4,exception,false);
            // generate random age.
                rndAge = getRandomInt(18,46);
            // identify relocation.
                relocation = true
            // generate random phone.
                phone = randomPhone();
                formatedPhone =  phoneFormat(phone)
                console.log(formatedPhone)
            // generate random email.
                email=""
                randomInt = getRandomInt(4,21)
                exception = "[a-z]"
                email = randomWord(randomInt,exception,false)
                email += "@"
                exception ="[^.]"
                randomInt = getRandomInt(5,11)
                email += randomWord(randomInt,exception,false)
                email += "."
                exception = "[^.-_+]"
                randomInt = getRandomInt(2,4)
                email += randomWord(randomInt,exception,false)

            usr = new User(ID,word1,word2,word3,word4,rndAge,relocation, phone, email);

        return usr;
    }

    // generate random phone
    var randomPhone = function(){
        var phoneString,i 
        phoneString=0
        i=1
        while ( i < 11){
            var randInt = getRandomInt(1,10)
            phoneString+=randInt.toString();
            i++
        }
        return phone = parseInt(phoneString,10);
    }
    // display formated phone
    var phoneFormat = function(number){
        var phoneString
        phoneString = number.toString()
        return phoneString.replace(/(\d{1})(\d{3})(\d{2})(\d{2})(\d{2})/, "+$1 ($2) $3 $4 $5");
    }

    // edit user
    // delete user
    // delete all

    // testing
    var add = function(a){
        var x = 5;
        return x + a;
    }

    return {
        // add a new user tor data strutcture
        addNewUser: function(type, word1, word2, word3, word4, age, relocation, phone, email){
            var newUser, ID
            ID =data.users.length
            console.log(ID)
            if(type === "random"){
                newUser = randomUser(ID);
            }else if( type === "input"){
                newUser = new User(ID,word1,word2,word3,word4,age,relocation,phone,email);
            }

            data.users.push(newUser);

            return newUser;
        },
        // get all data from users
        getData: function(){
            return data.users; // TODO: return only specific information
        },
        clearData:function(){
            data.users=[]
            return console.log("All data was cleared succesfully "+ data);

        },
        // test for module
        publicTest : function(){
            return randomUser();
        }

    }



})();


// UICONTROLLER
var UIController = (function(){

    var DOMstrings ={
    inputWord1 :'.input__word1',
    inputWord2 :'.input__word2',
    inputWord3 :'.input__word3',
    inputWord4 :'.input__word4',
    inputAge :'.input__age',
    inputPhone :'.input__phone',
    inputEmail :'.input__email',
    inputSaveButton :'.save__button',
    usersContainer:'.user__list',
    randomUser: '.randomUser__button'
    }

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
            
    return {
        getInput: function() {
            return{
                word1 : document.querySelector(DOMstrings.inputWord1).value,
                word2 : document.querySelector(DOMstrings.inputWord2).value,
                word3 : document.querySelector(DOMstrings.inputWord3).value,
                word4 : document.querySelector(DOMstrings.inputWord4).value,
                age : document.querySelector(DOMstrings.inputAge).value,
                phone : document.querySelector(DOMstrings.inputPhone).value,
                email : document.querySelector(DOMstrings.inputEmail).value
            };

        },
        getDOMstrings: function(){
            return DOMstrings
        },
        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll( DOMstrings.inputWord1 + ', '+ DOMstrings.inputWord2 + ', ' +
             DOMstrings.inputWord3+ ', ' + DOMstrings.inputWord4 +', '+ 
             DOMstrings.inputAge + ', '+  DOMstrings.inputPhone  +', '+
             DOMstrings.inputEmail);
              
             fieldsArr = Array.prototype.slice.call(fields)

             fieldsArr.forEach(function(current, index, array) {
                 current.value=" "
            
            fieldsArr[0].focus()
                 
             });
        },
        validPhone: function(){
            var input = getInput()
            retur ( !isNan(input.phone) && input.phone > 0 && input.validPhone != "")
        },

        addListItem:function(obj){
            var html, newHtml, element
            //HTML With placeholder text
            element = DOMstrings.usersContainer
            html = '<tr><th scope="row">%id%</th><td>%word1% %word2% %word3% %word4%</td><td>%phone%</td><td>%email%</td></tr>';
            console.log("object phone:"+obj.phone)
            // replace the place holder text with actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%word1%',obj.word1);
            newHtml = newHtml.replace('%word2%',obj.word2);
            newHtml = newHtml.replace('%word3%',obj.word3);
            newHtml = newHtml.replace('%word4%',obj.word4);
            newHtml = newHtml.replace('%phone%',obj.phone);
            newHtml = newHtml.replace('%email%',obj.email);

            
            // insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml) 

        },
        validations: function(){
         return validPhone();
        }
    }



})();

// MAIN APP
var controller = (function(userCtrl, UICtrl)
{
    

    var ctrlAddUser = function(){
        var input, newUser,name
        // 1. Get the fields input data
        input = UICtrl.getInput();


        if( UICtrl.validations ) {

            // 2. Add the item to the user controller
            newUser = userCtrl.addNewUser("input",input.word1, input.word2, input.word3, input.word4,input.age,true,input.phone,input.email )

            // 3. Add the item to the UI
            UICtrl.addListItem(newUser);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. update user list
        //  updateUsersList();


        }

                

    }

    ctrlRandomUser = function( obj){
        var newUser,

        newUser = userCtrl.addNewUser("random")
        console.log(newUser)
        UICtrl.addListItem(newUser)

    }

    var displayUsers = function(){
            return console.log(userCtrl.getData())
    }
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        // random user button
        document.querySelector(DOM.inputSaveButton).addEventListener('click',ctrlAddUser)
        // save change from input user button
        document.querySelector(DOM.randomUser).addEventListener('click',ctrlRandomUser)
        // display users in the console
        document.querySelector(".display__button").addEventListener('click',displayUsers)
    }

    var updateUsersList = function(){
        var user = userCtrl.getUsers()
        UICtrl.displayList(users)
    }


    return{

        init: function(){
            console.log("Aplication has started");
            setupEventListeners()

            
        }
    }

})(userController,UIController);

controller.init();
