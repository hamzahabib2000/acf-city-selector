// JS File for Country Field
(function($) {

    jQuery(document).ready(function() {

        var country = $("select[name*='countryCode']");
        var state = $("select[name*='stateCode']");

        if (country.length) {
            country.on('change', function () {

                var $this = $(this);

                get_states($(this).val(), function (response) {
                    var obj = JSON.parse(response);
                    var len = obj.length;
                    var $stateValues = '';

                    $("select[name*='stateCode']").empty();
                    $("select[name*='cityName']").empty();
                    for (i = 0; i < len; i++) {
                        var mystate = obj[i];

                        $stateValues += '<option value="' + mystate.country_code + '-' + mystate.state_code + '">' + mystate.state_name + '</option>';

                    }
                    $("select[name*='stateCode']").append($stateValues);

                });
            });
        }

        if (state.length) {

            state.on('change', function () {

                var $this = $(this);

                get_cities($(this).val(), function (response) {

                    var obj = JSON.parse(response);
                    var len = obj.length;
                    var $cityValues = '';

                    $("select[name*='cityName']").empty();
                    for (i = 0; i < len; i++) {
                        var mycity = obj[i];
                        $cityValues += '<option value="' + mycity.city_name + '">' + mycity.city_name + '</option>';
                    }
                    $("select[name*='cityName']").append($cityValues);

                });
            });
        }

        function get_states(countryCODE, callback) {

            var data = {
                action: 'get_states_call',
                country_code: countryCODE
            };

            $.post(ajaxurl, data, function (response) {
                callback(response);
            });
        }

        function get_cities(stateCODE, callback) {

            var data = {
                action: 'get_cities_call',
                row_code: stateCODE
            };

            $.post(ajaxurl, data, function (response) {
                callback(response);
            });
        }

        // Load select states when editing a post
        function admin_post_edit_load_states() {
            get_states(city_selector_vars.countryCode, function (response) {

                var stored_state = city_selector_vars.stateCode;
                var obj          = JSON.parse(response);
                var len          = obj.length;
                var $stateValues = '';

                $("select[name*='stateCode']").fadeIn();
                for (i = 0; i < len; i++) {
                    var mystate = obj[i];
                    var current_state = mystate.country_code + '-' + mystate.state_code;
                    if (current_state == stored_state) {
                        var selected = ' selected="selected"';
                    } else {
                        var selected = false;
                    }
                    $stateValues += '<option value="' + mystate.country_code + '-' + mystate.state_code + '"' + selected + '>' + mystate.state_name + '</option>';

                }
                $("select[name*='stateCode']").append($stateValues);

            });
        }

        // Load select cities when editing a post
        function admin_post_edit_load_cities() {
            // $("select[name*='cityName']").hide();
            get_cities(city_selector_vars.stateCode, function (response) {

                var stored_city = city_selector_vars.cityName;
                var obj         = JSON.parse(response);
                var len         = obj.length;
                var $cityValues = '';

                $("select[name*='cityName']").fadeIn();
                for (i = 0; i < len; i++) {
                    var mycity = obj[i];
                    if (mycity.city_name == stored_city) {
                        var selected = ' selected="selected"';
                    } else {
                        var selected = false;
                    }
                    $cityValues += '<option value="' + mycity.city_name + '"' + selected + '>' + mycity.city_name + '</option>';
                }
                $("select[name*='cityName']").append($cityValues);

            });
        }

        if (typeof city_selector_vars !== "undefined") {
            admin_post_edit_load_states();
            admin_post_edit_load_cities();
        }
    });

})(jQuery);

