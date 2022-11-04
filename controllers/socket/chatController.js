

module.exports = (io) =>
{  
/*    io.use((socket,next) =>{
        next();
    })
    function getCookie(cookie, name) {
        const value = cookie;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    io.on('connection', (socket) => {
        let username = '';
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });

        socket.on('cookie', (cookie)=>{
            username = getCookie(socket.request.headers.cookie, 'username')
        })

        socket.on('message', (msg) => {
          console.log(`We got message: ${msg}`)
          io.emit('message', `${username}: ${msg}`)
        }) 


    });  */

}
