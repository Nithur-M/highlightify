import React, { useState, useEffect } from 'react';
import { Button, Flex, Box, Text, Slider, 
    SliderFilledTrack, SliderTrack, SliderThumb,
    Stack, useRadioGroup, Icon } from "@chakra-ui/react";

import { IoMdRedo, IoMdUndo, IoMdTrash, IoMdDownload, IoIosCafe, IoLogoTwitter, IoIosAdd } from "react-icons/io";
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import RadioCard from './radio';

const Home = () => {
    const [size, setSize] = useState('25');
    const [imageUploaded, setImageUploaded] = useState(false);
    const [color, setColor] = useState('yellow');
    
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        //const img = await fileToDataUri(file); //URL.createObjectURL(file);
        if(file){
            const image = document.createElement("img");
            image.src = await fileToDataUri(file);
            setImageUploaded(true);
        
            // enabling the brush after after the image
            // has been uploaded
            image.addEventListener("load", () => {
                drawOnImage(image);
            });
        }
    };

    function fileToDataUri(field) {
        return new Promise((resolve) => {
            const reader = new FileReader();
    
            reader.addEventListener("load", () => {
                resolve(reader.result);
            });
    
            reader.readAsDataURL(field);
        });
    }

    useEffect(()=>{
        const image = document.getElementById('image');
        imageUploaded && drawOnImage(image);
    }, [color, size]);

    function drawOnImage(image = null) {
        const canvasElement = document.getElementById("canvas");
        const context = canvasElement.getContext("2d");

    
        // if an image is present,
        // the image passed as parameter is drawn in the canvas
        if (image) {
            const imageWidth = image.width;
            const imageHeight = image.height;
    
            // rescaling the canvas element
            canvasElement.width = imageWidth > '800' ? '800' : imageWidth;
            canvasElement.height = (canvasElement.width * imageHeight)/imageWidth
    
            context.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);
        }
    
        const clearElement = document.getElementById("clear");
        clearElement.onclick = () => {
            context.clearRect(0, 0, canvasElement.width, canvasElement.height);
            setImageUploaded(false);
        };
    
        var started = false;
        var prvX = 0;
        var prvY = 0;

        let backupCanvas = document.createElement("canvas");
        let backupCanvasContext = backupCanvas.getContext("2d");
        backupCanvas.width = canvasElement.width;
        backupCanvas.height = canvasElement.height;
        let backupCreated = false;
    
        canvasElement.onmousedown = (e) => {
            backupCanvasContext.drawImage(canvasElement, 0, 0, canvasElement.width, canvasElement.height);
            backupCreated = true;
            prvX = e.offsetX;
            prvY = e.offsetY;
            started = true ;
        };
    
        canvasElement.onmousemove = (e) => {
            if (!started) return;
            context.globalCompositeOperation = "source-over";
            context.drawImage(backupCanvas, 0, 0, canvasElement.width, canvasElement.height);
            context.beginPath();
            context.globalCompositeOperation = "multiply"; //<<<<
            context.globalAlpha = 0.05;
            context.lineWidth = size;
            context.strokeStyle = color;
            context.lineJoin = "round";
            //context.lineCap = "round";
            context.moveTo(prvX, prvY);
            var dx = e.offsetX - prvX;
            var dy = e.offsetY - prvY;
            if (Math.abs(dx) > Math.abs(dy)) {
                context.lineTo(e.offsetX, prvY);
            } 
            context.stroke();
            context.closePath();
        };
    
        canvasElement.onmouseup = function () {
            started = false ;
        };
    }

    const options = ['yellow', '#ff6060', '#25E712', '#1AE9C7', '#F522E3']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'color',
        defaultValue: 'yellow',
        onChange: setColor,
    })

    const saveImage = () => {
        const link = document.createElement('a');
        link.download = `highlightify-${new Date().toISOString()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    }
    
    return(
        <Flex>
            <Flex direction="column" align="center" w="4xl" mt="4" >
                {!imageUploaded ?
                <>
                <Text fontSize="4xl" mt="20" fontWeight="extrabold">Highlight Text in Images</Text>
                <Text w="sm" align="center" color="gray">Add an image. Set the relevant highlighter size. Start highlighting.</Text>
                <Box as="button" mt="4" w="md" h="24" borderRadius="lg" 
                border="1px" borderStyle="dashed"
                boxShadow="2xl"
                _hover={{ borderColor: 'purple.500', color: 'purple.500'}}
                 onClick={handleClick}>
                    <Flex justify="center">
                        <Icon as={IoIosAdd} w={6} h={6}/>
                        <Text>Add Image</Text>
                    </Flex>
                </Box>
                
                <input
                    type="file"
                    name="image"
                    accept="image/x-png,image/jpeg"
                    ref={hiddenFileInput}
                    onChange={(e)=> {uploadImage(e);}}
                    style={{display: 'none'}}
                />
                </>
                :
                <canvas
                id="canvas"
                className="canvas"
                width="500"
                height="200"
            //     style={{ cursor: `<svg width="512px" height="512px">
            //     <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
            // </svg>`}}
                ></canvas>
                }
                <Flex mt="32" gap="2" color="gray">
                    <Flex align="center" gap="1" cursor="pointer" onClick={() => window.open("https://twitter.com/NithurM", '_blank')}>
                        <Icon as={IoLogoTwitter} color="gray.600" />
                        <Text _hover={{ textDecoration: 'underline' }} >Made by Nithur</Text>
                    </Flex>
                    •
                    <Flex align="center" gap="1" cursor="pointer" onClick={() => window.open("https://www.buymeacoffee.com/nithur", '_blank')}>
                        <Icon as={IoIosCafe} color="gray.600"/>
                        <Text _hover={{ textDecoration: 'underline' }}>Buy me a coffee</Text>
                    </Flex>
                </Flex>

                <CustomCursor
                    targets={['.settings', '.canvas']}
                    customClass='custom-cursor'
                    dimensions={size*2}
                    fill={color}
                    targetScale={1}
                    smoothness={{
                        movement: 1,
                        scale: 0.1,
                        opacity: 0.2,
                    }}
                    targetOpacity={0.5}
                />
            </Flex>
            <Flex direction="column" mt="4" gap="2">
                <Flex direction="column" className='settings' border="1px" borderColor="gray.300" boxShadow="2xl" borderRadius="lg">
                    <Flex bg="gray.200" borderTopRadius="lg" pl="2">
                        <Text>Highlighter</Text>
                    </Flex>
                    <Flex direction="column" w="sm" gap="2" p="2">
                        <Text>Size:</Text>
                        <Slider aria-label='slider-ex-1' colorScheme="purple" min={15} max={50} defaultValue={25} onChangeEnd={(val) => setSize(val)}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>

                        <Text>Color:</Text>
                        <Stack direction='row'>
                            {options.map((value) => {
                            const radio = getRadioProps({ value })
                            return (
                            <RadioCard key={value} {...radio}>
                                {value}
                            </RadioCard>
                            )
                        })}
                        </Stack>
                    </Flex>
                </Flex>

                <Flex mt="8" gap="2">
                    <Button w="full" leftIcon={<Icon as={IoMdUndo} />}>Undo</Button>
                    <Button w="full" leftIcon={<Icon as={IoMdRedo} />}>Redo</Button>
                </Flex>
                <Button id="clear" leftIcon={<Icon as={IoMdTrash} />}>Clear</Button>
                <Button colorScheme="purple" onClick={saveImage} leftIcon={<Icon as={IoMdDownload} />}>Save</Button>
            </Flex>
        </Flex>
    )
}
//#BE37F0
export default Home;