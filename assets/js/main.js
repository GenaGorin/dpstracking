 // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [51.506863, 45.956584],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 12
        });

        myMap.events.add('click', function (e) {
    	// Получение координат щелчка
    	coords = e.get('coords');
    		console.log(coords);
        $('.modal_window_marker_coment').show();
        //createNewMarker(coords); 
		});

        $('.create_new_marker').click(function() {
            createNewMarker(coords); 
            $('.modal_window_marker_coment').hide();
        });

        function createNewMarker(coords) {
            let comment = $('.value_for_comment').val();
            let data = new FormData();
            data.append( 'lng', coords[0] );
            data.append( 'lat', coords[1] );
            data.append( 'comment', comment );
            $.ajax({
            url         : '/handler.php',
            type        : 'POST', // важно!
            data        : data,
            cache       : false,
            dataType    : 'json',
            processData : false,
            contentType : false,
            // функция успешного ответа сервера
            success     : function( respond, status, jqXHR ){
        
              if( typeof respond.error === 'undefined' ){
                console.log(respond);
              }
              // ошибка
              else {
                console.log('ОШИБКА: ' + respond.error );
              }
            },
            // функция ошибки ответа сервера
            error: function( jqXHR, status, errorThrown ){
              console.log( 'ОШИБКА AJAX запроса: ' + status, jqXHR );
            }
        
            });
            var myGeoObject = new ymaps.GeoObject({
            geometry: {
                    type: "Point", // тип геометрии - точка
                    coordinates: [coords[0], coords[1]] // координаты точки
                },
            properties: {
              clusterCaption: comment,
              balloonContentBody: comment
            }
            });

            myMap.geoObjects.add(myGeoObject);
        }

        function getMarkers(){
                let data = new FormData();
                data.append( 'comment', 'test' );
                $.ajax({
                url         : '/markers.php',
                type        : 'POST', // важно!
                data        : data,
                cache       : false,
                dataType    : 'json',
                processData : false,
                contentType : false,
                // функция успешного ответа сервера
                success     : function( respond, status, jqXHR ){
            
                  if( typeof respond.error === 'undefined' ){
                    console.log(respond);
                    generateMarkers(respond);

                  }
                  // ошибка
                  else {
                    console.log('ОШИБКА: ' + respond.error );
                  }
                },
                // функция ошибки ответа сервера
                error: function( jqXHR, status, errorThrown ){
                  console.log( 'ОШИБКА AJAX запроса: ' + status, jqXHR );
                }
            
                });
            }

        getMarkers();

        function generateMarkers(respond) {
            for (var i = 0; i < respond.length; i++) {
                var myGeoObject = new ymaps.GeoObject({
                geometry: {
                        type: "Point", // тип геометрии - точка
                        coordinates: [respond[i]['lng'], respond[i]['lat']] // координаты точки
                    },
                properties: {
                  clusterCaption: respond[i].comment,
                  balloonContentBody: respond[i].comment
                }
                });
                myMap.geoObjects.add(myGeoObject);
            }
        }


    }