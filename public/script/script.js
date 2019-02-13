$(()=>{
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if(user !== null) {
        $('#log').hide();
        $('#reg').hide();
    }else{
        $('#reg').hide();
        $('#logout').hide();
        $('#but').hide();
    }
    $("#register").click((e)=>{
        e.preventDefault();
        const data = new FormData(document.getElementById("formRegister"));
        console.log(data);
        $.ajax({
            url: 'http://localhost:3333/users',
            data: data,
            processData: false,
            contentType: false,
            type: 'POST'
        }).then(response => {
            console.log(response);
            location.reload();
        })
    });

    $("#login").click((e)=>{
        e.preventDefault();
        const data = new FormData(document.getElementById("formLogin"));

        $.ajax({
            url: 'http://localhost:3333/users/sessions',
            data: data,
            processData: false,
            contentType: false,
            type: 'POST'
        }).then(response => {
            localStorage.setItem('user', JSON.stringify(response));
            location.reload();
        })
    });

    $("#logout").click((e)=>{
        e.preventDefault();
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null){
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/users/sessions',
                headers: header,
                processData: false,
                contentType: false,
                type: 'DELETE'
            }).then(() => {
                localStorage.removeItem('user');
                location.reload();
            })
        }
    });

    $("#bregister").click((e)=>{
        e.preventDefault();
        $('#reg').show();
        $('#log').hide();
    });

    $("#artist").click((e)=>{
        e.preventDefault();
        let application = $("#application");
        application.empty();
        let result_form = $(`<div id="result_form">`);
        let form = $(`<div id="form">`);
        let mydiv = $(`<div id="mydiv">`);
        application.append(result_form,form,mydiv);
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/users/artists',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET',
                dataType: 'html'
            }).then(response => {
                document.getElementById('form').innerHTML = response;
                getAllpostsArtists();
            });
        }
    });


    $("#album").click((e)=>{
        e.preventDefault();
        let application = $("#application");
        application.empty();
        let buttonparam = $(`<div class="container">`);
        let inputbuttonById = $(`<button type="button" class="btn btn-default" id="inputbuttonById">Album by ID</button>`).click((e)=> buttonById(e));
        let inputbuttonByQuery = $(`<button type="button" class="btn btn-default" id="inputbuttonByQuery">Album by query</button>`).click((e)=> buttonByQuery(e));
        let buttonID = buttonparam.append(inputbuttonById, inputbuttonByQuery);
        let result_form = $(`<div id="result_form">`);
        let form = $(`<div id="form">`);
        let mydiv = $(`<div id="mydiv">`);
        application.append(buttonID,result_form,form,mydiv);
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/users/albums',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET',
                dataType: 'html'
            }).then(response => {
                document.getElementById('form').innerHTML = response;
                getAllpostsAlbums();
            });
        }
    });

    const buttonById = (e) =>{
        e.preventDefault();
        let application = $("#application");
        application.empty();
        let result_form = $(`<div id="result_form">`);
        let form = $(`<form method="GET" id="ajax_form" action="">`);
        let div_id = $(`<div class="form-group">`);
        let label_id = $(`<label for="id">ID Альбома</label>`);
        let input_id = $(`<input type="text" class="form-control" id="id" name="id" required>`);
        let id = div_id.append(label_id, input_id);
        let div_style = $(`<div style="overflow: hidden; padding-right: .5em;">`);
        let input_button = $(`<input type="submit" id="inputbuttonById" class="btn btn-primary" value="Отправить">`).click((e)=> inputbuttonByIdHandler(e));
        let button = div_style.append(input_button);
        form.append(id,button);
        let mydiv = $(`<div id="mydiv">`);
        application.append(result_form,form,mydiv);
    };
    const buttonByQuery = (e) =>{
        e.preventDefault();
        let application = $("#application");
        application.empty();
        let result_form = $(`<div id="result_form">`);
        let form = $(`<form method="GET" id="ajax_form" action="">`);
        let div_id = $(`<div class="form-group">`);
        let label_id = $(`<label for="id">ID Исполнителя</label>`);
        let input_id = $(`<input type="text" class="form-control" id="id" name="id" required>`);
        let id = div_id.append(label_id, input_id);
        let div_style = $(`<div style="overflow: hidden; padding-right: .5em;">`);
        let input_button = $(`<input type="submit" id="inputbuttonById" class="btn btn-primary" value="Отправить">`).click((e)=> inputbuttonByQueryHandler(e));
        let button = div_style.append(input_button);
        form.append(id,button);
        let mydiv = $(`<div id="mydiv">`);
        application.append(result_form,form,mydiv);
    };

    $("#track").click((e)=>{
        e.preventDefault();
        let application = $("#application");
        application.empty();
        let trackbuttonparam = $(`<div class="container">`);
        let trackinputbuttonById = $(`<button type="button" class="btn btn-default" id="trackinputbuttonById">Track by ID</button>`).click((e)=> trackbuttonById(e));
        let trackinputbuttonByQuery = $(`<button type="button" class="btn btn-default" id="trackinputbuttonByQuery">Track by query</button>`).click((e)=> trackbuttonByQuery(e));
        let trackbuttonID = trackbuttonparam.append(trackinputbuttonById, trackinputbuttonByQuery);
        let result_form = $(`<div id="result_form">`);
        let form = $(`<div id="form">`);
        let mydiv = $(`<div id="mydiv">`);
        application.append(result_form,trackbuttonID,form,mydiv);
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/users/albums',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET',
                dataType: 'html'
            }).then(response => {
                document.getElementById('form').innerHTML = response;
                getAllpostsTracks();
            });
        }
    });

    const trackbuttonById = (e) =>{
        e.preventDefault();
        let application = $("#application");
        application.empty();
        let result_form = $(`<div id="result_form">`);
        let form = $(`<form method="GET" id="ajax_form" action="">`);
        let div_id = $(`<div class="form-group">`);
        let label_id = $(`<label for="id">ID Исполнителя</label>`);
        let input_id = $(`<input type="text" class="form-control" id="id" name="id" required>`);
        let id = div_id.append(label_id, input_id);
        let div_style = $(`<div style="overflow: hidden; padding-right: .5em;">`);
        let input_button = $(`<input type="submit" id="inputbuttonById" class="btn btn-primary" value="Отправить">`).click((e)=> trackByIdHandler(e));
        let button = div_style.append(input_button);
        form.append(id,button);
        let mydiv = $(`<div id="mydiv">`);
        application.append(result_form,form,mydiv);
    };
    const trackbuttonByQuery = (e) =>{
        e.preventDefault();
        let application = $("#application");
        application.empty();
        let result_form = $(`<div id="result_form">`);
        let form = $(`<form method="GET" id="ajax_form" action="">`);
        let div_id = $(`<div class="form-group">`);
        let label_id = $(`<label for="id">ID Альбома</label>`);
        let input_id = $(`<input type="text" class="form-control" id="id" name="id" required>`);
        let id = div_id.append(label_id, input_id);
        let div_style = $(`<div style="overflow: hidden; padding-right: .5em;">`);
        let input_button = $(`<input type="submit" id="inputbuttonById" class="btn btn-primary" value="Отправить">`).click((e)=> trackByQueryHandler(e));
        let button = div_style.append(input_button);
        form.append(id,button);
        let mydiv = $(`<div id="mydiv">`);
        application.append(result_form,form,mydiv);
    };

    const Artists =(response)=>{
        let  div = $(`<div id=${response._id} class="mydiv">`);
        let image = $(`<img  width="200" height="80" alt=""/>`).attr('src', `http://localhost:3333/uploads/${response.image}`);
        let name = $(`<p>`).text(`Имя исполнителя: ${response.name}`);
        let information = $(`<p>`).text(`Информация: ${response.information}`);
        if(response.button === "1") {
            let deleteArtists = $(`<button type="button" class="btn btn-default">Delete by ID</button>`).click((e)=> deleteArtistsById(response._id,e));
            div.append(image, name, information, deleteArtists);
        }else{
            div.append(image, name, information);
        }
        return div;
    };

    const deleteArtistsById = (id,e) =>{
        e.preventDefault();
        let result_form = $("#result_form");
        let mydiv = $("#mydiv");
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: `http://localhost:3333/artists/delete/${id}`,
                headers: header,
                type: 'DELETE'
            }).then(response => {
                result_form.empty();
                result_form.text(JSON.stringify(response));
                mydiv.empty();
                getAllpostsArtists();
            });
        }
    };

    const getAllpostsArtists = () => {
        let mydiv = $("#mydiv");
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/artists',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET'
            }).then((response) => {
                const artists = response.map((artist) => {
                    return Artists(artist);
                });
                mydiv.html(artists);
            });
        }
    };


    const artistHandler =(e) =>{
        let idForm = $("#ajax_form");
        if(!idForm[0].checkValidity()){
            $('<input type="submit">').hide().appendTo(idForm).click().remove();
            return;
        }
        e.preventDefault();
        let result_form = $("#result_form");
        let mydiv = $("#mydiv");
        const data = new FormData(document.getElementById("ajax_form"));
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/artists',
                data: data,
                headers: header,
                processData: false,
                contentType: false,
                type: 'POST'
            }).then((response) => {
                result_form.empty();
                result_form.text(JSON.stringify(response));
                mydiv.empty();
                getAllpostsArtists();
            });
        }
     };

    const Albums =(response)=>{
        if(typeof(response.artist) == "object"){
            let  div = $(`<div id=${response._id} class="mydiv">`);
            let image = $(`<img  width="200" height="80" alt=""/>`).attr('src', `http://localhost:3333/uploads/${response.image}`);
            let name = $(`<p>`).text(`Название Альбома: ${response.name}`);
            let artist = Artists(response.artist);//$(`<p>`).text(`ID испольнителя: ${JSON.stringify(response.artist)}`);
            let datatime = $(`<p>`).text(`Год выпуска: ${response.datatime}`);
            if(response.button === "1") {
                let deleteAlbums = $(`<button type="button" class="btn btn-default">Delete by ID</button>`).click((e)=> deleteAlbumsById(response._id,e));
                div.append(image, name, artist, datatime, deleteAlbums);
            }else{
                div.append(image, name, artist,datatime);
            }
            return div;
        }else{
            let  div = $(`<div id=${response._id} class="mydiv">`);
            let image = $(`<img  width="200" height="80" alt=""/>`).attr('src', `http://localhost:3333/uploads/${response.image}`);
            let name = $(`<p>`).text(`Название Альбома: ${response.name}`);
            let artist = $(`<p>`).text(`ID испольнителя: ${response.artist}`);
            let datatime = $(`<p>`).text(`Год выпуска: ${response.datatime}`);
            if(response.button === "1") {
                let deleteAlbums = $(`<button type="button" class="btn btn-default">Delete by ID</button>`).click((e)=> deleteAlbumsById(response._id,e));
                div.append(image, name, artist, datatime, deleteAlbums);
            }else{
                div.append(image, name, artist,datatime);
            }
            return div;
        }
    };

    const deleteAlbumsById = (id,e) =>{
        e.preventDefault();
        let result_form = $("#result_form");
        let mydiv = $("#mydiv");
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: `http://localhost:3333/albums/delete/${id}`,
                headers: header,
                type: 'DELETE'
            }).then(response => {
                result_form.empty();
                result_form.text(JSON.stringify(response));
                mydiv.empty();
                getAllpostsAlbums();
            });
        }
    };

    const getAllpostsAlbums = () => {
        let mydiv = $("#mydiv");
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/albums',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET'
            }).then(response => {
                const albums = response.map((album) => {
                    return Albums(album);
                });
                mydiv.html(albums);
            });
        }
    };


    const albumHandler =(e) =>{
        let idForm = $("#ajax_form");

        if(!idForm[0].checkValidity()){
            $('<input type="submit">').hide().appendTo(idForm).click().remove();
            return;
        }
        e.preventDefault();
        let result_form = $("#result_form");
        let mydiv = $("#mydiv");
        const data = new FormData(document.getElementById("ajax_form"));
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/albums',
                data: data,
                headers: header,
                processData: false,
                contentType: false,
                type: 'POST'
            }).then((response) => {
                result_form.empty();
                result_form.text(JSON.stringify(response));
                mydiv.empty();
                getAllpostsAlbums();
            });
        }
    };

    const inputbuttonByIdHandler = (e) => {
        e.preventDefault();
        let id = $("#id").val();
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: `http://localhost:3333/albums/${id}`,
                headers: header,
                type: 'GET'
            }).then((response) => {
                let mydiv = $("#mydiv");
                let result_form = $("#result_form");
                result_form.empty();
                result_form.text(JSON.stringify(response));
                const albums = Albums(response);
                mydiv.html(albums);
            });
        }
    };
    const inputbuttonByQueryHandler = (e) =>{
        e.preventDefault();
        let id = $("#id").val();
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: `http://localhost:3333/albums?artist=${id}`,
                headers: header,
                type: 'GET'
            }).then((response) => {
                let result_form = $("#result_form");
                result_form.empty();
                result_form.text(JSON.stringify(response));
                let mydiv = $("#mydiv");
                const albums = response.map((album) => {
                    return Albums(album);
                });
                mydiv.html(albums);
            });
        }
    };

    const Tracks =(response)=>{
        let  div = $(`<div id=${response._id} class="mydiv">`);
        let name = $(`<p>`).text(`Название Композиции: ${response.name}`);
        let album = $(`<p>`).text(`ID Альбома: ${response.album}`);
        let time = $(`<p>`).text(`Продолжительность: ${response.time}`);
        div.append(name, album,time);
        return div;
    };

    const getAllpostsTracks = () => {
        let mydiv = $("#mydiv");
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/tracks',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET'
            }).then(response => {
                const tracks = response.map((track) => {
                    return Tracks(track);
                });
                mydiv.html(tracks);
            });
        }
    };


    const trackHandler =(e) =>{
        let idForm = $("#ajax_form");

        if(!idForm[0].checkValidity()){
            $('<input type="submit">').hide().appendTo(idForm).click().remove();
            return;
        }
        e.preventDefault();
        let result_form = $("#result_form");
        let mydiv = $("#mydiv");
        const data = new FormData(document.getElementById("ajax_form"));
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/tracks',
                data: data,
                headers: header,
                processData: false,
                contentType: false,
                type: 'POST'
            }).then((response) => {
                result_form.empty();
                result_form.text(JSON.stringify(response));
                mydiv.empty();
                getAllpostsTracks();
            });
        }
    };

    const trackByIdHandler = (e) => {
        e.preventDefault();
        let id = $("#id").val();
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: `http://localhost:3333/tracks/${id}`,
                headers: header,
                type: 'GET'
            }).then((response) => {
                let mydiv = $("#mydiv");
                let result_form = $("#result_form");
                result_form.empty();
                result_form.text(JSON.stringify(response));
                const tracks = response.map((track) => {
                    return Tracks(track);
                });
                mydiv.html(tracks);
            });
        }
    };
    const trackByQueryHandler = (e) =>{
        e.preventDefault();
        let id = $("#id").val();
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: `http://localhost:3333/tracks?album=${id}`,
                headers: header,
                type: 'GET'
            }).then((response) => {
                let result_form = $("#result_form");
                result_form.empty();
                result_form.text(JSON.stringify(response));
                let mydiv = $("#mydiv");
                const tracks = response.map((track) => {
                    return Tracks(track);
                });
                mydiv.html(tracks);
            });
        }
    };
});