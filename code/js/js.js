console.log("JS is working");

// UABC | ejAmerica
// 10-05-2020
// Emmanuel Nuno Estrella
// CRUD for user management 

// USER  CONTROLLER
var userController = (function(){

    var User = function(name, age, relocation,phone, email){
        this.name = name;
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
    var randomUser = function(){
            var rndName, rndAge, relocation, 
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
                rndName = word1+" "+word2+" "+word3+" "+word4
            // generate random age.
                rndAge = getRandomInt(18,46);
            // identify relocation.
                relocation = true
            // generate random phone.
                phone = randomPhone();
                formatedPhone =  phoneFormat(phone)
                console.log(formatedPhone)
            // generate random email.
                email = "myEmail@mail.com"
            usr = new User(rndName,rndAge,relocation, phone,email);

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
        addNewUser: function(type, name, age, relocation, phone, email){
            var newUser

            if(type === "random"){
                newUser = randomUser();
            }else if( type === "input"){
                newUser = new User(name,age,relocation,phone,email);
            }

            data.users.push(newUser);

            return newUser;
        },
        // get all data from users
        getData: function(){
            return data; // TODO: return only specific information
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
    inputSaveButton :'.save__button'
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

            fields = document.querySelectorAll(DOMstrings.name + ', ' +
             DOMstrings.age + ','+ DOMstrings.relocation+','+ 
             DOMstrings.phoneString+','+ DOMstrings.email);
        },
        displayUsers: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.name;

        }
    }



})();

// MAIN APP
var controller = (function(userCtrl, UICtrl)
{
    

    var ctrlAddUser = function(){
        var input, newUser;
      // 1. Get the fields input data
        input = UICtrl.getInput();
        console.log("It works");
        if(true){

        // 2. Add the item to the user controller
        newUser = userCtrl.addNewUser("input",input.word1+" "+input.word2+" "+input.word3,
        input.age,true,input.phone,input.email )
        // 3. Add the item to the UI
        //UICtrl.addListItem(newUser);

        // 4. Clear the fields
        //UICtrl.clearFields();

        // 5. update user list
       //  updateUsersList();
                

        }


    }

    var displayUsers = function(){
            return console.log(userCtrl.getData())
    }
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputSaveButton).addEventListener('click',ctrlAddUser)
        document.querySelector(".display__button").addEventListener('click',displayUsers)
    }

    var updateUsersList = function(){
        var user = userCtrl.getUsers()
        UICtrl.displayList(users)
    }


    return{

        init: function(){
            setupEventListeners()
            console.log("Aplication has started");
            userCtrl.getData();

            
        }
    }

})(userController,UIController);

controller.init();
