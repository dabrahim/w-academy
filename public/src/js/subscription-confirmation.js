import $ from 'jquery'

$(() => {
    const params = new URLSearchParams(window.location.search);
    const goHome_btn = $('#go-home-btn');
    const message_div = $('#message');

    if (params.has('token')) {
        const token = params.get('token');

        $.post('https://wolofacademy.000webhostapp.com/api/token/validate', {token}, response => {

            if (response.success) {
                onSuccess(response.message);
            } else {
                onFailure(response.message);
            }

        }, 'json')
            .catch(e => {
                onFailure("Un unknown error occurred. Please retry later");
            });
    }

    function onSuccess(msg) {
        $(message_div).text(msg);
        showGoHomeBtn();
    }

    function onFailure(msg) {
        $(message_div).text(msg);
        showGoHomeBtn();
    }

    function showGoHomeBtn() {
        $(goHome_btn).show();
    }
});