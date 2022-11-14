
var total = '';
$(document).ready(function() {

    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
          if (this.hash !== "") {
              event.preventDefault();
              var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 900, function(){
                      window.location.hash = hash;
                  });
            }
  });
    var juros = 1.019;
    var valor = '';
    var parcelas = '';
    var vpar='';

    $('.cadastroCliente').on('change', function(e) {

        valor = Number($('#valor').val().replace(/\./g, '').replace(',', '.') || 0);
        parcelas = Number($('#nParcelas').val());

        if($("#nParcelas").val() < 1 ||  $("#nParcelas").val()  >  48){
            $("#nParcelas").val('');
            return false
        };

        vpar =  ( juros ** parcelas * valor / parcelas);
        total = parseFloat(vpar) * parseInt($('#nParcelas').val());
        $('#vParcela').text('R$' +  vpar.toFixed(2));
        mostraResumo();

    });

});


function mostraResumo() {

    var html = '<div class="contrato" >' +
                    '<span> Eu<b> ' +$("#nomec").val()+ ' </b>portador do <b>CPF : ' +$("#cpf").val()+ '</b> nascido em <b>' +$("#ddn").val()+
                        '</b> desejo realizar a contratação de um Empréstimo Pessoal, que será enviado no <b> PIX: ' + $('#chave').val() +'</b>.<br>'+
                        'valor Emprestado: <b>R$ ' +$("#valor").val()+ '</b>.<br>' +
                        'parcelado em <b>' +$("#nParcelas").val()+ '</b> vezes.<br>' +
                        'Vencimento ao dia <b>'+ $("#vVencimento").val()+'</b> de cada mês.<br>'+
                        'Resultando o valor mensal a pagar de:<b> R$' +$("#vParcela").text()+ '</b>.<br>' +
                        'Taxa de Juros : 1,99% a.m. <br>'+
                        'Valor total:<b> R$' + total.toFixed(2) + '</b><br>'+

                    '</span>'
                '</div>'


    var today = new Date();
    var mes= '';
    var ano= '';
    var parc= '';

    $(".resumo").empty();
    mes = today.getMonth()
    ano = today.getFullYear()
    html += '<table style="margin:1em; padding:2em;">';

    for (var i = 1; i <= $("#nParcelas").val(); i++) {

        if(mes >= 12) {
            mes = 1;
            ano += 1;
        } else {
            mes += 1;
        }

        date = ano+'-'+mes+'-'+$("#vVencimento").val();
        parc = ""+ $("#vParcela").text();


        html += ""
        html += "<tr>"
        html +=     "<td> Parcela: " + i + "</td>"
        html +=     "<td> Vencimento: " + date + "</td>"
        html +=     "<td> Valor da Parcela:" + parc + "<td>"

    }

    $(".resumo").append(html)

}

function verificarCadastro() {

    if($("#cpf").val()  == '') return false;
    if($("#ddn").val() == '') return false;
    if($("#valor").val() == '') return false;
    if($("#nParcelas").val() == '') return false;
    if($("#vVencimento").val() == '') return false;

return true;

}


function limparCadastro() {

    if(!verificarCadastro()) return false;

    alert('Emprestimo enviado para validação de dados logo entraremos em contato por email!');

    $("#cpf").val('');
    $("#ddn").val('');
    $("#valor").val('');
    $("#nParcelas").val('');
    $("#vVencimento").val('');

    $(".resumo").empty();

}
