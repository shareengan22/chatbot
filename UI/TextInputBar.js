import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useRef} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

const TextInputBar = () => {
  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState('');

  const API_KEY = '';

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: {_id: 1},
    };
    setMessages(perviousMessages =>
      GiftedChat.append(perviousMessages, [message]),
    );

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: inputMessage,
                },
              ],
            },
          ],
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        // Access generated content
        const generatedContent = data.candidates[0].content;
        console.log(generatedContent);

        const message = {
          _id: Math.random().toString(36).substring(7),
          text: generatedContent.parts[0].text,
          createdAt: new Date(),
          user: {_id: 2, name: 'LpuQueryBot'},
        };
        setMessages(perviousMessages =>
          GiftedChat.append(perviousMessages, [message]),
        );
        setInputMessage('');
        inputRef.current.clear();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleTextInput = text => {
    setInputMessage(text);
  };

  const renderMessage = props => {
    const {currentMessage} = props;
    return (
      <View
        style={{
          backgroundColor: currentMessage.user._id === 2 ? 'orange' : '#808080',
          borderRadius: 10,
          margin: 6,
          padding: 10,
          alignSelf: currentMessage.user._id === 2 ? 'flex-start' : 'flex-end',
        }}>
        <Text style={{color:'black'}} >{currentMessage.text}</Text>
      </View>
    );
  };


  return (
    <>
      <View style={styling.chat}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{_id: 1}}
          minInputToolbarHeight={0}
          renderMessage={renderMessage}
        />
      </View>
      <View style={styling.bar}>
        <TextInput
          ref={inputRef}
          placeholder="enter your question"
          style={styling.input}
          onChangeText={handleTextInput}
          placeholderTextColor="white"
        />
        <TouchableOpacity
          style={styling.button}
          onPress={() => {
            if (inputMessage.trim() !== '') {
              handleButtonClick();
            }
          }}>
          <Icon name="send" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TextInputBar;

const styling = StyleSheet.create({
  chat: {
    flex: 1,
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 5,
    width: '80%',
    borderRadius: 15,
    color: 'white',
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'grey',
    width: 45,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
