const imageData = {
    height : 640,
    width : 640,
    rotate: 0,
    verticalMirror: false,
    horizontalMirror: false,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    exposition: 100
}
const previewData = {
    height : 640,
    width : 640,
    rotate: 0,
    verticalMirror: false,
    horizontalMirror: false,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    exposition: 100
}

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const cropRatio = document.getElementById("cropRatio");

    document.getElementById("plusRotate").addEventListener("click", function() {
        previewData.rotate+=90;
        drawImageFromData(previewData);
    });
    document.getElementById("minusRotate").addEventListener("click", function() {
        previewData.rotate-=90;
        drawImageFromData(previewData);
    });
    document.getElementById("vMirror").addEventListener("click", function() {
        previewData.verticalMirror= !previewData.verticalMirror;
        drawImageFromData(previewData);
    });
    document.getElementById("hMirror").addEventListener("click", function() {
        previewData.horizontalMirror= !previewData.horizontalMirror;
        drawImageFromData(previewData);
    });
    let bright = document.getElementById("brightness");
    bright.addEventListener("change", function() {
        previewData.brightness = bright.value;
        drawImageFromData(previewData);
    });
    let satur = document.getElementById("satur");
    satur.addEventListener("change", function() {
        previewData.saturation = satur.value;
        drawImageFromData(previewData);
    });
    let contr = document.getElementById("contrast");
    contr.addEventListener("change", function() {
        previewData.contrast = contr.value;
        drawImageFromData(previewData);
    });
    let expo = document.getElementById("expo");
    contr.addEventListener("change", function() {
        previewData.exposition = expo.value;
        drawImageFromData(previewData);
    });

    let img = new Image();
    img.src = localStorage.getItem("image_url");

    img.onload = function () {
        previewData.height = imageData.height = img.height;
        previewData.width = imageData.width = img.width;
        drawImageFromData(imageData);
    };

    function drawImageFromData(data) {
        const { height, width, rotate, verticalMirror, horizontalMirror, brightness, contrast, saturation, exposition } = data;

        // Сохраняем настройки canvas
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рассчитываем соотношение для масштабирования изображения
        const scaleWidth = canvas.width / width;
        const scaleHeight = canvas.height / height;
        const scale = Math.min(scaleWidth, scaleHeight); // Выбираем меньший масштаб, чтобы изображение поместилось

        // Настраиваем центрирование изображения
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.scale(horizontalMirror ? -1 : 1, verticalMirror ? -1 : 1);

        // Применяем фильтры
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

        // Масштабируем и рисуем изображение
        const drawWidth = width * scale;
        const drawHeight = height * scale;
        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        console.log(data);
        // Восстанавливаем настройки canvas
        ctx.restore();
    }

    document.getElementById("applyCrop").addEventListener("click", function () {
        const ratio = cropRatio.value.split(":");
        const aspectRatio = ratio[0] / ratio[1];

        let newWidth = canvas.width;
        let newHeight = newWidth / aspectRatio;
        let posY = canvas.height - (newHeight /2);
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * aspectRatio;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, (canvas.width / 2) - (newWidth / 2), 0, newWidth, newHeight);
    });
});

function openCropMenu() {
    document.getElementById("cropMenu").classList.remove('d-none');
    document.getElementById("resizeMenu").classList.add('d-none');
    document.getElementById("rotateMenu").classList.add('d-none');
    document.getElementById("adjustMenu").classList.add('d-none');
}

function openResizeMenu() {
    document.getElementById("cropMenu").classList.add('d-none');
    document.getElementById("resizeMenu").classList.remove('d-none');
    document.getElementById("rotateMenu").classList.add('d-none');
    document.getElementById("adjustMenu").classList.add('d-none');
}

function openRotateMenu() {
    document.getElementById("cropMenu").classList.add('d-none');
    document.getElementById("resizeMenu").classList.add('d-none');
    document.getElementById("rotateMenu").classList.remove('d-none');
    document.getElementById("adjustMenu").classList.add('d-none');
}

function openadjustMenu() {
    document.getElementById("cropMenu").classList.add('d-none');
    document.getElementById("resizeMenu").classList.add('d-none');
    document.getElementById("rotateMenu").classList.add('d-none');
    document.getElementById("adjustMenu").classList.remove('d-none');
}
