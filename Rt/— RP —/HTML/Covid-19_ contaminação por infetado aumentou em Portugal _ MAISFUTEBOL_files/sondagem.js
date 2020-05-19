
// sondagem
/* Clique numa opção de sondagem */
function selectOption(pollSelector, optionSelector) {
    $(pollSelector + " li").removeClass('selected');
    $(pollSelector +" "+optionSelector + "li").addClass('selected');
    $(pollSelector +" "+optionSelector).attr('checked', true);
}

function showResults(pollSelector) {
    $(pollSelector + ' .sondagemBox .bar').toggle('slow');
    var texto = $(pollSelector + ' .texto').html();
    if (texto == 'Ver resultados') {
        $(pollSelector + ' .texto').html('Esconder resultados');
    } else {
        $(pollSelector + ' .texto').html('Ver resultados');
    }
}


function vote(pollSelector) {
 debugger;
    // check se foi escolhida resposta
    if (!$(pollSelector+' input[name="respostaId"]:checked').length) {
        alert('Escolha primeiro uma das respostas. Obrigado.');
        return;
    }
    // envio da resposta
    var sondagemId = $(pollSelector+' input[name="sondagemId"]').val();
    // check do cookie
    if ($.cookie('maisfutebol_sond' + sondagemId) !== null && $.cookie('maisfutebol_sond' + sondagemId) !== undefined) {
        alert('Já votou nesta sondagem.');
        return false;
    }

    // desativar votar e mostrar loading
    $(pollSelector+' .btVotar').attr('disabled', 'disabled').val('A enviar...');

    $.post('/vota.do', {'sondagemId': sondagemId, respostaId: $(pollSelector+' input[name="respostaId"]:checked').val(), utilizador: $('input[name="utilizador"]').val()}).always(function (e) {
        debugger;
        $(pollSelector+' .btVotar').val('Obrigado'); // obrigado
        $(pollSelector+' .btVotar').addClass("inativo"); // inativo class 
        $(pollSelector+' .bar').fadeIn('slow'); // mostrar resultados
        $(pollSelector+' li').removeClass('selected');
        var expire = new Date(Date.now() + (10 * 60 * 1000)); // expire de 10mins
        $.cookie('maisfutebol_sond' + sondagemId, '1', {expires: expire});
    });
    return false;
}


//AQUI
function sondagemComLogin(pollSelector,elemToHide) {
    $(pollSelector+" "+elemToHide).hide();
    if (window.iol.isUserLoggedIn()) {
        $(pollSelector+" "+elemToHide).show();
        $(pollSelector+" .loading").hide();
        $(pollSelector+' input[name="utilizador"]').val(window.iol.getLoggedUser().id);
    } else {
        $(pollSelector+" .loading").html('<div id="iol-forum-login-btn" ><b>Para participar, por favor faça</b><input type="button" onclick="callLogin()" value="Login" style="background-color:green;font-family: inherit;width: auto;padding: 8px 20px;cursor: pointer;color: #fff;text-transform: uppercase;font-size: 16px;border: 0;font-family: \'Roboto\', sans-serif;font-weight: 500;border-radius: 6px;"> </div>');
    }

}