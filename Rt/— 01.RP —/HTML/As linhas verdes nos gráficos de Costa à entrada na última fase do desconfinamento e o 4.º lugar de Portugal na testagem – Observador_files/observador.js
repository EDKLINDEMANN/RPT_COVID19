(function ($) {

    $(document).ready(function () {
        let parsedUrl = new URL(window.location.href);
        let clickTag = parsedUrl.searchParams.get('clickTag');
        if (clickTag != null) {
            let url = '';
            let new_url = '';
            $('a').each(function () {
                url = $(this).attr('href');
                new_url = clickTag+url;
                $(this).attr('href', new_url);
            });
        }
    });

})(jQuery);