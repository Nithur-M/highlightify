import React, { useState, useEffect } from 'react';
import { Button, Flex, Image, Slider, 
    SliderFilledTrack, SliderTrack, SliderThumb,
    Radio, RadioGroup, Stack } from "@chakra-ui/react"

const Home = () => {
    const [size, setSize] = useState('25');
    const [color, setColor] = useState('#fffb78');
    
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
    
        canvasElement.onmousedown = (e) => {
            // isDrawing = true;
            // context.beginPath();
            // context.globalCompositeOperation = "multiply"; //<<<<
            // context.lineWidth = size;
            // context.strokeStyle = color;
            // context.lineJoin = "round";
            // context.lineCap = "round";
            // context.moveTo(e.clientX, e.clientY);

            prvX = e.offsetX;
            prvY = e.offsetY;
            started = true ;
        };
    
        canvasElement.onmousemove = (e) => {
            // if (isDrawing) {
            //     context.lineTo(e.clientX, e.clientY);
            //     context.stroke();
            // }

            if (!started) return;
            //context.clearRect(0,0,canvasElement.width, canvasElement.height);
            context.beginPath();
            //context.clearRect(0,0,canvasElement.width, canvasElement.height);
            context.globalCompositeOperation = "multiply"; //<<<<
            context.globalAlpha = 0.05;
            context.lineWidth = size;
            context.strokeStyle = color;
            context.lineJoin = "round";
            context.lineCap = "round";
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
            // isDrawing = false;
            // context.closePath();

            started = false ;
        };
    }
    
    return(
        <Flex direction="column">
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
        
            <Slider aria-label='slider-ex-1' min={1} max={50} defaultValue={25} onChangeEnd={(val) => setSize(val)}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>

            <RadioGroup onChange={setColor} value={color}>
                <Stack direction='row'>
                    <Radio value='yellow'>Yellow</Radio>
                    <Radio value="#fffb78">Copy 1</Radio>
                    <Radio value='white'>white</Radio>
                    <Radio value='red'>Red</Radio>
                    <Radio value='green'>Green</Radio>
                    <Radio value='blue'>Blue</Radio>
                    <Radio value='#BE37F0'>Purple</Radio>
                </Stack>
            </RadioGroup>
            <Button id="clear">Clear</Button>
        </Flex>
    )
}

export default Home;