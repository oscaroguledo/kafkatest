import express from "express";
import consumerRun from "./consumer.js";
import callProducer from "./producer.js";
import { Server } from "socket.io";
import http from "http";
import adminInit from "./admin.js";

const TOPIC = process.env.KAFKA_TOPIC;
const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: {
          origin: "*",//Array.isArray(allowedOrigins) ? allowedOrigins : [],
          methods: ["GET", "POST"],
          path: '/proctoring-socket/'
        }
  });

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// listening when a client connects to our socket instance
io.on("connection", (socket) => {
  console.log("connected with: ", socket.id);
  
  /* // join event
  socket.on("join-event", (eventId, userPeerId, userEmail, nameOfUser) => {
    console.log(nameOfUser + " with email '" + userEmail + "' and peer id: '" + userPeerId + "' joined event: " + eventId);
    socket.join(eventId);
    socket.broadcast.to(eventId).emit('user-connected', userPeerId, userEmail, nameOfUser); 

    socket.on('disconnect', (reason) => {
      console.log("User with socket id disconnected: '" + socket.id +"' because '" + reason + "'");
      socket.broadcast.to(eventId).emit('user-disconnected', userPeerId, userEmail, nameOfUser);
    });
  })

  //listening for messages
  socket.on('incoming-message', async (data) => {
    console.log(`New message from user with socket id: ${socket.id} ->>> (${data})`);
        
    ///send message to the room in real-time
    socket.broadcast.to(data.eventId).emit('new-message', data.eventId, data.username, data.email, data.isProctor, data.message, new Date());
    // io.to(data.eventId).emit('new-message', data.eventId, data.username, data.email, data.isProctor, data.message, new Date()); 

    // save in the background
    try {
      const participant = await Participant.find({event_id: data.eventId});
      const message = {
        eventId: data.eventId,
        useremail:data.email,
        username: data.username,
        message: data.message,
        tagged:participant.filter(i => data.message.includes('@' + i._id)).map(i => i._id),
      };
      addmessage(message);
      // Producer(process.env.KAFKA_TOPIC,message);  
            
    } catch (error) {
            
    }
  })

  // Listen for typing activity 
  socket.on('on-typing', data => {
    //broadcast to everyone except you in the chatroom
    socket.broadcast.to(data.eventId).emit('activity', data)
  }) */
    
});

function startServer() {
  server.listen(PORT, async () => {
    console.log(`Listening to port ----> ${PORT}`);
    await adminInit(TOPIC);
    await consumerRun("realtime-data", [TOPIC]);
    await callProducer();
  });
}

async function initializeApp() {
  try {
    // Connect to database
    //await connectToDb();
    console.log("Database connected successfully.");

    // Load face detection models
    //await loadModels();
    console.log("Face detector AI Models loaded successfully.");

    // Start the server
    startServer();
  } catch (error) {
    console.error("Initialization failed:", error);
    process.exit(1);
  }
}

initializeApp();
