const socket = io();

$('#login').click((e)=>{
    e.preventDefault();
    
    let value = $('#name').val();

    if(value)
    {
        $('#intro').remove();

        $('body').removeClass("body_back");
        $('body').addClass("new_body");

        $('body').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                Welcome ${value} . Happy Chatting !!!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`);

        socket.emit('login', {
            name: value
        })

        $('body').append(`<div class="container-fluid">
        <div class="row m-3 ">
            <div class="col col-lg-8 col-sm-6 col-md-6" style="display:flex; flex-direction:row; margin-bottom:20px">
                    <label for="message"></label>
                    <textarea name = "message" id="msgInp" cols="30" rows="2" style = "width:800px; display:inline; outline:none;"></textarea> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-success fs-4" id="msg" style = "display:inline;">Send</button>
            </div>
            

            <div class="col col-lg-8 col-sm-6 col-md-6" >
                <ul style="list-style:none; padding-left: 0rem;" id="uoli">
                    
                </ul>
            </div>
        </div>
            
        </div>`)


        
        

        $('#msg').click(()=>{
            
            socket.emit('sendM',{
                d: $('#msgInp').val()
            })

            $('#msgInp').val("");
        })

        

        socket.on('receiveM',(data)=>{
            if(socket.id === data.sid)
            {
                $('#uoli').append(`<li class="own" style = 'margin-bottom:2px;'> you : ${data.ack}</li>`)
            }
            else
            {
                $('#uoli').append(`<li class="other" style = 'margin-bottom:2px;'> ${data.name} : ${data.ack}</li>`)
            }
        })
        
    }
    

})

