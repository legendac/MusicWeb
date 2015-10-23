
var player;
var feed;




 //    feed = new Instafeed({
	//     get: 'tagged',
	//     tagName: 'mozart',
	//     clientId: ''
	// });
	// feed.run();

$(document).ready(function() {


    $('.allRoundFamous').click(function(e) {
        var selected = "Composer"
            //if selected is all-time, remove change category? 

        //endpoint used for Output WITHOUT Inferencing
        var endpoint = 'http://localhost:5000/all';
        var format = 'JSON';

        $.get('/all', data = {

        }, function(json) {
            //alert(json);

            try {

                var vars = json.head.vars;

                var ul = $('<ul></ul>');
                ul.addClass('list-group nav');

                $.each(json.results.bindings, function(index, value) {
                    var li = $('<li></li>');
                    li.addClass('list-group-item composer-item');

                    var spanAnchor = $('<a></a>');
                    $.each(vars, function(index, v) {
                        var v_type = value[v]['type'];
                        var v_value = value[v]['value'];

                        var span = $('<span></span>')
                            //li.append('<strong>' + v + '</strong><br/>');

                        if (v_type == 'uri') {


                            var v_valueFormatted = v_value.replace("http://dbpedia.org/resource/", "");
                            //var value_wiki = "https://en.wikipedia.org/w/index.php?printable=yes&title=" + v_valueFormatted;

                            spanAnchor.attr('id', v_valueFormatted);

                            v_valueFormatted = v_valueFormatted.split('_').join(' ');

                            var v_valueUtf;
                            try {
                                // If the string is UTF-8, this will work and not throw an error.
                                v_valueUtf = decode_utf8(v_valueFormatted);
                            } catch (e) {
                                // If it isn't, an error will be thrown, and we can asume that we have an ISO string.
                                v_valueUtf = v_valueFormatted;
                            }
                            span.append(v_valueUtf);
                            spanAnchor.append(span);
                            //li.append(v_valueFormatted);
                        } else {
                            span.addClass('right-pageView')
                            span.append(v_value);

                            spanAnchor.append(span);
                        }

                    });
                    li.append(spanAnchor);
                    ul.append(li);

                });


                $('#composer-selection-nav').html(ul);
            } catch (err) {
                $('#composer-selection-nav').html('Something went wrong!' + err);
            } finally {

            }



        });
    });

    $('.getFamous').click(function(e) {
        var selected = $(e.target).text();
        console.log(selected);
        //if selected is all-time, remove change category? 


        //endpoint used for Output WITHOUT Inferencing
        var endpoint = 'http://localhost:5000/category';
        var format = 'JSON';



        $.get('/category', data = {
            //'endpoint': endpoint
            'category': selected
        }, function(json) {
            //alert(json);


            try {

                // var vars = json.head.vars;

                // var ul = $('<ul></ul>');
                // ul.addClass('list-group');

                // $.each(json.results.bindings, function(index, value) {
                //     var li = $('<li></li>');
                //     li.addClass('list-group-item');

                //     $.each(vars, function(index, v) {
                //         var v_type = value[v]['type'];
                //         var v_value = value[v]['value'];

                //         li.append('<strong>' + v + '</strong><br/>');

                //         //Sort into Types
                //         //if type is 'uri', we know it is a DBpedia resource. parse as name


                //         // If the value is a URI, create a hyperlink
                //         if (v_type == 'uri') {
                //             var a = $('<a></a>');
                //             a.attr('href', v_value);
                //             a.text(v_value);
                //             li.append(a);
                //             // Else we're just showing the value.
                //         } else {
                //             li.append(v_value);
                //         }
                //         li.append('<br/>');

                //     });
                //     ul.append(li);

                // });

                var vars = json.head.vars;

                var ul = $('<ul></ul>');
                ul.addClass('list-group nav');

                $.each(json.results.bindings, function(index, value) {
                    var li = $('<li></li>');
                    li.addClass('list-group-item composer-item');

                    var spanAnchor = $('<a></a>');
                    $.each(vars, function(index, v) {
                        var v_type = value[v]['type'];
                        var v_value = value[v]['value'];

                        var span = $('<span></span>')
                            //li.append('<strong>' + v + '</strong><br/>');

                        if (v_type == 'uri') {
                            var v_valueFormatted = v_value.replace("http://dbpedia.org/resource/", "");
                            //var value_wiki = "https://en.wikipedia.org/w/index.php?printable=yes&title=" + v_valueFormatted;

                            spanAnchor.attr('id', v_valueFormatted);

                            v_valueFormatted = v_valueFormatted.split('_').join(' ');

                            var v_valueUtf;
                            try {
                                // If the string is UTF-8, this will work and not throw an error.
                                v_valueUtf = decode_utf8(v_valueFormatted);
                            } catch (e) {
                                // If it isn't, an error will be thrown, and we can asume that we have an ISO string.
                                v_valueUtf = v_valueFormatted;
                            }
                            span.append(v_valueUtf);
                            spanAnchor.append(span);
                            //li.append(v_valueFormatted);
                        } else {
                            span.addClass('right-pageView')
                            span.append(v_value);

                            spanAnchor.append(span);
                        }


                        //Sort into Types
                        //if type is 'uri', we know it is a DBpedia resource. parse as name


                        // If the value is a URI, create a hyperlink
                        // if (v_type == 'uri') {
                        //     var a = $('<a></a>');
                        //     a.attr('href', v_value);
                        //     a.text(v_value);
                        //     li.append(a);
                        //     // Else we're just showing the value.
                        // } else {
                        //     li.append(v_value);
                        // }
                        //li.append('<br/>');

                    });
                    li.append(spanAnchor);
                    ul.append(li);

                });


                $('#composer-selection-nav').html(ul);
            } catch (err) {
                $('#composer-selection-nav').html('Something went wrong!' + err);
            } finally {

            }



        });
    });
	
	$('.allRoundFamous').trigger('click');
});




//Display answer to the user on click
$('#linktargetResult').on('click', function(e) {
    //var array = ["Beef", "Chicken", "Lamb", "Fish", "Vegetable", "Salad", "Chocolate"];
    var reasonResult = "<h3>Answer</h3>Both results are different within the results on the left (without reasoning), the SPARQL query is just returning a set of results which matches the query. With reasoning, the results on the right matches a set of logical consequences from knowledge of previously asserted facts or axioms. Such assertions are crafted within an ontology, which can further be reused by others. </br> As such, the result set with reasoning provides us with more in-depth understanding of the relationships between the classes or types and could help us to link up with previously unknown facts or relations of our data. </br></br>Start your own Ontology and take part in the drive towards Web 2.0, --> Semantic Web!";


    $('#linktargetResult').html(reasonResult);
});


function encode_utf8(s) {

    return unescape(encodeURIComponent(s));

}

function decode_utf8(s) {

    return decodeURIComponent(escape(s));

}
