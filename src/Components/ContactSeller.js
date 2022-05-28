import * as Qs from 'qs'
import axios from 'axios';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import useTheAxios from '../Axios/useAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ESTABLISH_CONNECTION, GET_OR_CREATE_CONVERSATION_ID_URL, SEND_MESSAGES_URL } from '../Utils/Urls';

const mainDivStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "35px",
}

const ContactSeller = ({ open, setOpen }) => {

  const user = useSelector(state => state.userStatus)

  const [message, setMessage] = useState("")
  const useAxios = useTheAxios()
  const navigate = useNavigate()


  // send messages. here is the conversation collection is creating
  const handleSendMeassage = async () => {
    try {
      console.log(user.userId, "    ", open.otherUser);

      // create connection between  peoples.
      const { data } = await useAxios.post(GET_OR_CREATE_CONVERSATION_ID_URL, {
        params: {
          user1: user.userId, user2: open.otherUser
        }
      })

      console.log("===============================");
      console.log(data);
      console.log("===============================");

      // id of that connected people is used to create messages
      const response = await useAxios.post(SEND_MESSAGES_URL, {
        sender: user.userId,
        conversation_id: data.id,
        message: message,
        receiver: open.otherUser
      })

      console.log("**************************");
      console.log(response);
      console.log("**************************");

      navigate("/chat")

    } catch (error) {
      console.log(error.response);
    }
  }


  return (
    <div style={mainDivStyle}>
      <TextareaAutosize
        minRows={3}
        placeholder="Enter Message"
        style={{ width: 200 }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSendMeassage} style={{ marginTop: "10px" }} variant="contained">Send Message</Button>
    </div>
  )
}

export default ContactSeller