let msgbory = document.getElementById("bp_bory");
let tagHtml = []
let indexMsg = 0;
let contexto = true;
let numberMensagem = 0;
let listidOptions = [];

function imprimir(tagx){
  let tagTexto="";
  // console.log(tagx);
  tagx.forEach((mensagem)=>{
    console.log(indexMsg);
    console.log(numberMensagem);
    console.log(mensagem);
    tagTexto += mensagem;
  });
  // console.log(tagTexto)
  msgbory.innerHTML = tagTexto;
}

function ativarBotoes(listidOptions){
  if(listidOptions[0]){
    var buttonOption0 = document.getElementById(listidOptions[0]);
    buttonOption0.addEventListener('click',function(evento){
      enviar_mensagem(buttonOption0.value,numberMensagem);
      
    });
  }
  if(listidOptions[1]){
    var buttonOption1 = document.getElementById(listidOptions[1]);
    buttonOption1.addEventListener('click',function(evento){
      enviar_mensagem(buttonOption1.value,numberMensagem);
      
    });
  }
  if(listidOptions[2]){
    var buttonOption2 = document.getElementById(listidOptions[2]);
    buttonOption2.addEventListener('click',function(evento){
      enviar_mensagem(buttonOption2.value,numberMensagem);
      
    });
  }
  if(listidOptions[3]){
    var buttonOption3 = document.getElementById(listidOptions[3]);
    buttonOption3.addEventListener('click',function(evento){
      enviar_mensagem(buttonOption3.value,numberMensagem);
      
    });
  }
  if(listidOptions[4]){
    var buttonOption4 = document.getElementById(listidOptions[4]);
    buttonOption4.addEventListener('click',function(evento){
      enviar_mensagem(buttonOption4.value,numberMensagem);
      
    });
  }
}



  


// Função que pega o jason da promise
function limpar_dados(json){
  
  for (let i = 0; i < json.length; i++){
    if(json[i].text){
      // console.log(json[i].text);
      tagHtml.push(`<div class = 'dp_interlocutor'><div id ="box${indexMsg}" class = 'msgtext'><p>${json[i].text}</p></div></div>`);
      numberMensagem++;
      indexMsg++;
    }
    if(json[i].options){
      let tag = "";
      tag += `<div id ="box${indexMsg}" class = 'box-option dp_interlocutor'>`;
      
      

      for (let n = 0; n < json[i].options.length; n++){
        if(json[i].options[n].label){
          // console.log(json[i].options[n].label);
          tag += `<button class="option-item" id = "msv${numberMensagem}${n}" value="${json[i].options[n].label}">${json[i].options[n].label}</button>`
          listidOptions.push(`msv${numberMensagem}${n}`)
        }
      }
      tag +="</div>"
      tagHtml.push(tag);
      indexMsg++;
    }
  }
  
  
  // return tag;
}



// Função de conexão da API
function enviar_mensagem(mensagem_input,numberMensagem){
  // console.log("Nova mensagem enviada")
  var msgApi = fetch("http://127.0.0.1:1880/conversa",{
    method: 'POST',
    
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mensagem: mensagem_input,
      chatId: 1234567890,
      mensagemId: numberMensagem
    })
  })
  .then(dado => dado.json())
  .then(data => {
    json = data;
    limpar_dados(json);
    imprimir(tagHtml);
    oisitioBar();
    ativarBotoes(listidOptions);
  })
  .catch(error => {
    console.error(error);
  });
}





// Função que mantem o scroll da barra de rolagem no final
function oisitioBar(){
  var divElement = document.getElementById("box_mensagens");
  divElement.scrollTop = divElement.scrollHeight - divElement.clientHeight;
};



// Funções de abertura e fechamento do bate-papo
var poup_up = document.querySelector(".poup-up");
var fechar_bate_papo = document.querySelector("#fechar_bate_papo");
var batepapo_conteiner = document.querySelector(".batepapo_conteiner");
var minimizar_bate_papo = document.querySelector("#minimizar_bate_papo");
var bory_batepapo = document.getElementById("box_mensagens");
var bory_sender = document.getElementById("bp_sender");

// Abrir o bate-papo
poup_up.addEventListener('click',function(event){
  if(poup_up.classList.contains("visivel"))
    poup_up.classList.remove("visivel"); 
  if(batepapo_conteiner.classList.contains("invisivel"))
    batepapo_conteiner.classList.remove("invisivel");
  poup_up.classList.add("invisivel");
  batepapo_conteiner.classList.add("visivel");
  if (contexto){
    var primeiraMensagem = "Exames"
    enviar_mensagem("exames",numberMensagem);

    tagHtml.push(`<div class = 'dp_locutor'><div id ="box${indexMsg}" class = 'msgtext'><p>${primeiraMensagem}</p></div></div>`);
    imprimir(tagHtml);
    oisitioBar();
    numberMensagem++
    indexMsg++
    contexto = false;
  }
});

// Fecha a janela do bate-papo
fechar_bate_papo.addEventListener('click',function(event){
  if(poup_up.classList.contains("invisivel"))
    poup_up.classList.remove("invisivel"); 
    tagHtml=[];
    contexto = true;
    numberMensagem = 0;
    indexMsg = 0;
    imprimir(tagHtml);
  if(batepapo_conteiner.classList.contains("visivel"))
    batepapo_conteiner.classList.remove("visivel");
  poup_up.classList.add("visivel");
  batepapo_conteiner.classList.add("invisivel");
});

// Minimiza a janela do bate-papo
minimizar_bate_papo.addEventListener('click',function(event){
  if(bory_sender.classList.contains("invisivel")){
    bory_sender.classList.remove("invisivel"); 
    bory_batepapo.classList.remove("invisivel"); 
    bory_sender.classList.add("visivel"); 
    bory_batepapo.classList.add("visivel");
    if(fechar_bate_papo.classList.contains("invisivel"))
      fechar_bate_papo.classList.remove("invisivel"); 
    fechar_bate_papo.classList.add("visivel");  
  }else if(bory_sender.classList.contains("visivel")){
    bory_sender.classList.remove("visivel"); 
    bory_batepapo.classList.remove("visivel"); 
    bory_sender.classList.add("invisivel"); 
    bory_batepapo.classList.add("invisivel");
    if(fechar_bate_papo.classList.contains("visivel"))
      fechar_bate_papo.classList.remove("visivel"); 
    fechar_bate_papo.classList.add("invisivel");  
  }else{
    bory_sender.classList.add("invisivel"); 
    bory_batepapo.classList.add("invisivel"); 
    fechar_bate_papo.classList.add("invisivel"); 
  }

});







// Recebe o valor da mensagem escrita
const campoInput = document.querySelector('form');
campoInput.addEventListener('submit',function(evente){
  evente.preventDefault();
  var elementoInput = document.getElementById("input_sender");
  var msgImput = elementoInput.value;
  if( msgImput != " " ){
    elementoInput.value = "";
    tagHtml.push(`<div class = 'dp_locutor'><div id ="box${indexMsg}" class = 'msgtext'><p>${msgImput}</p></div></div>`);
    imprimir(tagHtml);
    oisitioBar();
    enviar_mensagem(msgImput,numberMensagem);
    numberMensagem++
    indexMsg++
  };
});

















