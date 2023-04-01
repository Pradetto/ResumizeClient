import React, {useRef, useEffect, useState} from 'react'
import { VStack, useMediaQuery, Text,Box, HStack, Button,Flex,AvatarBadge,Avatar, Textarea } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import Lottie from 'lottie-react'

const ChatBox = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)")
    const [messages, setMessages] = useState([
        {"role": "system", "content": "Welcome! I’m Frank, your new personal AI assistant. I can help you find any information, and help you write, summarize, and generate any text in seconds. Not happy with the response I gave you? Ask me to change, rewrite or rephrase any response and I'll do so instantly."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
        fetch('https://assets9.lottiefiles.com/packages/lf20_3vbOcw.json')
            .then(response => response.json())
            .then(data => {
            setAnimationData(data);
            });
    }, []);

    const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
    return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
    setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
    };

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
    };
    return (
        <VStack>
        <Text as='h2' fontSize='3xl'>Cover Letter Chat Bot</Text>
        <Box border="5px solid black" style={{ height: isMobile ? "400px" : "600px", width: isMobile? "350px": "600px"}} shadow='md' rounded='1%' position='relative'>
            {/* MESSAGES */}
            <Flex w="100%" h={isMobile? '80%' : '81%'} overflowY="scroll" flexDirection="column" p="4">
            {messages.map((item, index) => {
                if (item.role === "user") {
                return (
                    <Flex key={index} w="100%" justify="flex-end">
                    <Flex
                        bg="black"
                        color="white"
                        minW="100px"
                        maxW="350px"
                        my="1"
                        p="3"
                        wordBreak="break-word"
                    >
                        <Text>{item.content}</Text>
                    </Flex>
                    </Flex>
                );
                } else {
                return (
                    <HStack key={index} w="100%" my='1'>
                        <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                            {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
                        </Avatar>
                        <Flex
                            bg="gray.100"
                            color="black"
                            minW="100px"
                            maxW="350px"
                            p="3"
                            wordBreak="break-word"
                            ml="100px" // Add margin-left to shift the text box over
                        >
                            <Text>{item.content}</Text>
                        </Flex>
                    </HStack>
                );
                }
            })}
            <AlwaysScrollToBottom />
            </Flex>

            {/* INPUT */}
            <Flex
            w="100%"
            position="absolute"
            bottom="0"
            p="4"
            borderTop="1px solid gray"
            backgroundColor="white"
            align='center'
            >
            <Textarea
                placeholder="Type Something..."
                border="1px solid gray"
                onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSendMessage();
                }
                }}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                flexGrow={1}
                h='2.5rem'
                resize='none'
                // isDisabled={true}
            />
            <Button
                leftIcon={<FiSend />}
                iconSpacing="0"
                colorScheme='green'
                _hover={{
                backgroundColor: "gray.400",
                border: "1px solid gray.500",
                }}
                borderRadius="none"
                disabled={inputMessage.trim().length <= 0}
                onClick={handleSendMessage}
                ml={2}
                h="2.5rem" // Increase the button size
            />
            </Flex>
        </Box>
        <HStack>
            <Text>Quick Actions</Text>
            <Button>Reroll</Button>
            <Button>Save</Button>
        </HStack>
        </VStack>
)
}

export default ChatBox