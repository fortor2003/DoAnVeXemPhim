
$( document ).ready(function() {
    $('#btnGift').on("click",function () {
        $('#mdSearchGift').modal('show');
    });
    $('#btnPoint').on("click",function () {
        $('#mdSearchPoint').modal('show');
    });
    var token = $('#hidToken').val();
     //region point
    $('#mdViewPoint').on('hidden.bs.modal', function () {
        $("#idThe").val(0);
        $("#txtFullNamePointV").val("");
        $("#txtPhonePoint").val("");
        $("#txtPointV").html(0);
    });
    $('#mdSearchPoint').on('shown.bs.modal', function () {
        $('#txtPhonePoint').trigger('focus')
    });

    $('#frmSearchPoint').validate({
        rules: {
            'txtPhonePoint': 'required'
        },
        messages: {
            'txtPhonePoint': 'Chưa nhập số điện thoại'
        },
        submitHandler: function () {
            try {
                $.ajax({
                    url:`api/v1/amounts/POINT/${$('#txtPhonePoint').val()}`,
                    type:"get",
                    headers: {
                        "Accept" : "application/json; charset=utf-8;",
                        "Content-Type":"application/json;",
                        "Authorization":"Bearer "+$('#hidToken').val()
                    },
                    contentType:"application/json; charset=utf-8",
                    data:null,
                    dataType:"json",
                    success: function (data) {//Tìm thành công
                        $('#txtFullNamePointV').val(data.firstName + ' ' + data.lastName);
                        $('#txtPhonePointV').val(data.code);
                        $('#txtPointV').html(data.value);
                        $('#idThe').val(data.id);
                        $('#mdViewPoint').modal('show');
                    },
                    error: function (jqXHR) {
                        if(parseInt(jqXHR.status)===404){//chưa có
                            $('#txtPhonePointCr').val($('#txtPhonePoint').val())
                            $('#mdCreatePoint').modal('show');
                        }
                    }
                });
            } catch (err) {
                console.error(err);
                return false;
            }
        }
    });

    $('#frmCreatePoint').on("submit",function (e) {
        e.preventDefault();
        let data = {
            "type":"POINT",
            "code":$("#txtPhonePointCr").val(),
            "value":0,
            "firstName": $("#txtFirstNamePointCr").val()?$("#txtFirstNamePointCr").val():"null",
            "lastName": $("#txtLastNamePointCr").val()?$("#txtLastNamePointCr").val():"null",
            "email":"null@example.com",
            "phone":$("#txtPhonePointCr").val(),
            "note":""
        };
        $.ajax({
            url:"api/v1/amounts",
            type:"POST",
            headers: {
                "Accept" : "application/json; charset=utf-8;",
                "Content-Type":"application/json;",
                "Authorization":"Bearer "+$('#hidToken').val()
            },
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(data),
            dataType:"json",
            success: function (result) {//tạo mới

                $('#txtFullNamePointV').val(result.firstName + ' ' + result.lastName);
                $('#txtPhonePointV').val(result.code);
                $('#txtPointV').html(result.value);
                $('#idThe').val(result.id);
                $('#mdCreatePoint').modal('hide');
                $('#mdViewPoint').modal('show');

                Swal.fire('Saved!', '', 'success')
            },
            error: function (xhr) {
                let aa='';
                $.each(xhr.responseJSON.message, function( index, value ) {
                    aa+=' '+value;
                });
                Swal.fire({
                    icon: 'error',
                    title: xhr.status,
                    text: aa
                })
            }
        });

    });

    $("#btnAddPoint").on("click",function () {
        if($("#idThe").val()>0){
            Swal.fire({
                title: 'Do you want to add Point?',
                showCancelButton: true,
                confirmButtonText: `Save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let data = {
                        "value":1 ,
                        "note":""
                    }
                    $.ajax({
                        url:`api/v1/amounts/${$("#idThe").val()}/add-value`,
                        type:"PATCH",
                        headers: {
                            "Accept" : "application/json; charset=utf-8;",
                            "Content-Type":"application/json;",
                            "Authorization":"Bearer "+token
                        },
                        contentType:"application/json; charset=utf-8",
                        data:JSON.stringify(data),
                        dataType:"json",
                        success: function (result) {//cập nhật thành công
                            $("#txtPointV").html(result.value);
                            Swal.fire({
                                icon: 'success',
                                title: 'Lưu thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        },
                        error: function (xhr) {
                            if(xhr.status==400){
                                let aa='';
                                $.each(xhr.responseJSON.message, function( index, value ) {
                                    aa+=' '+value;
                                });
                                Swal.fire({
                                    icon: 'error',
                                    title: xhr.status,
                                    text: aa
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: xhr.status,
                                    text: xhr.responseText
                                })
                            }
                        }
                    });

                }
            })
        }else {
            Swal.fire({
                icon: 'error',
                title: "User cannot be found!"
            })
        }
    });

    $("#btnRedeemPoint").on("click",function () {
        if($("#idThe").val()>0){
            Swal.fire({
                title: 'Do you want to redeem Point?',
                showCancelButton: true,
                confirmButtonText: `Save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let data = {
                        "value":-10 ,
                        "note":""
                    }
                    $.ajax({
                        url:`api/v1/amounts/${$("#idThe").val()}/add-value`,
                        type:"PATCH",
                        headers: {
                            "Accept" : "application/json; charset=utf-8;",
                            "Content-Type":"application/json;",
                            "Authorization":"Bearer "+token
                        },
                        contentType:"application/json; charset=utf-8",
                        data:JSON.stringify(data),
                        dataType:"json",
                        success: function (result) {//cập nhật thành công
                            $("#idThe").val(result.id);

                            $("#txtPointV").html(result.value);

                            Swal.fire({
                                icon: 'success',
                                title: 'Lưu thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        },
                        error: function (xhr) {
                            if(xhr.status==400){
                                let aa='';
                                $.each(xhr.responseJSON.message, function( index, value ) {
                                    aa+=' '+value;
                                });
                                Swal.fire({
                                    icon: 'error',
                                    title: xhr.status,
                                    text: aa
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: xhr.status,
                                    text: xhr.responseText
                                })
                            }
                        }
                    });
                }
            })
        }else {
            Swal.fire({
                icon: 'error',
                title: "User cannot be found!"
            })
        }
    });
    //endregion point
    /***
     *
     ***/
    //region Gift
    $('#mdSearchGift').on('hidden.bs.modal', function () {
        $('#txtSearchG').val("");
    });
    $('#mdSearchGift').on('shown.bs.modal', function () {
        $('#txtSearchG').trigger('focus');
    });
    $('#mdGift').on('hidden.bs.modal', function () {
        $('#txtGiftCard').val('');
        $('#spMoney').html(0);
        $('#idTheGift').val('');
    });
    $('#mdChangeGift').on('hidden.bs.modal', function () {
        $('#spStatusG').html('');
        $('#txtValueGift').val(0);
    });
    $('#frmSearchG').validate().destroy();
    $('#frmSearchG').validate({
        rules: {
            txtSearchG: 'required'

        },
        messages: {
            txtSearchG: 'vùng nhập bị trống'

        },
    });
    $('#btnSearchG').on("submit",function (e) {
        if (!$('#frmSearchG').valid()){
            return;
        }
        e.preventDefault();
        $.ajax({
            url:`api/v1/amounts/GIFT/${$('#txtSearchG').val()}`,
            type:"GET",
            headers: {
                "Accept" : "application/json; charset=utf-8;",
                "Content-Type":"application/json;",
                "Authorization":"Bearer "+token
            },
            contentType:"application/json; charset=utf-8",
            data:null,
            dataType:"json",
            success: function (data) {//cập nhật thành công
                $('#txtGiftCard').val(data.code);
                $('#spMoney').html(data.value);
                $('#idTheGift').val(data.id);
                $('#mdGift').modal('show');
            },
            error: function (xhr) {
                if(parseInt(xhr.status)===404){
                    Swal.fire({
                        title: 'New Gift',
                        text:'Do you want to create gift ?',
                        showCancelButton: true,
                        confirmButtonText: `Save`,
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            let data = {
                                "type":"GIFT",
                                "code":$("#txtSearchG").val(),
                                "value":0,
                                "firstName": "null",
                                "lastName": "null",
                                "email":"null@null.null",
                                "phone":"null",
                                "note":""
                            };
                            $.ajax({
                                url:"api/v1/amounts",
                                type:"POST",
                                headers: {
                                    "Accept" : "application/json; charset=utf-8;",
                                    "Content-Type":"application/json;",
                                    "Authorization":"Bearer "+token
                                },
                                contentType:"application/json; charset=utf-8",
                                data:JSON.stringify(data),
                                dataType:"json",
                                success: function (result) {//tạo mới
                                    $('#txtGiftCard').val(result.code);
                                    $('#spMoney').html(result.value);
                                    $('#idTheGift').val(result.id);
                                    $('#mdGift').modal('show');
                                },
                                error: function (xhr) {
                                    if(xhr.status==400){
                                        let aa='';
                                        $.each(xhr.responseJSON.message, function( index, value ) {
                                            aa+=' '+value;
                                        });
                                        Swal.fire({
                                            icon: 'error',
                                            title: xhr.status,
                                            text: aa
                                        })
                                    }else{
                                        Swal.fire({
                                            icon: 'error',
                                            title: xhr.status,
                                            text: xhr.responseText
                                        })
                                    }
                                }
                            });
                            Swal.fire({
                                icon: 'success',
                                title: 'Lưu thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })
                }
            }
        });
    });
    $('#txtSearchG').keypress(function (e) {
        if (e.keyCode == 13)
            $('#btnSearchG').click();
    });
    let dau ='';
    $('#btnAddGift').on('click',function () {
        dau='+';
        $('#spStatusG').html('Add money');
        $('#mdChangeGift').modal('show');
    });
    $('#btnPayGift').on('click',function () {
        dau='-';
        $('#spStatusG').html('Pay money');
        $('#mdChangeGift').modal('show');
    });
    $('#btnChangeGift').on('click',function () {
        if($('#txtValueGift').val()>0){
            Swal.fire({
                title: `Do you want to ${dau=='+'?"Add":"Pay"} Gift?`,
                showCancelButton: true,
                confirmButtonText: `Save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let data = {
                        "value":parseInt(dau+$('#txtValueGift').val()) ,
                        "note":""
                    }
                    $.ajax({
                        url:`api/v1/amounts/${$("#idTheGift").val()}/add-value`,
                        type:"PATCH",
                        headers: {
                            "Accept" : "application/json; charset=utf-8;",
                            "Content-Type":"application/json;",
                            "Authorization":"Bearer "+token
                        },
                        contentType:"application/json; charset=utf-8",
                        data:JSON.stringify(data),
                        dataType:"json",
                        success: function (result) {//cập nhật thành công
                            $('#txtGiftCard').val(result.code);
                            $('#spMoney').html(result.value);
                        },
                        error: function (xhr) {
                            if(xhr.status==400){
                                let aa='';
                                $.each(xhr.responseJSON.message, function( index, value ) {
                                    aa+=' '+value;
                                });
                                Swal.fire({
                                    icon: 'error',
                                    title: xhr.status,
                                    text: aa
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: xhr.status,
                                    text: xhr.responseText
                                })
                            }
                        }
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Lưu thành công',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#mdChangeGift').modal("hide");
                }
            })
        }else {
            Swal.fire({
                icon: 'error',
                title: "value or gift is require"
            });
        }
    });
    //endregion Gift
});