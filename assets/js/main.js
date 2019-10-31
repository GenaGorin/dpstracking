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
            zoom: 14
        });

        myMap.events.add('dblclick', function (e) {
    	// Получение координат щелчка
        e.preventDefault();
    	coords = e.get('coords');
    		console.log(coords);
        $('.modal_window_marker_coment').show();
        //$('#map').hide();
        //createNewMarker(coords); 
		});

        $('.create_new_marker').click(function() {
            createNewMarker(coords); 
            $('.modal_window_marker_coment').hide();
            //$('#map').show();
        });

        $('.close_markers').click(function() {
            $('.modal_window_marker_coment').hide();
            $('#map').show();
        });

        let iconsCLear = ['./assets/img/clear/clear.png', './assets/img/clear/clear2.png', './assets/img/clear/clear3.png', './assets/img/clear/clear4.png'];
        let iconsActive = ['./assets/img/active/active.png', './assets/img/active/active2.png' , './assets/img/active/active3.png', './assets/img/active/active4.png', 
        './assets/img/active/active6.png', './assets/img/active/active7.png', './assets/img/active/active8.png']

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }

        function createNewMarker(coords) {
            let comment = $('.value_for_comment').val();
            let activity = $('.value_for_activity').val();
            let index;
            let icon;
            if (activity == 'clear') {
                index = getRandomInt(0,3);
                icon = iconsCLear[index];
                console.log(iconsCLear[index]);
            }else if(activity == 'active') {
                index = getRandomInt(0,6);
                console.log(iconsActive[index]);
                icon = iconsActive[index];
            }
            let data = new FormData();
            data.append( 'lng', coords[0] );
            data.append( 'lat', coords[1] );
            data.append( 'activity', icon );
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
                //var myGeoObject = new ymaps.GeoObject({
                //geometry: {
                //        type: "Point", // тип геометрии - точка
                //        coordinates: [respond[i]['lng'], respond[i]['lat']], // координаты точки
                //        iconLayout: 'default#image',
                //        iconImageHref: './assets/img/ucrainec.png',
                //        iconImageSize: [30, 30],
                //        iconImageOffset: [-3, -42],
                //    },
                //properties: {
                //  clusterCaption: respond[i].comment,
                //  balloonContentBody: respond[i].comment
                //}
                //});
                var myPlacemark = new ymaps.Placemark([respond[i]['lng'], respond[i]['lat']], {
                    balloonContent: respond[i].comment +' '+respond[i].date,
                    iconContent: respond[i].comment,
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: respond[i]['activity'],
                    iconImageSize: [45, 45],
                    iconImageOffset: [-25, -50]
                });
                //myMap.geoObjects.add(myGeoObject);
                myMap.geoObjects.add(myPlacemark);
            }

        var myPlacemark = new ymaps.Placemark([51.531908, 46.007080], {
                balloonContent: 'Musara sosat',
                iconContent: 'musara pidarasi',
            }, {
                iconLayout: 'default#image',
                iconImageHref: './assets/img/csgo.png',
                iconImageSize: [30, 30],
                iconImageOffset: [0, 0],
            });
            myMap.geoObjects.add(myPlacemark);
        }



    }