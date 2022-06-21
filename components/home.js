import React, { useState, useEffect } from 'react';
import { Button, Flex, Image, Text, Slider, 
    SliderFilledTrack, SliderTrack, SliderThumb,
    Radio, RadioGroup, Stack } from "@chakra-ui/react"

const Home = () => {
    const [size, setSize] = useState('25');
    const [color, setColor] = useState('yellow');
    
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        //const img = await fileToDataUri(file); //URL.createObjectURL(file);
        const image = document.createElement("img");
        image.src = await fileToDataUri(file);
    
        // enabling the brush after after the image
        // has been uploaded
        image.addEventListener("load", () => {
            drawOnImage(image);
        });
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
        drawOnImage(image);
    }, [color, size])

    function drawOnImage(image = null) {
        const canvasElement = document.getElementById("canvas");
        const context = canvasElement.getContext("2d");
    
        // if an image is present,
        // the image passed as parameter is drawn in the canvas
        if (image) {
            const imageWidth = image.width;
            const imageHeight = image.height;
    
            // rescaling the canvas element
            canvasElement.width = imageWidth;
            canvasElement.height = imageHeight;
    
            context.drawImage(image, 0, 0, imageWidth, imageHeight);
        }
    
        const clearElement = document.getElementById("clear");
        clearElement.onclick = () => {
            context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        };
    
        let isDrawing;
        var started = false;
        var prvX = -300;
        var prvY = -300;

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
    
    return(
        <Flex>
            <Button onClick={handleClick}>Add image</Button>
            <input
                type="file"
                name="image"
                accept="image/x-png,image/jpeg"
                ref={hiddenFileInput}
                onChange={(e)=> {uploadImage(e);}}
                style={{display: 'none'}}
            />
            
            <canvas
                id="canvas"
                width="500"
                height="200"
            ></canvas>

            <Flex direction="column">
                <Flex direction="column" w="md" border="1px" borderColor="gray.300" borderRadius="lg">
                    <Text>Brush</Text>
                    <Text>Size</Text>
                    <Slider aria-label='slider-ex-1' min={1} max={50} defaultValue={25} onChangeEnd={(val) => setSize(val)}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <Text>Color</Text>
                    <RadioGroup onChange={setColor} value={color}>
                        <Stack direction='row'>
                            <Radio value='yellow'>Yellow</Radio>
                            <Radio value='#FF3939'>Red</Radio>
                            <Radio value='#25E712'>Green</Radio>
                            <Radio value='#1AE9C7'>Blue</Radio>
                            <Radio value='#F522E3'>Purple</Radio>
                        </Stack>
                </RadioGroup>
                </Flex>
            
                <Button id="clear">Clear</Button>
            </Flex>
        </Flex>
    )
}
//#BE37F0
export default Home;