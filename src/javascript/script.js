function getChartype(){
    const uppercase = document.getElementById("include_uppercase").checked;
    const lowercase = document.getElementById("include_lowercase").checked;
    const numbers = document.getElementById("include_number").checked;
    const special = document.getElementById("include_special_caracters").checked;

   const charTypes = [];

   if(uppercase){
       charTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
   }
   if(lowercase){
       charTypes.push("abcdefghijklmnopqrstuvwxyz");
   }
   if(numbers){
       charTypes.push("0123456789");
   }
   if(special){
       charTypes.push("!@#$%^&*()_+[]{}|;:,.<>?");
   }

   return charTypes;
}

function getSize(){
    const size = document.getElementById("size").value;
    if(isNaN(size) || size < 6 || size > 120){
        message("Quantidade de caracteres inválida! (6 a 120)", "error");
        return;
    }
    return parseInt(size);
}

function message(text, status = 'success'){
    Toastify({
            text: text,
            duration: 3000,
            gravity: "top",
            position: "center",
            style:{
                background: status === 'success' ? "#8BC34A" : "#dc2626",
                boxShadow: "none",
            }
            
    }).showToast();
}

function randomCharType(charTypes){
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword( size, charTypes){
    let passwordGenerate = "";
    while(passwordGenerate.length < size){
       passwordGenerate += randomCharType(charTypes);
    }
    return passwordGenerate;
}

document.getElementById("generator").addEventListener("click", function(){
    const size = getSize();
    const charTypes = getChartype();
    if(!size){
        return;
    }
    if(!charTypes.length){
        message("Selecione pelo menos um tipo de caractere!", "#error");
        return;
    }

    const password = generatePassword(size, charTypes);

    document.getElementById("password").textContent = password;
    document.querySelector(".password_container").style.display = "flex";

});


document.getElementById("copy").addEventListener("click", function(){
    const password = document.getElementById("password").textContent;
    navigator.clipboard.writeText(password).then(function() {
        message("Senha copiada!", "success");
    }, function(err) {
        message("Erro ao copiar a senha!", "error");
    });
})