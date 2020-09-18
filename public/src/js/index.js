import $ from 'jquery'

$(() => {
    const layer_div = $('#layer');
    const wrapper_div = $('#wrapper');
    const subscribe_btn = $('#btn-subscribe');
    const submitForm_btn = $('#btn-submit-subscription-form');
    const subscription_form = $('#subscription-form');
    const close_btn = $('.close');
    const success_div = $('#subscription-form .success');
    const failure_div = $('#subscription-form .failure');
    const successfulSubscriptionMessage_div = $('#successful-registration-message');
    const recipientAddress_text = $('#recipient-address');

    $(subscribe_btn).on('click', () => {
        showLayer(subscription_form);
    });

    $(close_btn).on('click', hideLayer);

    $(subscription_form).on('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        $.ajax({
            url: 'https://wolofacademy.000webhostapp.com/api/mail/subscribe',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend() {
                $(submitForm_btn).attr('disabled', true);
                $(submitForm_btn).find('.loader').show();
                //hideSuccessMessage();
                hideErrorMessage();
            },
            complete() {
                $(submitForm_btn).attr('disabled', false);
                $(submitForm_btn).find('.loader').hide();
            },
            success(response) {
                if (response.success) {
                    e.target.reset();
                    $(recipientAddress_text).text(formData.get('email'));
                    switchVisibleChild(successfulSubscriptionMessage_div);

                } else {
                    showErrorMessage(response.errors[0]);
                }
            },
            error() {
                showErrorMessage("An unknown error occurred. Please retry later.")
            }
        });
    });

    function switchVisibleChild(childToShow) {
        $(layer_div).children()
            .each((index, child) => {
                if ($(child).is($(childToShow))) {
                    $(child).show();

                } else {
                    $(child).hide();
                }
            });
    }

    function showErrorMessage(message) {
        $(failure_div).text(message).show();
    }

    function hideErrorMessage() {
        $(failure_div).text('').hide();
    }

    function showLayer(childToShow = null) {
        if (childToShow !== null) {
            switchVisibleChild(childToShow);
        }

        $(wrapper_div).addClass('blur');
        $(layer_div).css('display', 'flex');
    }

    function hideLayer() {
        $(layer_div).hide();
        $(wrapper_div).removeClass('blur');
    }
});